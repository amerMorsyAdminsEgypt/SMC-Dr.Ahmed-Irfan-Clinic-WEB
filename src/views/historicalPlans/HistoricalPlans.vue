<template>
  <div class="">
    <HistoricalPlansTabs />

    <router-view></router-view>
  </div>
</template>

<script>
import HistoricalPlansTabs from "@/components/historicalPlans/HistoricalPlansTabs.vue";

export default {
  name: "HistoricalPlans",
  components: {
    HistoricalPlansTabs,
  },
  props: [],
  data() {
    return {};
  },
  methods: {},
  computed: {},
  async created() {},
};
</script>
