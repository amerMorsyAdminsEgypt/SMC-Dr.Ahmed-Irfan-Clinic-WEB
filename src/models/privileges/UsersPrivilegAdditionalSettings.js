export default class UsersPrivilegAdditionalSettings {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.additionalSettingsView = false;
    this.additionalSettingsAdd = false;
    this.additionalSettingsUpdate = false;
    this.additionalSettingsArchive = false;
    this.additionalSettingsRestore = false;
    this.additionalSettingsDelete = false;
  }
  fillData(data) {
    if (data) {
      this.additionalSettingsView = data.additionalSettingsView;
      this.additionalSettingsAdd = data.additionalSettingsAdd;
      this.additionalSettingsUpdate = data.additionalSettingsUpdate;
      this.additionalSettingsArchive = data.additionalSettingsArchive;
      this.additionalSettingsRestore = data.additionalSettingsRestore;
      this.additionalSettingsDelete = data.additionalSettingsDelete;
    } else {
      this.setInitialValue();
    }
  }
}
