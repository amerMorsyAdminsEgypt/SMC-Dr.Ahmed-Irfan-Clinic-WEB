<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BalancesPlanForm
      v-if="!isLoading"
      :balancesPlanData="balancesPlanData"
      :submitName="$t('add')"
      v-on:addOrUpdateBalancesPlan="addBalancesPlan()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import BalancesPlanForm from "@/components/settings/settingsSalary/balancesPlans/BalancesPlanForm.vue";
import BalancesPlan from "@/models/settings/settingsSalary/balancesPlans/BalancesPlan";

export default {
  name: "BalancesPlanAdd",
  components: {
    PreLoader,
    ExceptionWithImg,
    BalancesPlanForm,
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
      balancesPlanData: new BalancesPlan(),
    };
  },
  methods: {
    async addBalancesPlan() {
      this.isLoading = true;
      try {
        let response = await this.balancesPlanData.addOrUpdateBalancesPlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.balancesPlanData.setInitialValue();
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
    showMsg(msg = "", isSuccess = false) {
      let variant = isSuccess ? "success" : "danger";
      this.$bvToast.toast(`${msg}`, {
        title: this.$t("alert"),
        variant: variant,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 5000,
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
