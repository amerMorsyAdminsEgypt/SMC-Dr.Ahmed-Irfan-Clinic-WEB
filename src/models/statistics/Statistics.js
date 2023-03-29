import Statistic from "./Statistic";
import YearsStatisticsFilter from "./yearsStatistics/YearsStatisticsFilter";

export default class Statistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.allStatisticsData = new Statistic();
    this.filterData = new YearsStatisticsFilter();
  }
  fillData(data) {
    this.status = data.status;
    this.msg = data.msg;
    this.allStatisticsData.fillData(data.allStatisticsData);
  }
}
