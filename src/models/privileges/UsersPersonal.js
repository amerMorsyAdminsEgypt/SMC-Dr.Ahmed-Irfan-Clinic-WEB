export default class UsersPersonal {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.language = "";
    this.userAuthorizeToken = "";
    this.userToken = "";
    this.employeeToken = "";
    this.employeeTypeToken = "";
    this.clientToken = "";
    this.userPrivilegeToken = "";
  }
  fillData(data) {
    if (data) {
      this.language = data.language;
      this.userAuthorizeToken = data.userAuthorizeToken;
      this.userToken = data.userToken;
      this.employeeToken = data.employeeToken;
      this.employeeTypeToken = data.employeeTypeToken;
      this.clientToken = data.clientToken;
      this.userPrivilegeToken = data.userPrivilegeToken;
    } else {
      this.setInitialValue();
    }
  }
}
