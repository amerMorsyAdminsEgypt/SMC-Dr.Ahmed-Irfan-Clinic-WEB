export default class BodyAnatomyTypes {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountBodyAnatomyTypes = 0;
    this.totalCountBodyAnatomyTypesNotActive = 0;
    this.totalCountBodyAnatomyTypesArchived = 0;
  }
  fillData(data) {
    this.totalCountBodyAnatomyTypes = data.totalCountBodyAnatomyTypes;
    this.totalCountBodyAnatomyTypesNotActive =
      data.totalCountBodyAnatomyTypesNotActive;
    this.totalCountBodyAnatomyTypesArchived =
      data.totalCountBodyAnatomyTypesArchived;
  }
}
