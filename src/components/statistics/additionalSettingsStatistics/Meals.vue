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
  name: "Meals",
  props: ["meals"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("meals.modelName"),
      totalNumber: 0,
      icon: "meal.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.meals.totalCountMeals;
      this.data[0].value = this.meals.totalCountMealsNotActive;
      this.data[1].value = this.meals.totalCountMealsArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
