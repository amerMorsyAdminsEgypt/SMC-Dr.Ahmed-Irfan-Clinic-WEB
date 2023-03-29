<template>
  <div class="chartjs">
    <ChartLine
      :label="theLabel"
      :labels="labels"
      :data="data"
      :colors="colors"
    />
    <h3 class="chartjs__title">{{ theLabel }}</h3>
  </div>
</template>

<script>
import ChartLine from "@/components/general/ChartLine.vue";

export default {
  name: "YearsClients",
  props: ["yearsData"],
  components: {
    ChartLine,
  },
  data() {
    return {
      theLabel: this.$t("statistics.clients"),
      labels: [],
      colors: ["#4bc0c0"],
      data: [],
    };
  },
  methods: {
    fillData() {
      if (this.yearsData) {
        for (const item in this.yearsData) {
          this.labels.push(this.yearsData[item].year);

          this.data.push(this.yearsData[item].sumClients);
        }
      }
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
