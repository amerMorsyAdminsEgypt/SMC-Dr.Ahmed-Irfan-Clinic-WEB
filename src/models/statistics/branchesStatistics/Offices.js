export default class Offices {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountOffices = 0;
    this.totalCountOfficesNotActive = 0;
    this.totalCountOfficesArchived = 0;
  }
  fillData(data) {
    this.totalCountOffices = data.totalCountOffices;
    this.totalCountOfficesNotActive = data.totalCountOfficesNotActive;
    this.totalCountOfficesArchived = data.totalCountOfficesArchived;
  }
}
