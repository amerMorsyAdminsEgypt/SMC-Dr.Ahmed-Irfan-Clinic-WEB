<template>
  <div class="">
    <b-button
      v-b-toggle.usersPrivilegeEmployeesAttendance
      class="btn btn-lg btn-collapse"
    >
      {{ $t("attendance") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="usersPrivilegeEmployeesAttendance">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesAttendanceView"
              v-model="
                usersPrivilegeEmployeesAttendance.employeesAttendanceView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesAttendanceView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesAttendanceViewAll"
              v-model="
                usersPrivilegeEmployeesAttendance.employeesAttendanceViewAll
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesAttendanceViewAll">{{
              $t("viewAttendanceHistoryForAll")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesAttendanceViewSelf"
              v-model="
                usersPrivilegeEmployeesAttendance.employeesAttendanceViewSelf
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesAttendanceViewSelf">{{
              $t("viewAttendanceHistoryForSelf")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesAttendanceAttendanceList"
              v-model="
                usersPrivilegeEmployeesAttendance.employeesAttendanceAttendanceList
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesAttendanceAttendanceList">{{
              $t("addAttendanceForAll")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesAttendanceAttendedSelf"
              v-model="
                usersPrivilegeEmployeesAttendance.employeesAttendanceAttendedSelf
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesAttendanceAttendedSelf">{{
              $t("addAttendanceForSelf")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesAttendanceDepatureList"
              v-model="
                usersPrivilegeEmployeesAttendance.employeesAttendanceDepatureList
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesAttendanceDepatureList">{{
              $t("addDepartureForAll")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesAttendanceDepartureSelf"
              v-model="
                usersPrivilegeEmployeesAttendance.employeesAttendanceDepartureSelf
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesAttendanceDepartureSelf">{{
              $t("addDepartureForSelf")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesAttendanceAttendanceManual"
              v-model="
                usersPrivilegeEmployeesAttendance.employeesAttendanceAttendanceManual
              "
              class="checkbox"
            />
            <label
              class="mt-1 ml-2"
              for="employeesAttendanceAttendanceManual"
              >{{ $t("addAttendanceHistoryForUser") }}</label
            >
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesAttendanceUpdate"
              v-model="
                usersPrivilegeEmployeesAttendance.employeesAttendanceUpdate
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesAttendanceUpdate">{{
              $t("updateAttendanceHistoryForUser")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesAttendanceDelete"
              v-model="
                usersPrivilegeEmployeesAttendance.employeesAttendanceDelete
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesAttendanceDelete">{{
              $t("deleteAttendanceHistoryForUser")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeEmployeesAttendance",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeEmployeesAttendance"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
