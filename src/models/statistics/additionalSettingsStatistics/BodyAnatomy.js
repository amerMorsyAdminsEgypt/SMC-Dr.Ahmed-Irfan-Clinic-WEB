export default class BodyAnatomy {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountBodyAnatomy = 0;
    this.totalCountBodyAnatomyNotActive = 0;
    this.totalCountBodyAnatomyArchived = 0;
  }
  fillData(data) {
    this.totalCountBodyAnatomy = data.totalCountBodyAnatomy;
    this.totalCountBodyAnatomyNotActive = data.totalCountBodyAnatomyNotActive;
    this.totalCountBodyAnatomyArchived = data.totalCountBodyAnatomyArchived;
  }
}
