<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="insurancesPlansData">
      <InsurancesPlansTable
        :insurancesPlansData="insurancesPlansData"
        :insurancesPlanData="insurancesPlanData"
        v-on:setInsurancesPlanData="insurancesPlanData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <InsurancesPlanDelete
        :insurancesPlanData="insurancesPlanData"
        v-on:refresh="getAllInsurancesPlans()"
      />
    </div>

    <InsurancesPlanFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import InsurancesPlansTable from "@/components/settings/settingsSalary/insurancesPlans/InsurancesPlansTable.vue";
import InsurancesPlanDelete from "@/components/settings/settingsSalary/insurancesPlans/InsurancesPlanDelete.vue";
import InsurancesPlanFloatBtns from "@/components/settings/settingsSalary/insurancesPlans/InsurancesPlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import InsurancesPlan from "@/models/settings/settingsSalary/insurancesPlans/InsurancesPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "InsurancesPlans",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    InsurancesPlansTable,
    InsurancesPlanDelete,
    InsurancesPlanFloatBtns,
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
      insurancesPlansData: null,
      insurancesPlanData: new InsurancesPlan(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllInsurancesPlans();
    },
    search(text) {
      this.textSearch = text;
      this.getAllInsurancesPlans();
    },
    async getAllInsurancesPlans() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/InsurancesPlans/GetInsurancesPlanses?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.insurancesPlansPagination.totalPages,
            totalItems: response.data.insurancesPlansPagination.totalItems,
            countItemsInPage:
              response.data.insurancesPlansPagination.countItemsInPage,
            selfPage: response.data.insurancesPlansPagination.selfPage,
          };
          this.insurancesPlansData =
            response.data.insurancesPlansPagination.insurancesPlansData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.insurancesPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.insurancesPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.insurancesPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.insurancesPlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllInsurancesPlans();
  },
};
</script>
