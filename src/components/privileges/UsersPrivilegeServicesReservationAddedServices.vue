<template>
  <div class="">
    <b-button
      v-b-toggle.ServicesReservationAddedServices
      class="btn btn-lg btn-collapse"
    >
      {{ $t("ServicesReservationAddedServices.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="ServicesReservationAddedServices">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationAddedServicesView"
              v-model="
                usersPrivilegeServicesReservationAddedServices.servicesReservationAddedServicesView
              "
              class="checkbox"
            />
            <label
              class="mt-1 ml-2"
              for="servicesReservationAddedServicesView"
              >{{ $t("view") }}</label
            >
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationAddedServicesAdd"
              v-model="
                usersPrivilegeServicesReservationAddedServices.servicesReservationAddedServicesAdd
              "
              class="checkbox"
            />
            <label
              class="mt-1 ml-2"
              for="servicesReservationAddedServicesAdd"
              >{{ $t("add") }}</label
            >
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationAddedServicesCancel"
              v-model="
                usersPrivilegeServicesReservationAddedServices.servicesReservationAddedServicesCancel
              "
              class="checkbox"
            />
            <label
              class="mt-1 ml-2"
              for="servicesReservationAddedServicesCancel"
              >{{ $t("cancel") }}</label
            >
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeServicesReservationAddedServices",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeServicesReservationAddedServices"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
