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
  name: "Surgries",
  props: ["surgries"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("surgeries.modelName"),
      totalNumber: 0,
      icon: "medical-operations.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.surgries.totalCountSurgries;
      this.data[0].value = this.surgries.totalCountSurgriesNotActive;
      this.data[1].value = this.surgries.totalCountSurgriesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
