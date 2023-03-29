export default class Governates {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountGovernates = 0;
    this.totalCountGovernatesNotActive = 0;
    this.totalCountGovernatesArchived = 0;
  }
  fillData(data) {
    this.totalCountGovernates = data.totalCountGovernates;
    this.totalCountGovernatesNotActive = data.totalCountGovernatesNotActive;
    this.totalCountGovernatesArchived = data.totalCountGovernatesArchived;
  }
}
