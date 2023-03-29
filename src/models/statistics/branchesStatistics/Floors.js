export default class Floors {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountFloors = 0;
    this.totalCountFloorsNotActive = 0;
    this.totalCountFloorsArchived = 0;
  }
  fillData(data) {
    this.totalCountFloors = data.totalCountFloors;
    this.totalCountFloorsNotActive = data.totalCountFloorsNotActive;
    this.totalCountFloorsArchived = data.totalCountFloorsArchived;
  }
}
