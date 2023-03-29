<template>
  <div class="">
    <b-button v-b-toggle.MedicationPlan class="btn btn-lg btn-collapse">
      {{ $t("historicalPlans.medicalPrescription.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="MedicationPlan">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicationPlanView"
              v-model="usersPrivilegeMedicationPlan.medicationPlanView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicationPlanView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicationPlanAdd"
              v-model="usersPrivilegeMedicationPlan.medicationPlanAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicationPlanAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicationPlanUpdate"
              v-model="usersPrivilegeMedicationPlan.medicationPlanUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicationPlanUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicationPlanArchive"
              v-model="usersPrivilegeMedicationPlan.medicationPlanArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicationPlanArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicationPlanDelete"
              v-model="usersPrivilegeMedicationPlan.medicationPlanDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicationPlanDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicationPlanRestore"
              v-model="usersPrivilegeMedicationPlan.medicationPlanRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicationPlanRestore">{{
              $t("restore")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeMedicationPlan",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeMedicationPlan"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
