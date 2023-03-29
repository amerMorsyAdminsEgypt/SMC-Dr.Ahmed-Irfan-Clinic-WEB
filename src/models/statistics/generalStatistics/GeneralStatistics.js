import GeneralStatistic from "./GeneralStatistic";

export default class GeneralStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.generalStatisticsData = new GeneralStatistic();
    // this.generalStatistic = new GeneralStatistic();
  }
  fillData(data) {
    this.status = data.status;
    this.msg = data.msg;
    this.generalStatisticsData.fillData(data.generalStatisticsData);
  }
}
