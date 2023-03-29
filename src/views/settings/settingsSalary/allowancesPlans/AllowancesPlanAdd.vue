<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <AllowancesPlanForm
      v-if="!isLoading"
      :allowancesPlanData="allowancesPlanData"
      :submitName="$t('add')"
      v-on:addOrUpdateAllowancesPlan="addAllowancesPlan()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import AllowancesPlanForm from "@/components/settings/settingsSalary/allowancesPlans/AllowancesPlanForm.vue";
import AllowancesPlan from "@/models/settings/settingsSalary/allowancesPlans/AllowancesPlan";

export default {
  name: "AllowancesPlanAdd",
  components: {
    PreLoader,
    ExceptionWithImg,
    AllowancesPlanForm,
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
      allowancesPlanData: new AllowancesPlan(),
    };
  },
  methods: {
    async addAllowancesPlan() {
      this.isLoading = true;
      try {
        let response = await this.allowancesPlanData.addOrUpdateAllowancesPlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.allowancesPlanData.setInitialValue();
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
