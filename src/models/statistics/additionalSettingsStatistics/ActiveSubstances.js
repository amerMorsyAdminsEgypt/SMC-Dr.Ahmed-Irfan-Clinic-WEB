export default class ActiveSubstances {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountActiveSubstances = 0;
    this.totalCountActiveSubstancesNotActive = 0;
    this.totalCountActiveSubstancesArchived = 0;
  }
  fillData(data) {
    this.totalCountActiveSubstances = data.totalCountActiveSubstances;
    this.totalCountActiveSubstancesNotActive =
      data.totalCountActiveSubstancesNotActive;
    this.totalCountActiveSubstancesArchived =
      data.totalCountActiveSubstancesArchived;
  }
}
