<template>
  <div class="">
    <b-button v-b-toggle.theBranches class="btn btn-lg btn-collapse">
      {{ $t("theBranches") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="theBranches">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesView"
              v-model="usersPrivilegeBranches.branchesView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesView">{{ $t("view") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesAdd"
              v-model="usersPrivilegeBranches.branchesAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesAdd">{{ $t("add") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesUpdate"
              v-model="usersPrivilegeBranches.branchesUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesArchive"
              v-model="usersPrivilegeBranches.branchesArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesDelete"
              v-model="usersPrivilegeBranches.branchesDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesRestore"
              v-model="usersPrivilegeBranches.branchesRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesRestore">{{
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
  name: "UsersPrivilegeBranches",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeBranches"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
