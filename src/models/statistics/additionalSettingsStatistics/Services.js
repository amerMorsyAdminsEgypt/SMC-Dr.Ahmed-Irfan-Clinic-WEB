export default class Services {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountServices = 0;
    this.totalCountServicesNotActive = 0;
    this.totalCountServicesArchived = 0;
  }
  fillData(data) {
    this.totalCountServices = data.totalCountServices;
    this.totalCountServicesNotActive = data.totalCountServicesNotActive;
    this.totalCountServicesArchived = data.totalCountServicesArchived;
  }
}
