<template>
  <div class="">
    <b-button v-b-toggle.report class="btn btn-lg btn-collapse">
      {{ $t("reportsAndStatistics.reports") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="report">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="treasuriesTransactionsReportView"
              v-model="usersPrivilegeReports.treasuriesTransactionsReportView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="treasuriesTransactionsReportView">{{
              $t("reportsAndStatistics.treasuriesView")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="paymentReportView"
              v-model="usersPrivilegeReports.paymentReportView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="paymentReportView">{{
              $t("reportsAndStatistics.paymentView")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationsReportView"
              v-model="usersPrivilegeReports.servicesReservationsReportView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="servicesReservationsReportView">{{
              $t("reportsAndStatistics.reservationsView")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeReport",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeReports"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
