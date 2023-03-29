<template>
  <div class="">
    <b-button
      v-b-toggle.userPrivillegBranchesSettings
      class="btn btn-lg btn-collapse"
    >
      {{ $t("settings-general") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="userPrivillegBranchesSettings">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesSettingesView"
              v-model="userPrivillegBranchesSettings.branchesSettingesView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesSettingesView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesSettingesAdd"
              v-model="userPrivillegBranchesSettings.branchesSettingesAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesSettingesAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesSettingesUpdate"
              v-model="userPrivillegBranchesSettings.branchesSettingesUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesSettingesUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesSettingesArchive"
              v-model="userPrivillegBranchesSettings.branchesSettingesArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesSettingesArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesSettingesDelete"
              v-model="userPrivillegBranchesSettings.branchesSettingesDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesSettingesDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesSettingesRestore"
              v-model="userPrivillegBranchesSettings.branchesSettingesRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesSettingesRestore">{{
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
  name: "UserPrivillegBranchesSettings",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["userPrivillegBranchesSettings"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
