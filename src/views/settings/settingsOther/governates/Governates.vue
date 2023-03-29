<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="governatesData">
      <GovernatesTable
        :governatesData="governatesData"
        :governateData="governateData"
        v-on:setGovernateData="governateData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <GovernateInfo :governateData="governateData" />
      <GovernateDelete
        :governateData="governateData"
        v-on:refresh="getAllGovernates()"
      />
    </div>

    <GovernateBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import GovernatesTable from "@/components/settings/settingsOther/governates/GovernatesTable.vue";
import GovernateInfo from "@/components/settings/settingsOther/governates/GovernateInfo.vue";
import GovernateDelete from "@/components/settings/settingsOther/governates/GovernateDelete.vue";
import GovernateBtns from "@/components/settings/settingsOther/governates/GovernateBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Governate from "@/models/settings/settingsOther/governates/Governate";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Governates",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    GovernatesTable,
    GovernateInfo,
    GovernateDelete,
    GovernateBtns,
    Pagination,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      textSearch: "",
      filterStatus: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      governatesData: null,
      governateData: new Governate(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllGovernates();
    },
    search(text) {
      this.filterStatus = true;
      this.textSearch = text;
      this.getAllGovernates();
    },
    async getAllGovernates() {
      this.isLoading = true;
      try {
        const response = await this.governateData.getAllGovernates(
          this.language,
          this.userAuthorizeToken,
          this.paginationData.selfPage,
          this.filterStatus,
          this.textSearch
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.GovernatesPagination.totalPages,
            totalItems: response.data.GovernatesPagination.totalItems,
            countItemsInPage:
              response.data.GovernatesPagination.countItemsInPage,
            selfPage: response.data.GovernatesPagination.selfPage,
          };
          this.governatesData =
            response.data.GovernatesPagination.governatesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.governatesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.governatesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.governatesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.governatesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllGovernates();
  },
};
</script>
