<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MedicationPlanForm
      v-if="!isLoading"
      v-on:addOrUpdateMedicationPlan="addMedicationPlan()"
      :medicationPlanData="medicationPlanData"
      :submitName="$t('add')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MedicationPlanForm from "@/components/historicalPlans/medicationPlans/MedicationPlanForm.vue";
import MedicationPlan from "@/models/historicalPlans/medicationPlans/MedicationPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MedicationPlanAdd",
  mixins: [createToastMixin],
  props: ["clientToken", "reservationToken"],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicationPlanForm,
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
      medicationPlanData: new MedicationPlan(),
    };
  },
  methods: {
    async addMedicationPlan() {
      this.isLoading = true;
      try {
        let response = await this.medicationPlanData.addOrUpdateMedicationPlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.medicationPlanData.setInitialValue();
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
      this.medicationPlanData.clientToken = this.clientToken
        ? this.clientToken
        : "";
      this.medicationPlanData.reservationToken = this.reservationToken
        ? this.reservationToken
        : "";
    },
  },
  async created() {
    this.setFilter();
  },
};
</script>

<style scoped lang="scss"></style>
