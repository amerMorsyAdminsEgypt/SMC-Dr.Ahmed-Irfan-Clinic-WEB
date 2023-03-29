<template>
  <div class="">
    <b-button v-b-toggle.requirements class="btn btn-lg btn-collapse">
      {{ $t("historicalPlans.requirements.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="requirements">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicalRequirementsPlanView"
              v-model="
                usersPrivilegeMedicalRequirementsPlan.medicalRequirementsPlanView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicalRequirementsPlanView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicalRequirementsPlanAdd"
              v-model="
                usersPrivilegeMedicalRequirementsPlan.medicalRequirementsPlanAdd
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicalRequirementsPlanAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicalRequirementsPlanUpdate"
              v-model="
                usersPrivilegeMedicalRequirementsPlan.medicalRequirementsPlanUpdate
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicalRequirementsPlanUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicalRequirementsPlanArchive"
              v-model="
                usersPrivilegeMedicalRequirementsPlan.medicalRequirementsPlanArchive
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicalRequirementsPlanArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicalRequirementsPlanDelete"
              v-model="
                usersPrivilegeMedicalRequirementsPlan.medicalRequirementsPlanDelete
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicalRequirementsPlanDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicalRequirementsPlanRestore"
              v-model="
                usersPrivilegeMedicalRequirementsPlan.medicalRequirementsPlanRestore
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicalRequirementsPlanRestore">{{
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
  name: "UsersPrivilegeMedicalRequirementsPlan",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeMedicalRequirementsPlan"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
