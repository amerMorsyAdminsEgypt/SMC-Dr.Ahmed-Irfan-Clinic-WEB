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
  name: "Governates",
  props: ["governates"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("setting.others.governates"),
      totalNumber: 0,
      icon: "governate.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.governates.totalCountGovernates;
      this.data[0].value = this.governates.totalCountGovernatesNotActive;
      this.data[1].value = this.governates.totalCountGovernatesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
