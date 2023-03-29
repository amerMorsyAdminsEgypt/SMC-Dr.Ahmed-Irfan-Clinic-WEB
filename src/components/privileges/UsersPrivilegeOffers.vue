<template>
  <div class="">
    <b-button v-b-toggle.offers class="btn btn-lg btn-collapse">
      {{ $t("offers") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="offers">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="offersView"
              v-model="usersPrivilegeOffers.offersView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="offersView">{{ $t("view") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="offersAdd"
              v-model="usersPrivilegeOffers.offersAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="offersAdd">{{ $t("add") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="offersUpdate"
              v-model="usersPrivilegeOffers.offersUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="offersUpdate">{{ $t("edit") }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="offersArchive"
              v-model="usersPrivilegeOffers.offersArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="offersArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="offersDelete"
              v-model="usersPrivilegeOffers.offersDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="offersDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="offersRestore"
              v-model="usersPrivilegeOffers.offersRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="offersRestore">{{
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
  name: "UsersPrivilegeOffers",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeOffers"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
