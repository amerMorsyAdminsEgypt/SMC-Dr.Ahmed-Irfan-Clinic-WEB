<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MedicalInsuranceLevelForm
      v-else-if="!isLoading"
      :insuranceCompanyToken="insuranceCompanyToken"
      :medicalInsuranceLevelData="medicalInsuranceLevelData"
      :submitName="$t('add')"
      v-on:addOrUpdateMedicalInsuranceLevel="addOrUpdateMedicalInsuranceLevel"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MedicalInsuranceLevelForm from "@/components/settings/settingsOther/medicalInsuranceLevels/MedicalInsuranceLevelForm.vue";
import MedicalInsuranceLevel from "@/models/settings/settingsOther/medicalInsuranceLevels/MedicalInsuranceLevel";
import InsuranceCompany from "@/models/settings/settingsOther/insuranceCompanies/InsuranceCompany";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MedicalInsuranceLevelAdd",
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
        this.$router.push({ name: "MedicalInsuranceLevels" }).catch(() => {});
        this.isLoading = false;
      } else {
        this.getInsuranceCompanyDetails();
      }
    },
  },
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicalInsuranceLevelForm,
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

      medicalInsuranceLevelData: new MedicalInsuranceLevel(),
      insuranceCompanyData: new InsuranceCompany(),
    };
  },
  methods: {
    async addOrUpdateMedicalInsuranceLevel() {
      this.medicalInsuranceLevelData.insuranceCompanyToken =
        this.insuranceCompanyToken;
      this.isLoading = true;
      try {
        let response =
          await this.medicalInsuranceLevelData.addOrUpdateMedicalInsuranceLevel(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.medicalInsuranceLevelData.setInitialValue();
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
    async getInsuranceCompanyDetails() {
      this.isLoading = true;
      this.insuranceCompanyData.setInitialValue();
      this.insuranceCompanyData.insuranceCompanyToken =
        this.insuranceCompanyToken;

      try {
        let response =
          await this.insuranceCompanyData.getInsuranceCompanyDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          // this.insuranceCompanyData.fillData(
          //   response.data.insuranceCompaniesData
          // );
          this.medicalInsuranceLevelData.medicalInsuranceLevelServicesData =
            response.data.insuranceCompaniesData &&
            response.data.insuranceCompaniesData.insuranceCompanyServicesData &&
            response.data.insuranceCompaniesData.insuranceCompanyServicesData
              .insuranceCompanyServicesDetailsData
              ? response.data.insuranceCompaniesData.insuranceCompanyServicesData.insuranceCompanyServicesDetailsData.map(
                  (service) => ({
                    serviceToken: service.serviceToken,
                    serviceNameCurrent: service.serviceNameCurrent,
                    discountPercentage: service.discountPercentage,
                  })
                )
              : [];
          // let medicalInsuranceLevelServicesData =
          //   response.data.insuranceCompaniesData.insuranceCompanyServicesDetailsData.map(
          //     (service) => ({
          //       serviceToken: service.serviceToken,
          //       discountPercentage: service.discountPercentage,
          //     })
          //   );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
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
      this.$router.push({ name: "MedicalInsuranceLevels" }).catch(() => {});
      this.isLoading = false;
    } else {
      this.getInsuranceCompanyDetails();
    }
  },
};
</script>
