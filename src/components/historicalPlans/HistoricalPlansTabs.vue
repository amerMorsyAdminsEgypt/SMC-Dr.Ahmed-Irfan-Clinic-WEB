<template>
  <div class="">
    <b-tabs v-if="historicalPlansOptions" content-class="mt-4">
      <b-tab
        v-for="(option, index) in historicalPlansOptions"
        :key="index"
        @click="goTo(option.to, option.currentTab)"
        title-item-class="tab-container-media"
      >
        <template #title>
          <span v-b-popover.hover.bottomright="`${option.itemName}`">
            <img :src="`${option.itemImagePath}`" class="icon-tab" />
            <span>{{ option.itemName }}</span></span
          >
        </template>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import imgDiagnosisPlans from "@/assets/images/diagnosis-plans.svg";
import imgMedicalPrescription from "@/assets/images/medical-prescription.svg";
import imgMeasurementRooms from "@/assets/images/measurement-rooms.svg";
import imgTreatmentPlan from "@/assets/images/treatmentPlan.svg";
import imgRays from "@/assets/images/medical-rays.svg";
import imgMedicalTests from "@/assets/images/medical-tests.svg";
import imgDiseases from "@/assets/images/diseases.svg";
import imgHabits from "@/assets/images/habits.svg";
import imgWarning from "@/assets/images/warning.svg";
import imgOperations from "@/assets/images/medical-operations.svg";
import imgDoctorNotes from "@/assets/images/doctor-notes.svg";
import imgQuestions from "@/assets/images/questions.svg";
import { REQUIREMENTS_TYPE_TOKENS } from "@/utils/constantLists";

export default {
  name: "HistoricalPlansTabs",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      historicalPlansOptions: [
        {
          to: { name: "DiagnosisPlans" },
          itemName: this.$t("historicalPlans.diagnosis.modelName"),
          itemImagePath: imgDiagnosisPlans,
          currentTab: "",
        },
        {
          to: { name: "MedicationPlans" },
          itemName: this.$t("historicalPlans.medicalPrescription.modelName"),
          itemImagePath: imgMedicalPrescription,
          currentTab: "",
        },
        {
          to: { name: "MeasurementRooms" },
          itemName: this.$t("historicalPlans.measurementRooms.modelName"),
          itemImagePath: imgMeasurementRooms,
          currentTab: "",
        },
        {
          to: {
            name: "MedicalRequirementsPlansRays",
            params: {
              requirementTypeToken: REQUIREMENTS_TYPE_TOKENS.Rays,
            },
          },
          itemName: this.$t("historicalPlans.rays.modelName"),
          itemImagePath: imgRays,
          currentTab: "",
        },
        {
          to: {
            name: "MedicalRequirementsPlansTests",
            params: {
              requirementTypeToken: REQUIREMENTS_TYPE_TOKENS.MedicalTests,
            },
          },
          itemName: this.$t("historicalPlans.medicalTests.modelName"),
          itemImagePath: imgMedicalTests,
          currentTab: "",
        },
        {
          to: { name: "AddictiveStuffClientsDiseases" },
          itemName: this.$t("historicalPlans.diseases.modelName"),
          itemImagePath: imgDiseases,
          currentTab: "",
        },
        {
          to: { name: "AddictiveStuffClientsHabits" },
          itemName: this.$t("historicalPlans.habits.modelName"),
          itemImagePath: imgHabits,
          currentTab: "",
        },
        {
          to: { name: "Operations" },
          itemName: this.$t("historicalPlans.operations.modelName"),
          itemImagePath: imgOperations,
          currentTab: "",
        },
        {
          to: { name: "MedicalAlerts" },
          itemName: this.$t("historicalPlans.warnings.modelName"),
          itemImagePath: imgWarning,
          currentTab: "",
        },
        {
          to: { name: "CurePlans" },
          itemName: this.$t("historicalPlans.curePlans.modelName"),
          itemImagePath: imgTreatmentPlan,
          currentTab: "",
        },
        {
          to: { name: "DoctorNotes" },
          itemName: this.$t("historicalPlans.doctorNotes.modelName"),
          itemImagePath: imgDoctorNotes,
          currentTab: "",
        },
        {
          to: { name: "QuestionPlans" },
          itemName: this.$t("historicalPlans.questionPlans.modelName"),
          itemImagePath: imgQuestions,
          currentTab: "",
        },
      ],
    };
  },
  methods: {
    goTo(path, currentTab) {
      this.$router.push(path).catch(() => {});
      this.$store.dispatch("updateCurrentTab", currentTab);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
