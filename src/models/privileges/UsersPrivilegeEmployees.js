export default class UsersPrivilegeEmployees {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.employeesView = false;
    this.employeesAdd = false;
    this.employeesUpdate = false;
    this.employeesArchive = false;
    this.employeesRestore = false;
    this.employeesDelete = false;
  }
  fillData(data) {
    if (data) {
      this.employeesView = data.employeesView;
      this.employeesAdd = data.employeesAdd;
      this.employeesUpdate = data.employeesUpdate;
      this.employeesArchive = data.employeesArchive;
      this.employeesRestore = data.employeesRestore;
      this.employeesDelete = data.employeesDelete;
    } else {
      this.setInitialValue();
    }
  }
}
