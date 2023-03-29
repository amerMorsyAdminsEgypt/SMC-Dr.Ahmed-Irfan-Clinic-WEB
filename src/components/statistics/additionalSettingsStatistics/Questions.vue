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
  name: "Questions",
  props: ["questions"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("questions.modelName"),
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
      this.totalNumber = this.questions.totalCountQuestions;
      this.data[0].value = this.questions.totalCountQuestionsNotActive;
      this.data[1].value = this.questions.totalCountQuestionsArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
