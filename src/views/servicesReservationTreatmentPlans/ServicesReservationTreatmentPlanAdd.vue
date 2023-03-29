<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ServicesReservationTreatmentPlanForm
      v-if="!isLoading"
      v-on:addOrUpdateServicesReservationTreatmentPlan="
        addServicesReservationTreatmentPlan()
      "
      :treatmentPlanData="treatmentPlanData"
      :submitName="$t('add')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ServicesReservationTreatmentPlanForm from "@/components/servicesReservationTreatmentPlans/ServicesReservationTreatmentPlanForm.vue";
import ServicesReservationTreatmentPlan from "@/models/servicesReservationTreatmentPlans/ServicesReservationTreatmentPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesReservationTreatmentPlanAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ServicesReservationTreatmentPlanForm,
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
      treatmentPlanData: new ServicesReservationTreatmentPlan(),
    };
  },
  methods: {
    async addServicesReservationTreatmentPlan() {
      this.isLoading = true;
      try {
        let response =
          await this.treatmentPlanData.addOrUpdateServicesReservationTreatmentPlan(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.treatmentPlanData.setInitialValue();
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
    this.treatmentPlanData.clientToken = this.$route.params.clientToken
      ? this.$route.params.clientToken
      : "";
    this.treatmentPlanData.reservationToken = this.$route.params
      .reservationToken
      ? this.$route.params.reservationToken
      : "";
  },
};
</script>

<style scoped lang="scss"></style>
