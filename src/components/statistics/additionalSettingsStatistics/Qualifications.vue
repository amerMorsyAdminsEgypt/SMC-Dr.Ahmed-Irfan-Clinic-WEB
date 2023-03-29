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
  name: "Qualifications",
  props: ["qualifications"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("qualifications"),
      totalNumber: 0,
      icon: "qualifications.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.qualifications.totalCountQualifications;
      this.data[0].value =
        this.qualifications.totalCountQualificationsNotActive;
      this.data[1].value = this.qualifications.totalCountQualificationsArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
