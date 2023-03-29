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
  name: "Floors",
  props: ["floors"],
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
      colors: ["#ffd100", "#333533"],
      data: [],
    };
  },
  methods: {
    fillData() {
      this.theLabel = `${this.$t("statistics.floors")}: ${
        this.floors.totalCountFloors
      }`;
      this.data = [
        this.floors.totalCountFloorsNotActive,
        this.floors.totalCountFloorsArchived,
      ];
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
