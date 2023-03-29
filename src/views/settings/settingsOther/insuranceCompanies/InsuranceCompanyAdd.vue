<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <InsuranceCompanyForm
      v-if="!isLoading"
      :insuranceCompanyData="insuranceCompanyData"
      :submitName="$t('add')"
      v-on:addOrUpdateInsuranceCompany="addOrUpdateInsuranceCompany"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import InsuranceCompanyForm from "@/components/settings/settingsOther/insuranceCompanies/InsuranceCompanyForm.vue";
import InsuranceCompany from "@/models/settings/settingsOther/insuranceCompanies/InsuranceCompany";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "InsuranceCompanyAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    InsuranceCompanyForm,
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

      insuranceCompanyData: new InsuranceCompany(),
    };
  },
  methods: {
    async addOrUpdateInsuranceCompany() {
      this.isLoading = true;
      try {
        let response =
          await this.insuranceCompanyData.addOrUpdateInsuranceCompany(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.insuranceCompanyData.setInitialValue();
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
