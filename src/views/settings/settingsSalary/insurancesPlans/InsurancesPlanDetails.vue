<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="insurancesPlanData">
      <InsurancesPlanNameTable :insurancesPlanData="insurancesPlanData" />

      <InsurancesPlanDetailsTable
        :insurancesPlansSlidesDetailsData="
          insurancesPlanData.insurancesPlansSlidesDetailsData
        "
        v-on:setInsurancesPlansSlideDetailsData="
          insurancesPlansSlideDetailsData.fillData($event)
        "
        :insurancesPlansSlideDetailsData="insurancesPlansSlideDetailsData"
      />

      <InsurancesPlanDetailsInfo
        :insurancesPlansSlideDetailsData="insurancesPlansSlideDetailsData"
      />

      <InsurancesPlanDetailsDelete
        :insurancesPlansSlideDetailsData="insurancesPlansSlideDetailsData"
        v-on:refresh="getInsurancesPlanDetails()"
      />
    </div>

    <InsurancesPlanDetailsFloatBtns
      :insurancesPlansToken="insurancesPlansToken"
      :textSearch="textSearch"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import InsurancesPlanNameTable from "@/components/settings/settingsSalary/insurancesPlans/InsurancesPlanNameTable.vue";
import InsurancesPlanDetailsTable from "@/components/settings/settingsSalary/insurancesPlans/InsurancesPlanDetailsTable.vue";
import InsurancesPlanDetailsInfo from "@/components/settings/settingsSalary/insurancesPlans/InsurancesPlanDetailsInfo.vue";
import InsurancesPlanDetailsDelete from "@/components/settings/settingsSalary/insurancesPlans/InsurancesPlanDetailsDelete.vue";
import InsurancesPlanDetailsFloatBtns from "@/components/settings/settingsSalary/insurancesPlans/InsurancesPlanDetailsFloatBtns.vue";
import InsurancesPlan from "@/models/settings/settingsSalary/insurancesPlans/InsurancesPlan";
import InsurancesPlansSlideDetails from "@/models/settings/settingsSalary/insurancesPlans/InsurancesPlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "InsurancesPlanDetails",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    InsurancesPlanNameTable,
    InsurancesPlanDetailsTable,
    InsurancesPlanDetailsInfo,
    InsurancesPlanDetailsDelete,
    InsurancesPlanDetailsFloatBtns,
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
      insurancesPlansSlideDetailsData: new InsurancesPlansSlideDetails(),
      insurancesPlansToken: this.$route.params.insurancesPlansToken,
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getInsurancesPlanDetails();
    },
    search(text) {
      this.textSearch = text;
      this.getInsurancesPlanDetails();
    },
    async getInsurancesPlanDetails() {
      this.isLoading = true;
      this.insurancesPlanData.insurancesPlansToken = this.insurancesPlansToken;
      try {
        let response = await this.insurancesPlanData.getInsurancesPlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.insurancesPlanData.fillData(response.data.insurancesPlansData);
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
    this.getInsurancesPlanDetails();
  },
};
</script>
