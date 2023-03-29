<template>
  <div class="">
    <b-button v-b-toggle.usersPrivilegeUsers class="btn btn-lg btn-collapse">
      {{ $t("privileges") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="usersPrivilegeUsers">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="usersPrivilegeView"
              v-model="usersPrivilegeUsers.usersPrivilegeView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="usersPrivilegeView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="usersPrivilegeUpdate"
              v-model="usersPrivilegeUsers.usersPrivilegeUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="usersPrivilegeUpdate">{{
              $t("edit")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="usersLogView"
              v-model="usersPrivilegeUsers.usersLogView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="usersLogView">{{
              $t("logView")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeUsers",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeUsers"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
