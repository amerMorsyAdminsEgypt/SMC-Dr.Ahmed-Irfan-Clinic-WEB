export default class ServicesTypes {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountServicesTypes = 0;
    this.totalCountServicesTypesNotActive = 0;
    this.totalCountServicesTypesArchived = 0;
  }
  fillData(data) {
    this.totalCountServicesTypes = data.totalCountServicesTypes;
    this.totalCountServicesTypesNotActive =
      data.totalCountServicesTypesNotActive;
    this.totalCountServicesTypesArchived = data.totalCountServicesTypesArchived;
  }
}
