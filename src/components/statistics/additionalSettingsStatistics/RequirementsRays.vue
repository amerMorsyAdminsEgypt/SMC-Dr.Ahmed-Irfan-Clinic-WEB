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
  name: "RequirementsRays",
  props: ["requirementsRays"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("medicalRequirements.rays.modelName"),
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
      this.totalNumber = this.requirementsRays.totalCountRequirementsRays;
      this.data[0].value =
        this.requirementsRays.totalCountRequirementsRaysNotActive;
      this.data[1].value =
        this.requirementsRays.totalCountRequirementsRaysArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
