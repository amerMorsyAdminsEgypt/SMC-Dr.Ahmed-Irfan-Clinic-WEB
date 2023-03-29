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
  name: "ActiveSubstances",
  props: ["activeSubstances"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("activeSubstances.modelName"),
      totalNumber: 0,
      icon: "active-substance.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.activeSubstances.totalCountActiveSubstances;
      this.data[0].value =
        this.activeSubstances.totalCountActiveSubstancesNotActive;
      this.data[1].value =
        this.activeSubstances.totalCountActiveSubstancesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
