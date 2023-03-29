<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <InsurancesPlanForm
      v-if="!isLoading"
      :insurancesPlanData="insurancesPlanData"
      :submitName="$t('edit')"
      v-on:addOrUpdateInsurancesPlan="updateInsurancesPlan()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import InsurancesPlanForm from "@/components/settings/settingsSalary/insurancesPlans/InsurancesPlanForm.vue";
import InsurancesPlan from "@/models/settings/settingsSalary/insurancesPlans/InsurancesPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "InsurancesPlanEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    InsurancesPlanForm,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      insurancesPlanData: new InsurancesPlan(),
      insurancesPlansToken: this.$route.params.insurancesPlansToken,
    };
  },
  methods: {
    async getInsurancesPlanDetails() {
      this.isLoading = true;
      this.insurancesPlanData.insurancesPlansToken = this.insurancesPlansToken;
      try {
        let response = await this.insurancesPlanData.getInsurancesPlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.insurancesPlanData.fillData(response.data.insurancesPlansData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.insurancesPlanData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.insurancesPlanData = null;
      }
      this.isLoading = false;
    },
    async updateInsurancesPlan() {
      this.isLoading = true;
      try {
        let response = await this.insurancesPlanData.addOrUpdateInsurancesPlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/insurances-plans");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getInsurancesPlanDetails();
  },
};
</script>

<style scoped lang="scss"></style>
