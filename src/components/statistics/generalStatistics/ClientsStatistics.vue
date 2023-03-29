<template>
  <div class="chartjs">
    <ChartPie
      :label="theLabel"
      :labels="labels"
      :data="data"
      :colors="colors"
    />
    <h3 class="chartjs__title">{{ theLabel }}</h3>
  </div>
</template>

<script>
import ChartPie from "@/components/general/ChartPie.vue";

export default {
  name: "ClientsStatistics",
  props: ["clientsStatistics"],
  components: {
    ChartPie,
  },
  data() {
    return {
      theLabel: "",
      labels: [
        this.$t("statistics.active"),
        this.$t("statistics.notActive"),
        this.$t("statistics.archived"),
      ],
      colors: ["#fee402", "#d20600", "#adadad"],
      data: [],
    };
  },
  methods: {
    fillData() {
      this.theLabel = `${this.$t("statistics.clients")}: ${
        this.clientsStatistics.totalCountClients
      }`;
      this.data = [
        this.clientsStatistics.totalCountClientsActive,
        this.clientsStatistics.totalCountClientsNotActive,
        this.clientsStatistics.totalCountClientsArchived,
      ];
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
