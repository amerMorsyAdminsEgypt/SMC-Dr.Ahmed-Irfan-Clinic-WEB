<template>
  <div class="">
    <b-button
      v-b-toggle.usersPrivilegAdditionalSettings
      class="btn btn-lg btn-collapse"
    >
      {{ $t("settings-additional") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="usersPrivilegAdditionalSettings">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="additionalSettingsView"
              v-model="usersPrivilegAdditionalSettings.additionalSettingsView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="additionalSettingsView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="additionalSettingsAdd"
              v-model="usersPrivilegAdditionalSettings.additionalSettingsAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="additionalSettingsAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="additionalSettingsUpdate"
              v-model="usersPrivilegAdditionalSettings.additionalSettingsUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="additionalSettingsUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="additionalSettingsArchive"
              v-model="
                usersPrivilegAdditionalSettings.additionalSettingsArchive
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="additionalSettingsArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="additionalSettingsDelete"
              v-model="usersPrivilegAdditionalSettings.additionalSettingsDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="additionalSettingsDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="additionalSettingsRestore"
              v-model="
                usersPrivilegAdditionalSettings.additionalSettingsRestore
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="additionalSettingsRestore">{{
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
  name: "UsersPrivilegAdditionalSettings",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegAdditionalSettings"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
