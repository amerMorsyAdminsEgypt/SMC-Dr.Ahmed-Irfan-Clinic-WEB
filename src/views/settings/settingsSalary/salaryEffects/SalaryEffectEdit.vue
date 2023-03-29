<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <SalaryEffectForm
      v-if="!isLoading"
      :salaryEffectData="salaryEffectData"
      :submitName="$t('edit')"
      v-on:addOrUpdateSalaryEffect="updateSalaryEffect"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import SalaryEffectForm from "@/components/settings/settingsSalary/salaryEffects/SalaryEffectForm.vue";
import SalaryEffect from "@/models/settings/settingsSalary/salaryEffects/SalaryEffect";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "SalaryEffectEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    SalaryEffectForm,
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
      salaryEffectData: new SalaryEffect(),
      employeeSalaryEffectToken: this.$route.params.employeeSalaryEffectToken,
    };
  },
  methods: {
    async getSalaryEffectDetails() {
      this.isLoading = true;
      this.salaryEffectData.employeeSalaryEffectToken =
        this.employeeSalaryEffectToken;
      try {
        let response =
          await this.salaryEffectData.getEmployeeSalaryEffectDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.salaryEffectData.fillData(
            response.data.employeeSalaryEffectData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.salaryEffectData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.salaryEffectData = null;
      }
      this.isLoading = false;
    },
    async updateSalaryEffect() {
      this.isLoading = true;
      try {
        let response =
          await this.salaryEffectData.addOrUpdateEmployeeSalaryEffect(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/salary-effects");
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
    this.getSalaryEffectDetails();
  },
};
</script>

<style scoped lang="scss"></style>
