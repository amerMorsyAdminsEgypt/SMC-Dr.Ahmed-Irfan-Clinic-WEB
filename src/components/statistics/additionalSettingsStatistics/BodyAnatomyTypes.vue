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
  name: "BodyAnatomyTypes",
  props: ["bodyAnatomyTypes"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("bodyAnatomyTypes.modelName"),
      totalNumber: 0,
      icon: "anatomy-types.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.bodyAnatomyTypes.totalCountBodyAnatomyTypes;
      this.data[0].value =
        this.bodyAnatomyTypes.totalCountBodyAnatomyTypesNotActive;
      this.data[1].value =
        this.bodyAnatomyTypes.totalCountBodyAnatomyTypesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
