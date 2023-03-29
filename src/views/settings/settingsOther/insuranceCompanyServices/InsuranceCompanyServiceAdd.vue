<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <InsuranceCompanyServiceForm
      v-else-if="!isLoading"
      :insuranceCompanyToken="insuranceCompanyToken"
      :insuranceCompanyServiceData="insuranceCompanyServiceData"
      :submitName="$t('add')"
      v-on:addOrUpdateInsuranceCompanyService="
        addOrUpdateInsuranceCompanyService
      "
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
  name: "InsuranceCompanyServiceAdd",
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
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,

      insuranceCompanyServiceData: new InsuranceCompanyService(),
    };
  },
  methods: {
    async addOrUpdateInsuranceCompanyService() {
      this.insuranceCompanyServiceData.insuranceCompanyToken =
        this.insuranceCompanyToken;
      this.isLoading = true;
      try {
        let response =
          await this.insuranceCompanyServiceData.addOrUpdateInsuranceCompanyService(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.insuranceCompanyServiceData.setInitialValue();
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
    let insuranceCompanyToken =
      this.insuranceCompanyToken || this.$route.params.insuranceCompanyToken;
    if (!insuranceCompanyToken) {
      this.exceptionMsg = this.$t("insuranceCompanies.select");
      this.$router.push({ name: "InsuranceCompanyServices" }).catch(() => {});
      this.isLoading = false;
    }
  },
};
</script>

<style scoped lang="scss"></style>
