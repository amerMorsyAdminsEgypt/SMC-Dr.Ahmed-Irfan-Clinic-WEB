<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <SalaryEffectForm
      v-if="!isLoading"
      :salaryEffectData="salaryEffectData"
      :submitName="$t('add')"
      v-on:addOrUpdateSalaryEffect="addSalaryEffect"
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
  name: "SalaryEffectAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    SalaryEffectForm,
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
      salaryEffectData: new SalaryEffect(),
    };
  },
  methods: {
    async addSalaryEffect() {
      this.isLoading = true;
      try {
        let response =
          await this.salaryEffectData.addOrUpdateEmployeeSalaryEffect(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.salaryEffectData.setInitialValue();
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
  async created() {},
};
</script>

<style scoped lang="scss"></style>
