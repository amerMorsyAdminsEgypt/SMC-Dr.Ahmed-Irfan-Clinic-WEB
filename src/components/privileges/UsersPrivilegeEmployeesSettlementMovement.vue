<template>
  <div class="">
    <b-button
      v-b-toggle.usersPrivilegeEmployeesSettlementMovement
      class="btn btn-lg btn-collapse"
    >
      {{ $t("points") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="usersPrivilegeEmployeesSettlementMovement">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesSettlementMovementView"
              v-model="
                usersPrivilegeEmployeesSettlementMovement.employeesSettlementMovementView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesSettlementMovementView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesSettlementMovementViewAll"
              v-model="
                usersPrivilegeEmployeesSettlementMovement.employeesSettlementMovementViewAll
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesSettlementMovementViewAll">{{
              $t("viewPointsHistoryForAll")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesSettlementMovementViewSelf"
              v-model="
                usersPrivilegeEmployeesSettlementMovement.employeesSettlementMovementViewSelf
              "
              class="checkbox"
            />
            <label
              class="mt-1 ml-2"
              for="employeesSettlementMovementViewSelf"
              >{{ $t("viewPointsHistoryForSelf") }}</label
            >
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesSettlementMovementAdd"
              v-model="
                usersPrivilegeEmployeesSettlementMovement.employeesSettlementMovementAdd
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesSettlementMovementAdd">{{
              $t("pointsSettlementForUser")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesSettlementMovementDelete"
              v-model="
                usersPrivilegeEmployeesSettlementMovement.employeesSettlementMovementDelete
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesSettlementMovementDelete">{{
              $t("cancelPointsSettlementForUser")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeEmployeesSettlementMovement",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeEmployeesSettlementMovement"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
