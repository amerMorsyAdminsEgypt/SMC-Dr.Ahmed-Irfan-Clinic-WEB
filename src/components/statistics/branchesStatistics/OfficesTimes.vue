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
  name: "OfficesTimes",
  props: ["officesTimes"],
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
      colors: ["#219ebc", "#ff002b"],
      data: [],
    };
  },
  methods: {
    fillData() {
      this.theLabel = `${this.$t("statistics.officesTimes")}: ${
        this.officesTimes.totalCountOfficesTimes
      }`;
      this.data = [
        this.officesTimes.totalCountOfficesTimesNotActive,
        this.officesTimes.totalCountOfficesTimesArchived,
      ];
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
