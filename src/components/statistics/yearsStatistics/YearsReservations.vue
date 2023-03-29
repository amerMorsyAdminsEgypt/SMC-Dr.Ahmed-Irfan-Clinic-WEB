<template>
  <div class="chartjs">
    <ChartLine
      :label="theLabel"
      :labels="labels"
      :data="data"
      :colors="colors"
    />
    <h3 class="chartjs__title">{{ theLabel }}</h3>
  </div>
</template>

<script>
import ChartLine from "@/components/general/ChartLine.vue";

export default {
  name: "YearsReservations",
  props: ["yearsData"],
  components: {
    ChartLine,
  },
  data() {
    return {
      theLabel: this.$t("statistics.reservations"),
      labels: [],
      colors: ["#38b000"],
      data: [],
    };
  },
  methods: {
    fillData() {
      if (this.yearsData) {
        for (const item in this.yearsData) {
          this.labels.push(this.yearsData[item].year);

          this.data.push(this.yearsData[item].sumCountReservations);
        }
      }
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
