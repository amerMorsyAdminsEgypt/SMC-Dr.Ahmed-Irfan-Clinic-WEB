<template>
  <div class="">
    <b-button v-b-toggle.measurementRooms class="btn btn-lg btn-collapse">
      {{ $t("historicalPlans.measurementRooms.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="measurementRooms">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationViewMeasurementRoom"
              v-model="
                usersPrivilegeMeasurements.servicesReservationViewMeasurementRoom
              "
              class="checkbox"
            />
            <label
              class="mt-1 ml-2"
              for="servicesReservationViewMeasurementRoom"
              >{{ $t("view") }}</label
            >
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationAddMeasurementRoom"
              v-model="
                usersPrivilegeMeasurements.servicesReservationAddMeasurementRoom
              "
              class="checkbox"
            />
            <label
              class="mt-1 ml-2"
              for="servicesReservationAddMeasurementRoom"
              >{{ $t("add") }}</label
            >
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationUpdateMeasurementRoom"
              v-model="
                usersPrivilegeMeasurements.servicesReservationUpdateMeasurementRoom
              "
              class="checkbox"
            />
            <label
              class="mt-1 ml-2"
              for="servicesReservationUpdateMeasurementRoom"
              >{{ $t("edit") }}</label
            >
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationDeleteMeasurementRoom"
              v-model="
                usersPrivilegeMeasurements.servicesReservationDeleteMeasurementRoom
              "
              class="checkbox"
            />
            <label
              class="mt-1 ml-2"
              for="servicesReservationDeleteMeasurementRoom"
              >{{ $t("finalDelete") }}</label
            >
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeMeasurements",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeMeasurements"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
