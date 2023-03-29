export default class UsersPrivilegeTreasuries {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.treasuriesView = false;
    this.treasuriesAdd = false;
    this.treasuriesUpdate = false;
    this.treasuriesArchive = false;
    this.treasuriesRestore = false;
    this.treasuriesDelete = false;
  }
  fillData(data) {
    if (data) {
      this.treasuriesView = data.treasuriesView;
      this.treasuriesAdd = data.treasuriesAdd;
      this.treasuriesUpdate = data.treasuriesUpdate;
      this.treasuriesArchive = data.treasuriesArchive;
      this.treasuriesRestore = data.treasuriesRestore;
      this.treasuriesDelete = data.treasuriesDelete;
    } else {
      this.setInitialValue();
    }
  }
}
