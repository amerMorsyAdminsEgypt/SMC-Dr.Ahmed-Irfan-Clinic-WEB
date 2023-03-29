<template>
  <div class="">
    <b-button v-b-toggle.theTreasuries class="btn btn-lg btn-collapse">
      {{ $t("theTreasuries") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="theTreasuries">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="treasuriesView"
              v-model="usersPrivilegeTreasuries.treasuriesView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="treasuriesView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="treasuriesAdd"
              v-model="usersPrivilegeTreasuries.treasuriesAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="treasuriesAdd">{{ $t("add") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="treasuriesUpdate"
              v-model="usersPrivilegeTreasuries.treasuriesUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="treasuriesUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="treasuriesArchive"
              v-model="usersPrivilegeTreasuries.treasuriesArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="treasuriesArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="treasuriesDelete"
              v-model="usersPrivilegeTreasuries.treasuriesDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="treasuriesDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="treasuriesRestore"
              v-model="usersPrivilegeTreasuries.treasuriesRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="treasuriesRestore">{{
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
  name: "UsersPrivilegeTreasuries",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeTreasuries"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
