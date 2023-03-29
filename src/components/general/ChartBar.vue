<script>
import { CHARTJS } from "@/utils/constantLists";
import { Bar } from "vue-chartjs";

export default {
  name: "ChartBar",
  extends: Bar,
  data() {
    return {
      options: CHARTJS.options,
    };
  },
  props: {
    chartData: {
      type: Object,
      default: null,
    },
  },
  methods: {},
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  async created() {},
};
</script>
