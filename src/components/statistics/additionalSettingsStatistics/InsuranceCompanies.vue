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
  name: "InsuranceCompanies",
  props: ["insuranceCompanies"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("setting.others.insuranceCompanies"),
      totalNumber: 0,
      icon: "insurance-companies.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.insuranceCompanies.totalCountInsuranceCompanies;
      this.data[0].value =
        this.insuranceCompanies.totalCountInsuranceCompaniesNotActive;
      this.data[1].value =
        this.insuranceCompanies.totalCountInsuranceCompaniesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
