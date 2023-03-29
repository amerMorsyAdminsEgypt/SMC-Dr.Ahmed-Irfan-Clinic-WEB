<template>
  <div class="chartjs">
    <ChartDoughnut
      :label="theLabel"
      :labels="labels"
      :data="data"
      :colors="colors"
    />
    <h3 class="chartjs__title">{{ theLabel }}</h3>
  </div>
</template>

<script>
import ChartDoughnut from "@/components/general/ChartDoughnut.vue";

export default {
  name: "Buildings",
  props: ["buildings"],
  components: {
    ChartDoughnut,
  },
  data() {
    return {
      theLabel: "",
      labels: [
        this.$t("statistics.notArchived"),
        this.$t("statistics.archived"),
      ],
      colors: ["#38b5fe", "#222222"],
      data: [],
    };
  },
  methods: {
    fillData() {
      this.theLabel = `${this.$t("statistics.buildings")}: ${
        this.buildings.totalCountBuildings
      }`;
      this.data = [
        this.buildings.totalCountBuildingsNotActive,
        this.buildings.totalCountBuildingsArchived,
      ];
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
