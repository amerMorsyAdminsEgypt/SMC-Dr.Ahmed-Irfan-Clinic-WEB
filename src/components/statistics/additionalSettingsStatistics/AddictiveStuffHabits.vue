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
  name: "AddictiveStuffHabits",
  props: ["addictiveStuffHabits"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("addictiveStuffs.habits.modelName"),
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
        this.addictiveStuffHabits.totalCountAddictiveStuffHabits;
      this.data[0].value =
        this.addictiveStuffHabits.totalCountAddictiveStuffHabitsNotActive;
      this.data[1].value =
        this.addictiveStuffHabits.totalCountAddictiveStuffHabitsArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
