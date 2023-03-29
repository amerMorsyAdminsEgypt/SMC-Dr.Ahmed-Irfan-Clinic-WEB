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
  name: "MedicinesTypes",
  props: ["medicinesTypes"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("medicinesTyps"),
      totalNumber: 0,
      icon: "medicines-types.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.medicinesTypes.totalCountMedicinesTypes;
      this.data[0].value =
        this.medicinesTypes.totalCountMedicinesTypesNotActive;
      this.data[1].value = this.medicinesTypes.totalCountMedicinesTypesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
