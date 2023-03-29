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
  name: "Medicines",
  props: ["medicines"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("medicines"),
      totalNumber: 0,
      icon: "medicines.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.medicines.totalCountMedicines;
      this.data[0].value = this.medicines.totalCountMedicinesNotActive;
      this.data[1].value = this.medicines.totalCountMedicinesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
