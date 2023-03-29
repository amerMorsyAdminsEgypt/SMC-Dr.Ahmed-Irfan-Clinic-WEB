<template>
  <div class="">
    <StatisticsCard
      :title="title"
      :totalNumber="totalNumber"
      :icon="icon"
      :data="data"
    />
  </div>
</template>

<script>
import StatisticsCard from "@/components/general/StatisticsCard.vue";

export default {
  name: "RequirementsAnalysis",
  props: ["requirementsAnalysis"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("medicalRequirements.medicalTests.modelName"),
      totalNumber: 0,
      icon: "requirements.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber =
        this.requirementsAnalysis.totalCountRequirementsAnalysis;
      this.data[0].value =
        this.requirementsAnalysis.totalCountRequirementsAnalysisNotActive;
      this.data[1].value =
        this.requirementsAnalysis.totalCountRequirementsAnalysisArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
