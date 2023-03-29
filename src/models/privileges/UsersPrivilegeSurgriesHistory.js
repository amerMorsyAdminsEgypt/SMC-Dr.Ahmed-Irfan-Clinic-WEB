export default class UsersPrivilegeSurgriesHistory {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.surgriesHistoryView = false;
    this.surgriesHistoryAdd = false;
    this.surgriesHistoryUpdate = false;
    this.surgriesHistoryArchive = false;
    this.surgriesHistoryRestore = false;
    this.surgriesHistoryDelete = false;
  }
  fillData(data) {
    if (data) {
      this.surgriesHistoryView = data.surgriesHistoryView;
      this.surgriesHistoryAdd = data.surgriesHistoryAdd;
      this.surgriesHistoryUpdate = data.surgriesHistoryUpdate;
      this.surgriesHistoryArchive = data.surgriesHistoryArchive;
      this.surgriesHistoryRestore = data.surgriesHistoryRestore;
      this.surgriesHistoryDelete = data.surgriesHistoryDelete;
    } else {
      this.setInitialValue();
    }
  }
}
