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
  name: "BodyAnatomy",
  props: ["bodyAnatomy"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("bodyAnatomies.modelName"),
      totalNumber: 0,
      icon: "anatomy.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.bodyAnatomy.totalCountBodyAnatomy;
      this.data[0].value = this.bodyAnatomy.totalCountBodyAnatomyNotActive;
      this.data[1].value = this.bodyAnatomy.totalCountBodyAnatomyArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
