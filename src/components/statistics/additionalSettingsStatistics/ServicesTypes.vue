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
  name: "ServicesTypes",
  props: ["servicesTypes"],
  components: {
    StatisticsCard,
  },
  data() {
    return {
      title: this.$t("servicesTypes"),
      totalNumber: 0,
      icon: "services-types.svg",
      data: [
        { title: this.$t("statistics.notArchived"), value: 0 },
        { title: this.$t("statistics.archived"), value: 0 },
      ],
    };
  },
  methods: {
    fillData() {
      this.totalNumber = this.servicesTypes.totalCountServicesTypes;
      this.data[0].value = this.servicesTypes.totalCountServicesTypesNotActive;
      this.data[1].value = this.servicesTypes.totalCountServicesTypesArchived;
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
