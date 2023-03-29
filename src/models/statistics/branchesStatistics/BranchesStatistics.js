import BranchesStatistic from "./BranchesStatistic";

export default class BranchesStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.branchesInformationStatisticsData = new BranchesStatistic();
  }
  fillData(data) {
    this.status = data.status;
    this.msg = data.msg;
    this.branchesInformationStatisticsData.fillData(
      data.branchesInformationStatisticsData
    );
  }
}
