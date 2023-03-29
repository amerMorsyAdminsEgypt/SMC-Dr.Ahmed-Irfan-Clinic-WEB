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
  name: "Districts",
  props: ["districts"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("setting.others.districts"),
      totalNumber: 0,
      icon: "district.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.districts.totalCountDistricts;
      this.data[0].value = this.districts.totalCountDistrictsNotActive;
      this.data[1].value = this.districts.totalCountDistrictsArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
