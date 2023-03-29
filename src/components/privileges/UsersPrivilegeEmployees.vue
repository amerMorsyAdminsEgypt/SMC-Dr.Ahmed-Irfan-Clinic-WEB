<template>
  <div class="">
    <b-button v-b-toggle.employees class="btn btn-lg btn-collapse">
      {{ $t("employees") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="employees">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesView"
              v-model="usersPrivilegeEmployees.employeesView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesAdd"
              v-model="usersPrivilegeEmployees.employeesAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesAdd">{{ $t("add") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesUpdate"
              v-model="usersPrivilegeEmployees.employeesUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesArchive"
              v-model="usersPrivilegeEmployees.employeesArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesDelete"
              v-model="usersPrivilegeEmployees.employeesDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesRestore"
              v-model="usersPrivilegeEmployees.employeesRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesRestore">{{
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
  name: "UsersPrivilegeEmployees",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeEmployees"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
