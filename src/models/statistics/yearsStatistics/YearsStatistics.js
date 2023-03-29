import YearsStatistic from "./YearsStatistic";
import YearsStatisticsFilter from "./YearsStatisticsFilter";

export default class YearsStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.yearsData = [];
    this.yearsStatistic = new YearsStatistic();
    this.filterData = new YearsStatisticsFilter();
  }
  fillData(data) {
    this.status = data.status;
    this.msg = data.msg;
    this.yearsData = data.yearsData;
  }
}
