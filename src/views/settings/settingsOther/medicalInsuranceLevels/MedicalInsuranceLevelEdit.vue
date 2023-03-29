<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MedicalInsuranceLevelForm
      v-if="!isLoading"
      :insuranceCompanyToken="insuranceCompanyToken"
      :medicalInsuranceLevelData="medicalInsuranceLevelData"
      :submitName="$t('edit')"
      v-on:addOrUpdateMedicalInsuranceLevel="updateMedicalInsuranceLevel"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MedicalInsuranceLevelForm from "@/components/settings/settingsOther/medicalInsuranceLevels/MedicalInsuranceLevelForm.vue";
import MedicalInsuranceLevel from "@/models/settings/settingsOther/medicalInsuranceLevels/MedicalInsuranceLevel";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MedicalInsuranceLevelEdit",
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
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      medicalInsuranceLevelData: new MedicalInsuranceLevel(),
      medicalInsuranceLevelToken: this.$route.params.medicalInsuranceLevelToken,
    };
  },
  methods: {
    async getMedicalInsuranceLevelDetails() {
      this.isLoading = true;
      this.medicalInsuranceLevelData.medicalInsuranceLevelToken =
        this.medicalInsuranceLevelToken;
      try {
        let response =
          await this.medicalInsuranceLevelData.getMedicalInsuranceLevelDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.medicalInsuranceLevelData.fillData(
            response.data.medicalInsuranceLevelData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.medicalInsuranceLevelData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.medicalInsuranceLevelData = null;
      }
      this.isLoading = false;
    },
    async updateMedicalInsuranceLevel() {
      this.isLoading = true;
      try {
        let response =
          await this.medicalInsuranceLevelData.addOrUpdateMedicalInsuranceLevel(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router
            .push({
              name: "MedicalInsuranceLevels",
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
    }
    this.getMedicalInsuranceLevelDetails();
  },
};
</script>

<style scoped lang="scss"></style>
