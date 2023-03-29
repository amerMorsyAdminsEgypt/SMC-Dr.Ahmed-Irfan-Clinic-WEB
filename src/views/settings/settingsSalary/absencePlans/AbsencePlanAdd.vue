<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <AbsencePlanForm
      v-if="!isLoading"
      :absencePlanData="absencePlanData"
      :submitName="$t('add')"
      v-on:addOrUpdateAbsencePlan="addAbsencePlan()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import AbsencePlanForm from "@/components/settings/settingsSalary/absencePlans/AbsencePlanForm.vue";
import AbsencePlan from "@/models/settings/settingsSalary/absencePlans/AbsencePlan";

export default {
  name: "AbsencePlanAdd",
  components: {
    PreLoader,
    ExceptionWithImg,
    AbsencePlanForm,
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
      absencePlanData: new AbsencePlan(),
    };
  },
  methods: {
    async addAbsencePlan() {
      this.isLoading = true;
      try {
        let response = await this.absencePlanData.addOrUpdateAbsencePlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.absencePlanData.setInitialValue();
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
