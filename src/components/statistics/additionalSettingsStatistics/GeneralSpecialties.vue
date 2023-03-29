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
  name: "GeneralSpecialties",
  props: ["generalSpecialties"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("generalSpecialties"),
      totalNumber: 0,
      icon: "general-specialities.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.generalSpecialties.totalCountGeneralSpecialties;
      this.data[0].value =
        this.generalSpecialties.totalCountGeneralSpecialtiesNotActive;
      this.data[1].value =
        this.generalSpecialties.totalCountGeneralSpecialtiesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
