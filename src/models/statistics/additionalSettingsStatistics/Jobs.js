export default class Jobs {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountJobs = 0;
    this.totalCountJobsNotActive = 0;
    this.totalCountJobsArchived = 0;
  }
  fillData(data) {
    this.totalCountJobs = data.totalCountJobs;
    this.totalCountJobsNotActive = data.totalCountJobsNotActive;
    this.totalCountJobsArchived = data.totalCountJobsArchived;
  }
}
