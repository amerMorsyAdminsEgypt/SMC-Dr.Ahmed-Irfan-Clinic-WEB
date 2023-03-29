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
  name: "Sectors",
  props: ["sectors"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("sectors"),
      totalNumber: 0,
      icon: "sectors.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.sectors.totalCountSectors;
      this.data[0].value = this.sectors.totalCountSectorsNotActive;
      this.data[1].value = this.sectors.totalCountSectorsArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
