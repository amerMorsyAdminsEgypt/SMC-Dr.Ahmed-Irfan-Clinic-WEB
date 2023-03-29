<template>
  <div class="">
    <b-button v-b-toggle.establishmentsSettings class="btn btn-lg btn-collapse">
      {{ $t("settings-establishment") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="establishmentsSettings">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="establishmentsSettingsView"
              v-model="
                usersPrivilegeEstablishmentsSettings.establishmentsSettingsView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="establishmentsSettingsView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="establishmentsSettingsAdd"
              v-model="
                usersPrivilegeEstablishmentsSettings.establishmentsSettingsAdd
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="establishmentsSettingsAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="establishmentsSettingsUpdate"
              v-model="
                usersPrivilegeEstablishmentsSettings.establishmentsSettingsUpdate
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="establishmentsSettingsUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="establishmentsSettingsArchive"
              v-model="
                usersPrivilegeEstablishmentsSettings.establishmentsSettingsArchive
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="establishmentsSettingsArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="establishmentsSettingsDelete"
              v-model="
                usersPrivilegeEstablishmentsSettings.establishmentsSettingsDelete
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="establishmentsSettingsDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="establishmentsSettingsRestore"
              v-model="
                usersPrivilegeEstablishmentsSettings.establishmentsSettingsRestore
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="establishmentsSettingsRestore">{{
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
  name: "UsersPrivilegeEstablishmentsSettings",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeEstablishmentsSettings"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
