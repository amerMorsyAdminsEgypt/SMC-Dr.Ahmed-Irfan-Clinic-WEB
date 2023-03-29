<template>
  <div class="">
    <b-button v-b-toggle.servicesReservations class="btn btn-lg btn-collapse">
      {{ $t("servicesReservations") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="servicesReservations">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationView"
              v-model="
                usersPrivilegeServicesReservations.servicesReservationView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="servicesReservationView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationAdd"
              v-model="
                usersPrivilegeServicesReservations.servicesReservationAdd
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="servicesReservationAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationApprov"
              v-model="
                usersPrivilegeServicesReservations.servicesReservationApprov
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="servicesReservationApprov">{{
              $t("approveOnServicesReservation")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationAddCancel"
              v-model="
                usersPrivilegeServicesReservations.servicesReservationAddCancel
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="servicesReservationAddCancel">{{
              $t("cancelServicesReservation")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationAttendance"
              v-model="
                usersPrivilegeServicesReservations.servicesReservationAttendance
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="servicesReservationAttendance">{{
              $t("attendServicesReservation")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationEnter"
              v-model="
                usersPrivilegeServicesReservations.servicesReservationEnter
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="servicesReservationEnter">{{
              $t("enterServicesReservation")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationWaitAndWillComeBack"
              v-model="
                usersPrivilegeServicesReservations.servicesReservationWaitAndWillComeBack
              "
              class="checkbox"
            />
            <label
              class="mt-1 ml-2"
              for="servicesReservationWaitAndWillComeBack"
              >{{ $t("waitForComeBackServicesReservation") }}</label
            >
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationFinish"
              v-model="
                usersPrivilegeServicesReservations.servicesReservationFinish
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="servicesReservationFinish">{{
              $t("finishServicesReservation")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationViewPay"
              v-model="
                usersPrivilegeServicesReservations.servicesReservationViewPay
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="servicesReservationViewPay">{{
              $t("servicesPaymentsView")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationAddPay"
              v-model="
                usersPrivilegeServicesReservations.servicesReservationAddPay
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="servicesReservationAddPay">{{
              $t("servicesPaymentsAdd")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationRefoundPay"
              v-model="
                usersPrivilegeServicesReservations.servicesReservationRefoundPay
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="servicesReservationRefoundPay">{{
              $t("servicesPaymentsRefund")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeServicesReservations",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeServicesReservations"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
