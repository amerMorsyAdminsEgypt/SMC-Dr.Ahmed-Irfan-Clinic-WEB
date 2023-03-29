<template>
  <div>
    <div class="row">
      <!-- <div class="col-lg-12">
        <ChartBar :chartData="chartData" />
      </div> -->

      <div class="col-lg-6">
        <YearsClients :yearsData="yearsData" />
      </div>
      <div class="col-lg-6">
        <YearsReservations :yearsData="yearsData" />
      </div>
      <!-- <div class="col-lg-6">
        <YearsClientsAndReservations :yearsData="yearsData" />
      </div> -->

      <div class="col-lg-12">
        <YearsMoney :yearsData="yearsData" />
      </div>
    </div>
  </div>
</template>

<script>
// import { CHARTJS } from "@/utils/constantLists";
// import ChartBar from "@/components/general/ChartBar.vue";
import YearsClients from "@/components/statistics/yearsStatistics/YearsClients.vue";
import YearsReservations from "@/components/statistics/yearsStatistics/YearsReservations.vue";
// import YearsClientsAndReservations from "@/components/statistics/yearsStatistics/YearsClientsAndReservations.vue";
import YearsMoney from "@/components/statistics/yearsStatistics/YearsMoney.vue";

export default {
  name: "YearsStatistics",
  props: ["yearsData"],
  components: {
    // ChartBar,
    YearsClients,
    YearsReservations,
    // YearsClientsAndReservations,
    YearsMoney,
  },
  // data() {
  //   return {
  //     theLabel: this.$t("statistics.years"),
  //     labels: [],
  //     datasets: [
  //       {
  //         label: "Data One",
  //         backgroundColor: "#f87979",
  //         data: [],
  //       },
  //     ],
  //     chartData: CHARTJS.chartData,
  //   };
  // },
  methods: {
    // fillData() {
    //   if (this.yearsData) {
    //     let dataOfClients = [];
    //     let dataOfReservations = [];
    //     let dataOfPaid = [];
    //     let dataOfRemaining = [];
    //     let dataOfRefound = [];
    //     for (const item in this.yearsData) {
    //       this.labels.push(this.yearsData[item].year);
    //       dataOfClients.push(this.yearsData[item].sumClients);
    //       dataOfReservations.push(this.yearsData[item].sumCountReservations);
    //       dataOfPaid.push(this.yearsData[item].sumPaid);
    //       dataOfRemaining.push(this.yearsData[item].sumRemainingAmount);
    //       dataOfRefound.push(this.yearsData[item].sumRefoundValue);
    //     }
    //     this.datasets = [
    //       {
    //         label: this.$t("clients"),
    //         backgroundColor: "#219ebc",
    //         data: dataOfClients,
    //       },
    //       {
    //         label: this.$t("servicesReservations"),
    //         backgroundColor: "#f87979",
    //         data: dataOfReservations,
    //       },
    //       {
    //         label: this.$t("statistics.Paid"),
    //         backgroundColor: "#70e000",
    //         data: dataOfPaid,
    //       },
    //       {
    //         label: this.$t("statistics.Remaining"),
    //         backgroundColor: "#393d3f",
    //         data: dataOfRemaining,
    //       },
    //       {
    //         label: this.$t("statistics.Refound"),
    //         backgroundColor: "#ef233c",
    //         data: dataOfRefound,
    //       },
    //     ];
    //     this.chartData.labels = this.labels;
    //     this.chartData.datasets = this.datasets;
    //   }
    // },
  },
  async created() {
    // this.fillData();
  },
};
</script>
