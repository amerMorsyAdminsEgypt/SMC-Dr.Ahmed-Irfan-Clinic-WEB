<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <InsurancesPlanForm
      v-if="!isLoading"
      :insurancesPlanData="insurancesPlanData"
      :submitName="$t('add')"
      v-on:addOrUpdateInsurancesPlan="addInsurancesPlan()"
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
  name: "InsurancesPlanAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    InsurancesPlanForm,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      insurancesPlanData: new InsurancesPlan(),
    };
  },
  methods: {
    async addInsurancesPlan() {
      this.isLoading = true;
      try {
        let response = await this.insurancesPlanData.addOrUpdateInsurancesPlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.insurancesPlanData.setInitialValue();
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
};
</script>

<style scoped lang="scss"></style>
