<template>
  <div class="chartjs">
    <ChartBar :chartData="chartData" />
    <h3 class="chartjs__title">{{ theLabel }}</h3>
  </div>
</template>

<script>
import { CHARTJS } from "@/utils/constantLists";
import ChartBar from "@/components/general/ChartBar.vue";

export default {
  name: "YearsClientsAndReservations",
  props: ["yearsData"],
  components: {
    ChartBar,
  },
  data() {
    return {
      theLabel: this.$t("statistics.money"),
      labels: [],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [],
        },
      ],
      chartData: CHARTJS.chartData,
    };
  },
  methods: {
    fillData() {
      if (this.yearsData) {
        let dataOfPaid = [];
        let dataOfRemaining = [];
        let dataOfRefound = [];

        for (const item in this.yearsData) {
          this.labels.push(this.yearsData[item].year);

          dataOfPaid.push(this.yearsData[item].sumPaid);
          dataOfRemaining.push(this.yearsData[item].sumRemainingAmount);
          dataOfRefound.push(this.yearsData[item].sumRefoundValue);
        }

        this.datasets = [
          {
            label: this.$t("statistics.Paid"),
            backgroundColor: "#70e000",
            data: dataOfPaid,
          },
          {
            label: this.$t("statistics.Remaining"),
            backgroundColor: "#393d3f",
            data: dataOfRemaining,
          },
          {
            label: this.$t("statistics.Refound"),
            backgroundColor: "#ef233c",
            data: dataOfRefound,
          },
        ];

        this.chartData.labels = this.labels;
        this.chartData.datasets = this.datasets;
      }
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
