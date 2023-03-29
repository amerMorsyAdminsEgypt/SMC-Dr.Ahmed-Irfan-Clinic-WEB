<template>
  <div class="">
    <b-button v-b-toggle.questionPlans class="btn btn-lg btn-collapse">
      {{ $t("historicalPlans.questionPlans.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="questionPlans">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="questionPlanView"
              v-model="usersPrivilegeQuestionPlan.questionPlanView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="questionPlanView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="questionPlanAdd"
              v-model="usersPrivilegeQuestionPlan.questionPlanAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="questionPlanAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="questionPlanUpdate"
              v-model="usersPrivilegeQuestionPlan.questionPlanUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="questionPlanUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="questionPlanArchive"
              v-model="usersPrivilegeQuestionPlan.questionPlanArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="questionPlanArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="questionPlanDelete"
              v-model="usersPrivilegeQuestionPlan.questionPlanDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="questionPlanDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="questionPlanRestore"
              v-model="usersPrivilegeQuestionPlan.questionPlanRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="questionPlanRestore">{{
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
  name: "UsersPrivilegeQuestionPlan",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeQuestionPlan"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
