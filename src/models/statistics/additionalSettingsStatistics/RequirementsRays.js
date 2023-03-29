export default class RequirementsRays {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountRequirementsRays = 0;
    this.totalCountRequirementsRaysNotActive = 0;
    this.totalCountRequirementsRaysArchived = 0;
  }
  fillData(data) {
    this.totalCountRequirementsRays = data.totalCountRequirementsRays;
    this.totalCountRequirementsRaysNotActive =
      data.totalCountRequirementsRaysNotActive;
    this.totalCountRequirementsRaysArchived =
      data.totalCountRequirementsRaysArchived;
  }
}
