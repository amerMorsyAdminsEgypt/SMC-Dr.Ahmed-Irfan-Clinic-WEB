export default class ScientificDegrees {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountScientificDegrees = 0;
    this.totalCountScientificDegreesNotActive = 0;
    this.totalCountScientificDegreesArchived = 0;
  }
  fillData(data) {
    this.totalCountScientificDegrees = data.totalCountScientificDegrees;
    this.totalCountScientificDegreesNotActive =
      data.totalCountScientificDegreesNotActive;
    this.totalCountScientificDegreesArchived =
      data.totalCountScientificDegreesArchived;
  }
}
