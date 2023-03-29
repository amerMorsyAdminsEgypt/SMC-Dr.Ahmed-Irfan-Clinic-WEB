import AdditionalSettingsStatistic from "./AdditionalSettingsStatistic";

export default class AdditionalSettingsStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.additionalSettingsStatisticsData = new AdditionalSettingsStatistic();
  }
  fillData(data) {
    this.status = data.status;
    this.msg = data.msg;
    this.additionalSettingsStatisticsData.fillData(
      data.additionalSettingsStatisticsData
    );
  }
}
