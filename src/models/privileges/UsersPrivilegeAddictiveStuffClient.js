export default class UsersPrivilegeAddictiveStuffClient {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.addictiveStuffClientView = false;
    this.addictiveStuffClientAdd = false;
    this.addictiveStuffClientUpdate = false;
    this.addictiveStuffClientArchive = false;
    this.addictiveStuffClientRestore = false;
    this.addictiveStuffClientDelete = false;
  }
  fillData(data) {
    if (data) {
      this.addictiveStuffClientView = data.addictiveStuffClientView;
      this.addictiveStuffClientAdd = data.addictiveStuffClientAdd;
      this.addictiveStuffClientUpdate = data.addictiveStuffClientUpdate;
      this.addictiveStuffClientArchive = data.addictiveStuffClientArchive;
      this.addictiveStuffClientRestore = data.addictiveStuffClientRestore;
      this.addictiveStuffClientDelete = data.addictiveStuffClientDelete;
    } else {
      this.setInitialValue();
    }
  }
}
