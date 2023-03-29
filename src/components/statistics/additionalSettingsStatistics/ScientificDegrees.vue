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
  name: "ScientificDegrees",
  props: ["scientificDegrees"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("scientificDegrees"),
      totalNumber: 0,
      icon: "scientific-degrees.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.scientificDegrees.totalCountScientificDegrees;
      this.data[0].value =
        this.scientificDegrees.totalCountScientificDegreesNotActive;
      this.data[1].value =
        this.scientificDegrees.totalCountScientificDegreesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
