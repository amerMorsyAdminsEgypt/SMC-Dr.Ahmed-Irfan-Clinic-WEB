export default class UsersPrivilegeUsers {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.usersPrivilegeView = false;
    this.usersPrivilegeUpdate = false;
    this.usersLogView = false;
  }
  fillData(data) {
    if (data) {
      this.usersPrivilegeView = data.usersPrivilegeView;
      this.usersPrivilegeUpdate = data.usersPrivilegeUpdate;
      this.usersLogView = data.usersLogView;
    } else {
      this.setInitialValue();
    }
  }
}
