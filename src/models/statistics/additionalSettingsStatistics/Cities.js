export default class Cities {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountCities = 0;
    this.totalCountCitiesNotActive = 0;
    this.totalCountCitiesArchived = 0;
  }
  fillData(data) {
    this.totalCountCities = data.totalCountCities;
    this.totalCountCitiesNotActive = data.totalCountCitiesNotActive;
    this.totalCountCitiesArchived = data.totalCountCitiesArchived;
  }
}
