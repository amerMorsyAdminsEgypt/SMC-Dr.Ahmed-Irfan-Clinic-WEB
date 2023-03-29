<template>
  <div class="">
    <b-button v-b-toggle.EmployeeBenefit class="btn btn-lg btn-collapse">
      {{ $t("servicesReservationEmployeeBenefits.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="EmployeeBenefit">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-12">
            <input
              type="checkbox"
              id="servicesReservationEmployeeBenefitView"
              v-model="
                usersPrivilegeServicesReservationEmployeeBenefit.servicesReservationEmployeeBenefitView
              "
              class="checkbox"
            />
            <label
              class="mt-1 ml-2"
              for="servicesReservationEmployeeBenefitView"
              >{{ $t("view") }}</label
            >
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeServicesReservationEmployeeBenefit",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeServicesReservationEmployeeBenefit"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
