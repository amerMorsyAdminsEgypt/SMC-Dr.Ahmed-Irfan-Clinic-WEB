export default class UsersPrivilegeDiagnosisPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.diagnosisPlanView = false;
    this.diagnosisPlanAdd = false;
    this.diagnosisPlanUpdate = false;
    this.diagnosisPlanArchive = false;
    this.diagnosisPlanRestore = false;
    this.diagnosisPlanDelete = false;
  }
  fillData(data) {
    if (data) {
      this.diagnosisPlanView = data.diagnosisPlanView;
      this.diagnosisPlanAdd = data.diagnosisPlanAdd;
      this.diagnosisPlanUpdate = data.diagnosisPlanUpdate;
      this.diagnosisPlanArchive = data.diagnosisPlanArchive;
      this.diagnosisPlanRestore = data.diagnosisPlanRestore;
      this.diagnosisPlanDelete = data.diagnosisPlanDelete;
    } else {
      this.setInitialValue();
    }
  }
}
