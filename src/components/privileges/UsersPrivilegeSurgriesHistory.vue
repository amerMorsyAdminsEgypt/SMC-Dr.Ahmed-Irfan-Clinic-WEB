<template>
  <div class="">
    <b-button v-b-toggle.operations class="btn btn-lg btn-collapse">
      {{ $t("historicalPlans.operations.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="operations">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="surgriesHistoryView"
              v-model="usersPrivilegeSurgriesHistory.surgriesHistoryView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="surgriesHistoryView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="surgriesHistoryAdd"
              v-model="usersPrivilegeSurgriesHistory.surgriesHistoryAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="surgriesHistoryAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="surgriesHistoryUpdate"
              v-model="usersPrivilegeSurgriesHistory.surgriesHistoryUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="surgriesHistoryUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="surgriesHistoryArchive"
              v-model="usersPrivilegeSurgriesHistory.surgriesHistoryArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="surgriesHistoryArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="surgriesHistoryDelete"
              v-model="usersPrivilegeSurgriesHistory.surgriesHistoryDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="surgriesHistoryDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="surgriesHistoryRestore"
              v-model="usersPrivilegeSurgriesHistory.surgriesHistoryRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="surgriesHistoryRestore">{{
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
  name: "UsersPrivilegeSurgriesHistory",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeSurgriesHistory"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
