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
  name: "Cities",
  props: ["cities"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("setting.others.cities"),
      totalNumber: 0,
      icon: "city.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.cities.totalCountCities;
      this.data[0].value = this.cities.totalCountCitiesNotActive;
      this.data[1].value = this.cities.totalCountCitiesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
