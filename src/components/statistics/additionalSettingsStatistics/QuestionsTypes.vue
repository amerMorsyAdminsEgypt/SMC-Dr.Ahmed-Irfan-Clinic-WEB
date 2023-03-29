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
  name: "QuestionsTypes",
  props: ["questionsTypes"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("questionsTypes.modelName"),
      totalNumber: 0,
      icon: "questions.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.questionsTypes.totalCountQuestionsTypes;
      this.data[0].value =
        this.questionsTypes.totalCountQuestionsTypesNotActive;
      this.data[1].value = this.questionsTypes.totalCountQuestionsTypesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
