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
  name: "ExpensesTypes",
  props: ["expensesTypes"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("expensesTypes"),
      totalNumber: 0,
      icon: "expenses-types.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.expensesTypes.totalCountExpensesTypes;
      this.data[0].value = this.expensesTypes.totalCountExpensesTypesNotActive;
      this.data[1].value = this.expensesTypes.totalCountExpensesTypesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
