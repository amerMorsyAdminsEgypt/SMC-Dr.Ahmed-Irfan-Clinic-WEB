<template>
  <div class="">
    <b-button v-b-toggle.clients class="btn btn-lg btn-collapse">
      {{ $t("clients") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="clients">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="clientsView"
              v-model="usersPrivilegeClients.clientsView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="clientsView">{{ $t("view") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="clientsAdd"
              v-model="usersPrivilegeClients.clientsAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="clientsAdd">{{ $t("add") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="clientsUpdate"
              v-model="usersPrivilegeClients.clientsUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="clientsUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="clientsArchive"
              v-model="usersPrivilegeClients.clientsArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="clientsArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="clientsDelete"
              v-model="usersPrivilegeClients.clientsDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="clientsDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="clientsRestore"
              v-model="usersPrivilegeClients.clientsRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="clientsRestore">{{
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
  name: "UsersPrivilegeClients",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeClients"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
