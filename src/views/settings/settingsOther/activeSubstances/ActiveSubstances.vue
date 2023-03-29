<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="activeSubstancesData">
      <ActiveSubstancesTable
        :activeSubstancesData="activeSubstancesData"
        :activeSubstanceData="activeSubstanceData"
        v-on:setActiveSubstanceData="activeSubstanceData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <ActiveSubstanceInfo :activeSubstanceData="activeSubstanceData" />
      <ActiveSubstanceDelete
        :activeSubstanceData="activeSubstanceData"
        v-on:refresh="getAllActiveSubstances()"
      />
    </div>

    <ActiveSubstanceBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ActiveSubstancesTable from "@/components/settings/settingsOther/activeSubstances/ActiveSubstancesTable.vue";
import ActiveSubstanceInfo from "@/components/settings/settingsOther/activeSubstances/ActiveSubstanceInfo.vue";
import ActiveSubstanceDelete from "@/components/settings/settingsOther/activeSubstances/ActiveSubstanceDelete.vue";
import ActiveSubstanceBtns from "@/components/settings/settingsOther/activeSubstances/ActiveSubstanceBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import ActiveSubstance from "@/models/settings/settingsOther/activeSubstances/ActiveSubstance";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ActiveSubstances",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ActiveSubstancesTable,
    ActiveSubstanceInfo,
    ActiveSubstanceDelete,
    ActiveSubstanceBtns,
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
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      activeSubstancesData: null,
      activeSubstanceData: new ActiveSubstance(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllActiveSubstances();
    },
    search(text) {
      this.textSearch = text;
      this.getAllActiveSubstances();
    },
    async getAllActiveSubstances() {
      this.isLoading = true;
      try {
        const response = await this.activeSubstanceData.getAllActiveSubstances(
          this.language,
          this.userAuthorizeToken,
          this.selfPage,
          this.textSearch
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.activeSubstancesPagination.totalPages,
            totalItems: response.data.activeSubstancesPagination.totalItems,
            countItemsInPage:
              response.data.activeSubstancesPagination.countItemsInPage,
            selfPage: response.data.activeSubstancesPagination.selfPage,
          };
          this.activeSubstancesData =
            response.data.activeSubstancesPagination.activeSubstancesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.activeSubstancesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.activeSubstancesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.activeSubstancesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.activeSubstancesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllActiveSubstances();
  },
};
</script>
