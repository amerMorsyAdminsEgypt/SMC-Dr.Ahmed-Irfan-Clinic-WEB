<script>
import { CHARTJS } from "@/utils/constantLists";
import { Line } from "vue-chartjs";

export default {
  name: "ChartLine",
  extends: Line,
  data() {
    return {
      defaultColors: CHARTJS.colors,
      options: CHARTJS.options,
      chartData: CHARTJS.chartData,
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    labels: {
      type: Array,
      default: null,
    },
    data: {
      type: Array,
      default: null,
    },
    colors: {
      type: Array,
      default: null,
    },
    // chartData: {
    //   type: Object,
    //   default: null,
    // },
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            backgroundColor: this.colors || this.defaultColors,
            data: this.data,
            tension: 0.1,
          },
        ],
      };
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  async created() {
    this.fillData();
  },
};
</script>
