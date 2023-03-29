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
  name: "Branches",
  props: ["branches"],
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
      this.theLabel = `${this.$t("statistics.branches")}: ${
        this.branches.totalCountBranches
      }`;
      this.data = [
        this.branches.totalCountBranchesNotActive,
        this.branches.totalCountBranchesArchived,
      ];
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
