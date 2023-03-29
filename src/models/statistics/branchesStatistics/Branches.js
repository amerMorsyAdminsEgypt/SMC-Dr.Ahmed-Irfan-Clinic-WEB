export default class Branches {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountBranches = 0;
    this.totalCountBranchesNotActive = 0;
    this.totalCountBranchesArchived = 0;
  }
  fillData(data) {
    this.totalCountBranches = data.totalCountBranches;
    this.totalCountBranchesNotActive = data.totalCountBranchesNotActive;
    this.totalCountBranchesArchived = data.totalCountBranchesArchived;
  }
}
