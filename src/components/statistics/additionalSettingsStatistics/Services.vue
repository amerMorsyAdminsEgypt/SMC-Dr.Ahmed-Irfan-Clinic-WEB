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
  name: "Services",
  props: ["services"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("services"),
      totalNumber: 0,
      icon: "services.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.services.totalCountServices;
      this.data[0].value = this.services.totalCountServicesNotActive;
      this.data[1].value = this.services.totalCountServicesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
