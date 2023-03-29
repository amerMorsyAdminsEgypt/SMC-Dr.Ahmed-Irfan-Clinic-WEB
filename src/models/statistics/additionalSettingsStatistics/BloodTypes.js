export default class BloodTypes {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountBloodTypes = 0;
    this.totalCountBloodTypesNotActive = 0;
    this.totalCountBloodTypesArchived = 0;
  }
  fillData(data) {
    this.totalCountBloodTypes = data.totalCountBloodTypes;
    this.totalCountBloodTypesNotActive = data.totalCountBloodTypesNotActive;
    this.totalCountBloodTypesArchived = data.totalCountBloodTypesArchived;
  }
}
