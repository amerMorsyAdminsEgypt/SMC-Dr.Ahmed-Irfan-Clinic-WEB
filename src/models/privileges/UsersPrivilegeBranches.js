export default class UsersPrivilegeBranches {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.branchesView = false;
    this.branchesAdd = false;
    this.branchesUpdate = false;
    this.branchesArchive = false;
    this.branchesRestore = false;
    this.branchesDelete = false;
  }
  fillData(data) {
    if (data) {
      this.branchesView = data.branchesView;
      this.branchesAdd = data.branchesAdd;
      this.branchesUpdate = data.branchesUpdate;
      this.branchesArchive = data.branchesArchive;
      this.branchesRestore = data.branchesRestore;
      this.branchesDelete = data.branchesDelete;
    } else {
      this.setInitialValue();
    }
  }
}
