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
  name: "NewsCategories",
  props: ["newsCategories"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("newsCategories"),
      totalNumber: 0,
      icon: "category.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.newsCategories.totalCountNewsCategories;
      this.data[0].value =
        this.newsCategories.totalCountNewsCategoriesNotActive;
      this.data[1].value = this.newsCategories.totalCountNewsCategoriesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
