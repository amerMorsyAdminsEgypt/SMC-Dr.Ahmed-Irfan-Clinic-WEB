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
  name: "AddictiveStuffChronicDiseases",
  props: ["addictiveStuffChronicDiseases"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("addictiveStuffs.chronicDiseases.modelName"),
      totalNumber: 0,
      icon: "habits.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber =
        this.addictiveStuffChronicDiseases.totalCountAddictiveStuffChronicDiseases;
      this.data[0].value =
        this.addictiveStuffChronicDiseases.totalCountAddictiveStuffChronicDiseasesNotActive;
      this.data[1].value =
        this.addictiveStuffChronicDiseases.totalCountAddictiveStuffChronicDiseasesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
