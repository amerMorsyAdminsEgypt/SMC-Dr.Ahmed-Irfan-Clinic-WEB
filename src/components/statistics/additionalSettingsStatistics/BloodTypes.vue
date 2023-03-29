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
  name: "BloodTypes",
  props: ["bloodTypes"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("bloodTypes"),
      totalNumber: 0,
      icon: "blood-types.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.bloodTypes.totalCountBloodTypes;
      this.data[0].value = this.bloodTypes.totalCountBloodTypesNotActive;
      this.data[1].value = this.bloodTypes.totalCountBloodTypesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
