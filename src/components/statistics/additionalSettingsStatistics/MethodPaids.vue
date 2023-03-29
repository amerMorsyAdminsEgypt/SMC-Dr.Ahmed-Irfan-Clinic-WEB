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
  name: "MethodPaids",
  props: ["methodPaids"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("methodPaids"),
      totalNumber: 0,
      icon: "method-paids.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.methodPaids.totalCountMethodPaids;
      this.data[0].value = this.methodPaids.totalCountMethodPaidsNotActive;
      this.data[1].value = this.methodPaids.totalCountMethodPaidsArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
