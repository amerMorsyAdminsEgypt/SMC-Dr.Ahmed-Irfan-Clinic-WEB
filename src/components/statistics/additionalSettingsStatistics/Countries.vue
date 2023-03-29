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
  name: "Countries",
  props: ["countries"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("setting.others.countries"),
      totalNumber: 0,
      icon: "country.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.countries.totalCountCountries;
      this.data[0].value = this.countries.totalCountCountriesNotActive;
      this.data[1].value = this.countries.totalCountCountriesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
