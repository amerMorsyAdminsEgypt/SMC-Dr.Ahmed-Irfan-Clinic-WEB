export default class UsersPrivilegeCurePlans {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.curePlansView = false;
    this.curePlansAdd = false;
    this.curePlansUpdate = false;
    this.curePlansArchive = false;
    this.curePlansRestore = false;
    this.curePlansDelete = false;
  }
  fillData(data) {
    if (data) {
      this.curePlansView = data.curePlansView;
      this.curePlansAdd = data.curePlansAdd;
      this.curePlansUpdate = data.curePlansUpdate;
      this.curePlansArchive = data.curePlansArchive;
      this.curePlansRestore = data.curePlansRestore;
      this.curePlansDelete = data.curePlansDelete;
    } else {
      this.setInitialValue();
    }
  }
}
