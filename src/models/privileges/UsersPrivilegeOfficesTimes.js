export default class UsersPrivilegeOfficesTimes {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.officesTimesView = false;
    this.officesTimesAdd = false;
    this.officesTimesUpdate = false;
    this.officesTimesArchive = false;
    this.officesTimesRestore = false;
    this.officesTimesDelete = false;
  }
  fillData(data) {
    if (data) {
      this.officesTimesView = data.officesTimesView;
      this.officesTimesAdd = data.officesTimesAdd;
      this.officesTimesUpdate = data.officesTimesUpdate;
      this.officesTimesArchive = data.officesTimesArchive;
      this.officesTimesRestore = data.officesTimesRestore;
      this.officesTimesDelete = data.officesTimesDelete;
    } else {
      this.setInitialValue();
    }
  }
}
