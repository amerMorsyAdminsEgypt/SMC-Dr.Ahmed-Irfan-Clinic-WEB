<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MedicalRequirementsPlanForm
      v-if="!isLoading"
      v-on:addOrUpdateMedicalRequirementsPlan="updateMedicalRequirementsPlan()"
      :medicalRequirementsPlanData="medicalRequirementsPlanData"
      :submitName="$t('edit')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MedicalRequirementsPlanForm from "@/components/historicalPlans/medicalRequirementsPlans/MedicalRequirementsPlanForm.vue";
import MedicalRequirementsPlan from "@/models/historicalPlans/medicalRequirementsPlans/MedicalRequirementsPlan";
import createToastMixin from "@/utils/create-toast-mixin";
import { REQUIREMENTS_TYPE_TOKENS } from "@/utils/constantLists";

export default {
  name: "MedicalRequirementsPlanRaysEdit",
  mixins: [createToastMixin],
  props: ["clientToken", "reservationToken", "medicalRequirementsPlanToken"],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicalRequirementsPlanForm,
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
      medicalRequirementsPlanData: new MedicalRequirementsPlan(),
      requirementTypeToken: REQUIREMENTS_TYPE_TOKENS.Rays,
    };
  },
  methods: {
    async getMedicalRequirementsPlanDetalis() {
      this.isLoading = true;
      try {
        let response =
          await this.medicalRequirementsPlanData.getMedicalRequirementsPlanDetalis(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.medicalRequirementsPlanData.fillData(
            response.data.medicalRequirementsPlansData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.$router
            .push({
              name: "MedicalRequirementsPlansRays",
              params: {
                clientToken: this.clientToken,
                reservationToken: this.reservationToken,
              },
            })
            .catch(() => {});
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.$router
          .push({
            name: "MedicalRequirementsPlansRays",
            params: {
              clientToken: this.clientToken,
              reservationToken: this.reservationToken,
            },
          })
          .catch(() => {});
      }
      this.isLoading = false;
    },
    async updateMedicalRequirementsPlan() {
      this.isLoading = true;
      try {
        let response =
          await this.medicalRequirementsPlanData.addOrUpdateMedicalRequirementsPlan(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.medicalRequirementsPlanData.setInitialValue();
          this.setFilter();
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
    setFilter() {
      this.medicalRequirementsPlanData.clientToken = this.clientToken
        ? this.clientToken
        : "";
      this.medicalRequirementsPlanData.reservationToken = this.reservationToken
        ? this.reservationToken
        : "";
      this.medicalRequirementsPlanData.medicalRequirementsPlanToken = this
        .medicalRequirementsPlanToken
        ? this.medicalRequirementsPlanToken
        : "";
      this.medicalRequirementsPlanData.requirementTypeToken = this
        .requirementTypeToken
        ? this.requirementTypeToken
        : "";
    },
  },
  async created() {
    this.setFilter();
    this.getMedicalRequirementsPlanDetalis();
  },
};
</script>

<style scoped lang="scss"></style>
