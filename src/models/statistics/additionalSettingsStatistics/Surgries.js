export default class Surgries {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountSurgries = 0;
    this.totalCountSurgriesNotActive = 0;
    this.totalCountSurgriesArchived = 0;
  }
  fillData(data) {
    this.totalCountSurgries = data.totalCountSurgries;
    this.totalCountSurgriesNotActive = data.totalCountSurgriesNotActive;
    this.totalCountSurgriesArchived = data.totalCountSurgriesArchived;
  }
}
