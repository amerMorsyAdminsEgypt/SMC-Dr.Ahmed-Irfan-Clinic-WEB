<template>
  <div class="">
    <b-button
      v-b-toggle.usersPrivilegeEmployeesMovement
      class="btn btn-lg btn-collapse"
    >
      {{ $t("movement") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="usersPrivilegeEmployeesMovement">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementView"
              v-model="usersPrivilegeEmployeesMovement.employeesMovementView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementViewSelf"
              v-model="
                usersPrivilegeEmployeesMovement.employeesMovementViewSelf
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementViewSelf">{{
              $t("viewMovementHistoryForSelf")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementViewAll"
              v-model="usersPrivilegeEmployeesMovement.employeesMovementViewAll"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementViewAll">{{
              $t("viewMovementHistoryForAll")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementUserMoveSelf"
              v-model="
                usersPrivilegeEmployeesMovement.employeesMovementUserMoveSelf
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementUserMoveSelf">{{
              $t("addMovementForSelf")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementAddManual"
              v-model="
                usersPrivilegeEmployeesMovement.employeesMovementAddManual
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementAddManual">{{
              $t("addMovementHistoryForUser")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementUpdate"
              v-model="usersPrivilegeEmployeesMovement.employeesMovementUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementUpdate">{{
              $t("updateMovementHistoryForUser")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementDelete"
              v-model="usersPrivilegeEmployeesMovement.employeesMovementDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementDelete">{{
              $t("deleteMovementHistoryForUser")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeEmployeesMovement",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeEmployeesMovement"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
