export default class ReveneusTypes {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountReveneusTypes = 0;
    this.totalCountReveneusTypesNotActive = 0;
    this.totalCountReveneusTypesArchived = 0;
  }
  fillData(data) {
    this.totalCountReveneusTypes = data.totalCountReveneusTypes;
    this.totalCountReveneusTypesNotActive =
      data.totalCountReveneusTypesNotActive;
    this.totalCountReveneusTypesArchived = data.totalCountReveneusTypesArchived;
  }
}
