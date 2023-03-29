<template>
  <div class="">
    <b-button v-b-toggle.doctorNotes class="btn btn-lg btn-collapse">
      {{ $t("historicalPlans.doctorNotes.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="doctorNotes">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="doctorNotesView"
              v-model="usersPrivilegeDoctorNotes.doctorNotesView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="doctorNotesView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="doctorNotesAdd"
              v-model="usersPrivilegeDoctorNotes.doctorNotesAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="doctorNotesAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="doctorNotesUpdate"
              v-model="usersPrivilegeDoctorNotes.doctorNotesUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="doctorNotesUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="doctorNotesArchive"
              v-model="usersPrivilegeDoctorNotes.doctorNotesArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="doctorNotesArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="doctorNotesDelete"
              v-model="usersPrivilegeDoctorNotes.doctorNotesDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="doctorNotesDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="doctorNotesRestore"
              v-model="usersPrivilegeDoctorNotes.doctorNotesRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="doctorNotesRestore">{{
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
  name: "UsersPrivilegeDoctorNotes",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeDoctorNotes"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
