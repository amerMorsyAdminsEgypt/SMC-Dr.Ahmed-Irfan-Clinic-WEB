<template>
  <div class="">
    <b-button
      v-b-toggle.usersPrivilegeEmployeesMovementMedai
      class="btn btn-lg btn-collapse"
    >
      {{ $t("media") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="usersPrivilegeEmployeesMovementMedai">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementMediaView"
              v-model="
                usersPrivilegeEmployeesMovementMedai.employeesMovementMediaView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementMediaView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementMediaAdd"
              v-model="
                usersPrivilegeEmployeesMovementMedai.employeesMovementMediaAdd
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementMediaAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementMediaUpdate"
              v-model="
                usersPrivilegeEmployeesMovementMedai.employeesMovementMediaUpdate
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementMediaUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementMediaArchive"
              v-model="
                usersPrivilegeEmployeesMovementMedai.employeesMovementMediaArchive
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementMediaArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementMediaDelete"
              v-model="
                usersPrivilegeEmployeesMovementMedai.employeesMovementMediaDelete
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementMediaDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMovementMediaRestore"
              v-model="
                usersPrivilegeEmployeesMovementMedai.employeesMovementMediaRestore
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMovementMediaRestore">{{
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
  name: "UsersPrivilegeEmployeesMovementMedai",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeEmployeesMovementMedai"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
