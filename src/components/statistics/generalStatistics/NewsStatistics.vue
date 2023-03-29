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
  name: "NewsStatistics",
  props: ["newsStatistics"],
  components: {
    ChartPie,
  },
  data() {
    return {
      theLabel: "",
      labels: [
        this.$t("statistics.notArchived"),
        this.$t("statistics.archived"),
      ],
      colors: ["#93ff54", "#e3170a"],
      data: [],
    };
  },
  methods: {
    fillData() {
      this.theLabel = `${this.$t("statistics.news")}: ${
        this.newsStatistics.totalCountNews
      }`;
      this.data = [
        this.newsStatistics.totalCountNewsNotArchived,
        this.newsStatistics.totalCountNewsArchived,
      ];
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
