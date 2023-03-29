<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="surgeriesData">
      <SurgeriesTable
        :surgeriesData="surgeriesData"
        :surgeryData="surgeryData"
        v-on:setSurgeryData="surgeryData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <SurgeryInfo :surgeryData="surgeryData" />
      <SurgeryDelete
        :surgeryData="surgeryData"
        v-on:refresh="getAllSurgeries()"
      />
    </div>

    <SurgeryBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import SurgeriesTable from "@/components/settings/settingsOther/surgeries/SurgeriesTable.vue";
import SurgeryInfo from "@/components/settings/settingsOther/surgeries/SurgeryInfo.vue";
import SurgeryDelete from "@/components/settings/settingsOther/surgeries/SurgeryDelete.vue";
import SurgeryBtns from "@/components/settings/settingsOther/surgeries/SurgeryBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Surgery from "@/models/settings/settingsOther/surgeries/Surgery";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Surgeries",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    SurgeriesTable,
    SurgeryInfo,
    SurgeryDelete,
    SurgeryBtns,
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
      surgeriesData: null,
      surgeryData: new Surgery(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllSurgeries();
    },
    search(text) {
      this.textSearch = text;
      this.getAllSurgeries();
    },
    async getAllSurgeries() {
      this.isLoading = true;
      try {
        const response = await this.surgeryData.getAllSurgeries(
          this.language,
          this.userAuthorizeToken,
          this.selfPage,
          this.textSearch
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.surgeriesPagination.totalPages,
            totalItems: response.data.surgeriesPagination.totalItems,
            countItemsInPage:
              response.data.surgeriesPagination.countItemsInPage,
            selfPage: response.data.surgeriesPagination.selfPage,
          };
          this.surgeriesData = response.data.surgeriesPagination.surgriesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.surgeriesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.surgeriesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.surgeriesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.surgeriesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllSurgeries();
  },
};
</script>
