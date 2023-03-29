<template>
  <div class="">
    <b-button
      v-b-toggle.ServiceReservationMedia
      class="btn btn-lg btn-collapse"
    >
      {{ $t("ServiceReservationMedia.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="ServiceReservationMedia">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="serviceReservationMediaView"
              v-model="
                usersPrivilegeServiceReservationMedia.serviceReservationMediaView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="serviceReservationMediaView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="serviceReservationMediaAdd"
              v-model="
                usersPrivilegeServiceReservationMedia.serviceReservationMediaAdd
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="serviceReservationMediaAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="serviceReservationMediaUpdate"
              v-model="
                usersPrivilegeServiceReservationMedia.serviceReservationMediaUpdate
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="serviceReservationMediaUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="serviceReservationMediaArchive"
              v-model="
                usersPrivilegeServiceReservationMedia.serviceReservationMediaArchive
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="serviceReservationMediaArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="serviceReservationMediaDelete"
              v-model="
                usersPrivilegeServiceReservationMedia.serviceReservationMediaDelete
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="serviceReservationMediaDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="serviceReservationMediaRestore"
              v-model="
                usersPrivilegeServiceReservationMedia.serviceReservationMediaRestore
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="serviceReservationMediaRestore">{{
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
  name: "UsersPrivilegeServiceReservationMedia",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeServiceReservationMedia"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
