export default class Buildings {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountBuildings = 0;
    this.totalCountBuildingsNotActive = 0;
    this.totalCountBuildingsArchived = 0;
  }
  fillData(data) {
    this.totalCountBuildings = data.totalCountBuildings;
    this.totalCountBuildingsNotActive = data.totalCountBuildingsNotActive;
    this.totalCountBuildingsArchived = data.totalCountBuildingsArchived;
  }
}
