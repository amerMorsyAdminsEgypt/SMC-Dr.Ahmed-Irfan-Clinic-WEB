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
  name: "EmployeesStatistics",
  props: ["employeesStatistics"],
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
      colors: ["#4cc9f0", "#ff002b", "#001514"],
      data: [],
    };
  },
  methods: {
    fillData() {
      this.theLabel = `${this.$t("statistics.employees")}: ${
        this.employeesStatistics.totalCountEmployees
      }`;
      this.data = [
        this.employeesStatistics.totalCountEmployeesActive,
        this.employeesStatistics.totalCountEmployeesNotActive,
        this.employeesStatistics.totalCountEmployeesArchived,
      ];
    },
  },
  watch: {
    employeesStatistics: function () {
      this.fillData();
    },
  },
  async created() {
    this.fillData();
  },
};
</script>

<style lang="scss"></style>
