<template>
  <div class="chartjs">
    <ChartBar :labels="labels" :datasets="datasets" />
    <h3 class="chartjs__title">{{ theLabel }}</h3>
  </div>
</template>

<script>
import ChartBar from "@/components/general/ChartBar.vue";

export default {
  name: "YearsClientsAndReservations",
  props: ["yearsData"],
  components: {
    ChartBar,
  },
  data() {
    return {
      theLabel: this.$t("statistics.clientsAndReservations"),
      labels: [],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [],
        },
      ],
    };
  },
  methods: {
    fillData() {
      if (this.yearsData) {
        let dataOfClients = [];
        let dataOfReservations = [];

        for (const item in this.yearsData) {
          this.labels.push(this.yearsData[item].year);

          dataOfClients.push(this.yearsData[item].sumClients);
          dataOfReservations.push(this.yearsData[item].sumCountReservations);
        }

        this.datasets = [
          {
            label: this.$t("clients"),
            backgroundColor: "#219ebc",
            data: dataOfClients,
          },
          {
            label: this.$t("servicesReservations"),
            backgroundColor: "#f87979",
            data: dataOfReservations,
          },
        ];
      }
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
