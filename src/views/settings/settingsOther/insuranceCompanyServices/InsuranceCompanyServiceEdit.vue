<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <InsuranceCompanyServiceForm
      v-if="!isLoading"
      :insuranceCompanyToken="insuranceCompanyToken"
      :insuranceCompanyServiceData="insuranceCompanyServiceData"
      :submitName="$t('edit')"
      v-on:addOrUpdateInsuranceCompanyService="updateInsuranceCompanyService"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import InsuranceCompanyServiceForm from "@/components/settings/settingsOther/insuranceCompanyServices/InsuranceCompanyServiceForm.vue";
import InsuranceCompanyService from "@/models/settings/settingsOther/insuranceCompanyServices/InsuranceCompanyService";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "InsuranceCompanyServiceEdit",
  props: {
    insuranceCompanyToken: {
      type: String,
      default: "",
    },
  },
  watch: {
    insuranceCompanyToken(val) {
      let insuranceCompanyToken =
        val || this.$route.params.insuranceCompanyToken;
      if (!insuranceCompanyToken) {
        this.exceptionMsg = this.$t("insuranceCompanies.select");
        this.$router.push({ name: "InsuranceCompanyServices" }).catch(() => {});
        this.isLoading = false;
      }
    },
  },
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    InsuranceCompanyServiceForm,
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
      insuranceCompanyServiceData: new InsuranceCompanyService(),
      insuranceCompanyServiceToken:
        this.$route.params.insuranceCompanyServiceToken,
    };
  },
  methods: {
    async getInsuranceCompanyServiceDetails() {
      this.isLoading = true;
      this.insuranceCompanyServiceData.insuranceCompanyToken =
        this.insuranceCompanyToken;
      try {
        let response =
          await this.insuranceCompanyServiceData.getInsuranceCompanyServiceDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (
          response.data.status == STATUS.SUCCESS ||
          response.data.status == STATUS.NO_CONTENT
        ) {
          this.insuranceCompanyServiceData.fillData(
            response.data.insuranceCompanyServicesData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.insuranceCompanyServiceData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.insuranceCompanyServiceData = null;
      }
      this.isLoading = false;
    },
    async updateInsuranceCompanyService() {
      this.insuranceCompanyServiceData.insuranceCompanyToken =
        this.insuranceCompanyToken;
      this.isLoading = true;
      try {
        let response =
          await this.insuranceCompanyServiceData.updateInsuranceCompanyService(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router
            .push({
              name: "InsuranceCompanyServices",
              params: {
                insuranceCompanyToken: this.insuranceCompanyToken,
              },
            })
            .catch(() => {});
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
    let insuranceCompanyToken =
      this.insuranceCompanyToken || this.$route.params.insuranceCompanyToken;
    if (!insuranceCompanyToken) {
      this.exceptionMsg = this.$t("insuranceCompanies.select");
      this.$router.push({ name: "InsuranceCompanyServices" }).catch(() => {});
      this.isLoading = false;
    }
    this.getInsuranceCompanyServiceDetails();
  },
};
</script>

<style scoped lang="scss"></style>
