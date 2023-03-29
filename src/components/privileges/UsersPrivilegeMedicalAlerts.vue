<template>
  <div class="">
    <b-button v-b-toggle.warnings class="btn btn-lg btn-collapse">
      {{ $t("historicalPlans.warnings.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="warnings">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicalAlertView"
              v-model="usersPrivilegeMedicalAlerts.medicalAlertView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicalAlertView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicalAlertAdd"
              v-model="usersPrivilegeMedicalAlerts.medicalAlertAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicalAlertAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicalAlertUpdate"
              v-model="usersPrivilegeMedicalAlerts.medicalAlertUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicalAlertUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicalAlertArchive"
              v-model="usersPrivilegeMedicalAlerts.medicalAlertArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicalAlertArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicalAlertDelete"
              v-model="usersPrivilegeMedicalAlerts.medicalAlertDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicalAlertDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="medicalAlertRestore"
              v-model="usersPrivilegeMedicalAlerts.medicalAlertRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="medicalAlertRestore">{{
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
  name: "UsersPrivilegeMedicalAlerts",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeMedicalAlerts"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
