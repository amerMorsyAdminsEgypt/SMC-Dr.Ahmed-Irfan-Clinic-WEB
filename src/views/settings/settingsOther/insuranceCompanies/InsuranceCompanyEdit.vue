<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <InsuranceCompanyForm
      v-if="!isLoading"
      :insuranceCompanyData="insuranceCompanyData"
      :submitName="$t('edit')"
      v-on:addOrUpdateInsuranceCompany="updateInsuranceCompany"
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
  name: "InsuranceCompanyEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    InsuranceCompanyForm,
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
      insuranceCompanyData: new InsuranceCompany(),
      insuranceCompanyToken: this.$route.params.insuranceCompanyToken,
    };
  },
  methods: {
    async getInsuranceCompanyDetails() {
      this.isLoading = true;
      this.insuranceCompanyData.insuranceCompanyToken =
        this.insuranceCompanyToken;
      try {
        let response =
          await this.insuranceCompanyData.getInsuranceCompanyDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.insuranceCompanyData.fillData(
            response.data.insuranceCompaniesData
          );
          let ccName =
            response.data.insuranceCompaniesData
              .insuranceCompanyCountryCodeName;
          let cc =
            response.data.insuranceCompaniesData.insuranceCompanyCountryCode;

          this.insuranceCompanyData.insuranceCompanyCCWithCCName =
            ccName === "" || cc === "" ? "" : ccName + " " + cc;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.insuranceCompanyData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.insuranceCompanyData = null;
      }
      this.isLoading = false;
    },
    async updateInsuranceCompany() {
      this.isLoading = true;
      try {
        let response =
          await this.insuranceCompanyData.addOrUpdateInsuranceCompany(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/insurance-companies");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        console.log(e);
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getInsuranceCompanyDetails();
  },
};
</script>

<style scoped lang="scss"></style>
