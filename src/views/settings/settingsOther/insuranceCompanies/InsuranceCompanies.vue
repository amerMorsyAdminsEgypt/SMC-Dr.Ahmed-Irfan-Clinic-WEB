<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="insuranceCompaniesData">
      <InsuranceCompaniesTableCollapse
        :insuranceCompaniesData="insuranceCompaniesData"
        v-on:setInsuranceCompanyData="insuranceCompanyData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <InsuranceCompanyInfo :insuranceCompanyData="insuranceCompanyData" />
      <InsuranceCompanyDelete
        :insuranceCompanyData="insuranceCompanyData"
        v-on:refresh="getAllInsuranceCompanies()"
      />
    </div>

    <InsuranceCompanyBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
// import InsuranceCompaniesTable from "@/components/settings/settingsOther/insuranceCompanies/InsuranceCompaniesTable.vue";
import InsuranceCompaniesTableCollapse from "@/components/settings/settingsOther/insuranceCompanies/InsuranceCompaniesTableCollapse.vue";
import InsuranceCompanyInfo from "@/components/settings/settingsOther/insuranceCompanies/InsuranceCompanyInfo.vue";
import InsuranceCompanyDelete from "@/components/settings/settingsOther/insuranceCompanies/InsuranceCompanyDelete.vue";
import InsuranceCompanyBtns from "@/components/settings/settingsOther/insuranceCompanies/InsuranceCompanyBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import InsuranceCompany from "@/models/settings/settingsOther/insuranceCompanies/InsuranceCompany";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "InsuranceCompanies",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    // InsuranceCompaniesTable,
    InsuranceCompaniesTableCollapse,
    InsuranceCompanyInfo,
    InsuranceCompanyDelete,
    InsuranceCompanyBtns,
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
      insuranceCompaniesData: null,
      insuranceCompanyData: new InsuranceCompany(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllInsuranceCompanies();
    },
    search(text) {
      this.filterStatus = true;
      this.textSearch = text;
      this.getAllInsuranceCompanies();
    },
    async getAllInsuranceCompanies() {
      this.isLoading = true;
      try {
        const response =
          await this.insuranceCompanyData.getAllInsuranceCompanies(
            this.language,
            this.userAuthorizeToken,
            this.paginationData.selfPage,
            this.filterStatus,
            this.textSearch
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.insuranceCompaniesPagination.totalPages,
            totalItems: response.data.insuranceCompaniesPagination.totalItems,
            countItemsInPage:
              response.data.insuranceCompaniesPagination.countItemsInPage,
            selfPage: response.data.insuranceCompaniesPagination.selfPage,
          };
          this.insuranceCompaniesData =
            response.data.insuranceCompaniesPagination.insuranceCompaniesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.insuranceCompaniesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.insuranceCompaniesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.insuranceCompaniesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.insuranceCompaniesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllInsuranceCompanies();
    // console.log(this.insuranceCompaniesData);
  },
};
</script>
