export default class Districts {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountDistricts = 0;
    this.totalCountDistrictsNotActive = 0;
    this.totalCountDistrictsArchived = 0;
  }
  fillData(data) {
    this.totalCountDistricts = data.totalCountDistricts;
    this.totalCountDistrictsNotActive = data.totalCountDistrictsNotActive;
    this.totalCountDistrictsArchived = data.totalCountDistrictsArchived;
  }
}
