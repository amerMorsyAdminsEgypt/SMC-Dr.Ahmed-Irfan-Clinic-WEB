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
  name: "Jobs",
  props: ["jobs"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("jobs"),
      totalNumber: 0,
      icon: "jobs.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.jobs.totalCountJobs;
      this.data[0].value = this.jobs.totalCountJobsNotActive;
      this.data[1].value = this.jobs.totalCountJobsArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
