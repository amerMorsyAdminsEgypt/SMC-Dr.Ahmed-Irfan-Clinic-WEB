export default class Chambers {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountChambers = 0;
    this.totalCountChambersNotActive = 0;
    this.totalCountChambersArchived = 0;
  }
  fillData(data) {
    this.totalCountChambers = data.totalCountChambers;
    this.totalCountChambersNotActive = data.totalCountChambersNotActive;
    this.totalCountChambersArchived = data.totalCountChambersArchived;
  }
}
