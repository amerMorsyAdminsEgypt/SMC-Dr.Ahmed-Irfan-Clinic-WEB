<template>
  <div class="">
    <b-button v-b-toggle.statistics class="btn btn-lg btn-collapse">
      {{ $t("reportsAndStatistics.statistics") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="statistics">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="servicesReservationStatisticsView"
              v-model="
                usersPrivilegeStatistics.servicesReservationStatisticsView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="servicesReservationStatisticsView">{{
              $t("reportsAndStatistics.reservationsStatisticsView")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="generalStatisticsView"
              v-model="usersPrivilegeStatistics.generalStatisticsView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="generalStatisticsView">{{
              $t("reportsAndStatistics.generalStatisticsView")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="branchesInformationStatisticsView"
              v-model="
                usersPrivilegeStatistics.branchesInformationStatisticsView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="branchesInformationStatisticsView">{{
              $t("reportsAndStatistics.branchesInformationView")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="additionalSettingsStatisticsView"
              v-model="
                usersPrivilegeStatistics.additionalSettingsStatisticsView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="additionalSettingsStatisticsView">{{
              $t("reportsAndStatistics.additionalSettingsView")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeStatistics",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeStatistics"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
