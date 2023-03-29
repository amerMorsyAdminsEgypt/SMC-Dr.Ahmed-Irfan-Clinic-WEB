export default class UsersPrivilegeClients {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.clientsView = false;
    this.clientsAdd = false;
    this.clientsUpdate = false;
    this.clientsArchive = false;
    this.clientsRestore = false;
    this.clientsDelete = false;
  }
  fillData(data) {
    if (data) {
      this.clientsView = data.clientsView;
      this.clientsAdd = data.clientsAdd;
      this.clientsUpdate = data.clientsUpdate;
      this.clientsArchive = data.clientsArchive;
      this.clientsRestore = data.clientsRestore;
      this.clientsDelete = data.clientsDelete;
    } else {
      this.setInitialValue();
    }
  }
}
