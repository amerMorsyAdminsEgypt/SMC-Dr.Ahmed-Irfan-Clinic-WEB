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
  name: "ReveneusTypes",
  props: ["reveneusTypes"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("revenuesTypes"),
      totalNumber: 0,
      icon: "revenues-types.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.reveneusTypes.totalCountReveneusTypes;
      this.data[0].value = this.reveneusTypes.totalCountReveneusTypesNotActive;
      this.data[1].value = this.reveneusTypes.totalCountReveneusTypesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
