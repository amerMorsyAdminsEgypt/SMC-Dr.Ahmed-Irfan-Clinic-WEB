export default class TreasuriesStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountTreasuries = 0;
    this.totalCountTreasuriesNotArchived = 0;
    this.totalCountTreasuriesArchived = 0;
  }
  fillData(data) {
    this.totalCountTreasuries = data.totalCountTreasuries;
    this.totalCountTreasuriesNotArchived = data.totalCountTreasuriesNotArchived;
    this.totalCountTreasuriesArchived = data.totalCountTreasuriesArchived;
  }
}
