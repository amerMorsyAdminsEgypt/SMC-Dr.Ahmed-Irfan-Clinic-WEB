<template>
  <div class="chartjs">
    <ChartPie
      :label="theLabel"
      :labels="labels"
      :data="data"
      :colors="colors"
    />
    <h3 class="chartjs__title">{{ theLabel }}</h3>
  </div>
</template>

<script>
import ChartPie from "@/components/general/ChartPie.vue";

export default {
  name: "OffersStatistics",
  props: ["offersStatistics"],
  components: {
    ChartPie,
  },
  data() {
    return {
      theLabel: "",
      labels: [
        this.$t("statistics.active"),
        this.$t("statistics.notArchived"),
        this.$t("statistics.archived"),
      ],
      colors: ["#48cae4", "#93ff54", "#e3170a"],
      data: [],
    };
  },
  methods: {
    fillData() {
      this.theLabel = `${this.$t("statistics.offers")}: ${
        this.offersStatistics.totalCountOffers
      }`;
      this.data = [
        this.offersStatistics.totalCountOffersActive,
        this.offersStatistics.totalCountOffersNotArchived,
        this.offersStatistics.totalCountOffersArchived,
      ];
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
