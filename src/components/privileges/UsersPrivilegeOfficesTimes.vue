<template>
  <div class="">
    <b-button v-b-toggle.officesTimes class="btn btn-lg btn-collapse">
      {{ $t("officesTimes") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="officesTimes">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="officesTimesView"
              v-model="usersPrivilegeOfficesTimes.officesTimesView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="officesTimesView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="officesTimesAdd"
              v-model="usersPrivilegeOfficesTimes.officesTimesAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="officesTimesAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="officesTimesUpdate"
              v-model="usersPrivilegeOfficesTimes.officesTimesUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="officesTimesUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="officesTimesArchive"
              v-model="usersPrivilegeOfficesTimes.officesTimesArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="officesTimesArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="officesTimesDelete"
              v-model="usersPrivilegeOfficesTimes.officesTimesDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="officesTimesDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="officesTimesRestore"
              v-model="usersPrivilegeOfficesTimes.officesTimesRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="officesTimesRestore">{{
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
  name: "UsersPrivilegeOfficesTimes",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeOfficesTimes"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
