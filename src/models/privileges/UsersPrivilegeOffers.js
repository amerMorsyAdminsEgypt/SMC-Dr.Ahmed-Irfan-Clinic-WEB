export default class UsersPrivilegeOffers {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.offersView = false;
    this.offersAdd = false;
    this.offersUpdate = false;
    this.offersArchive = false;
    this.offersRestore = false;
    this.offersDelete = false;
  }
  fillData(data) {
    if (data) {
      this.offersView = data.offersView;
      this.offersAdd = data.offersAdd;
      this.offersUpdate = data.offersUpdate;
      this.offersArchive = data.offersArchive;
      this.offersRestore = data.offersRestore;
      this.offersDelete = data.offersDelete;
    } else {
      this.setInitialValue();
    }
  }
}
