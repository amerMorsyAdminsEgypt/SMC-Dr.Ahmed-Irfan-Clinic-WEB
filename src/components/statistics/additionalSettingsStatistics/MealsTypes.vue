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
  name: "MealsTypes",
  props: ["mealsTypes"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("mealsTypes.modelName"),
      totalNumber: 0,
      icon: "meals-types.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.mealsTypes.totalCountMealsTypes;
      this.data[0].value = this.mealsTypes.totalCountMealsTypesNotActive;
      this.data[1].value = this.mealsTypes.totalCountMealsTypesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
