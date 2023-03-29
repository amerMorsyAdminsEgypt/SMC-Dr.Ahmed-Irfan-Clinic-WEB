<template>
  <div class="">
    <b-button v-b-toggle.diagnosis class="btn btn-lg btn-collapse">
      {{ $t("historicalPlans.diagnosis.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="diagnosis">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="diagnosisPlanView"
              v-model="usersPrivilegeDiagnosisPlan.diagnosisPlanView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="diagnosisPlanView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="diagnosisPlanAdd"
              v-model="usersPrivilegeDiagnosisPlan.diagnosisPlanAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="diagnosisPlanAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="diagnosisPlanUpdate"
              v-model="usersPrivilegeDiagnosisPlan.diagnosisPlanUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="diagnosisPlanUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="diagnosisPlanArchive"
              v-model="usersPrivilegeDiagnosisPlan.diagnosisPlanArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="diagnosisPlanArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="diagnosisPlanDelete"
              v-model="usersPrivilegeDiagnosisPlan.diagnosisPlanDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="diagnosisPlanDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="diagnosisPlanRestore"
              v-model="usersPrivilegeDiagnosisPlan.diagnosisPlanRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="diagnosisPlanRestore">{{
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
  name: "UsersPrivilegeDiagnosisPlan",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeDiagnosisPlan"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
