export default class UsersPrivilegeEstablishmentsSettings {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.establishmentsSettingsView = false;
    this.establishmentsSettingsAdd = false;
    this.establishmentsSettingsUpdate = false;
    this.establishmentsSettingsArchive = false;
    this.establishmentsSettingsRestore = false;
    this.establishmentsSettingsDelete = false;
  }
  fillData(data) {
    if (data) {
      this.establishmentsSettingsView = data.establishmentsSettingsView;
      this.establishmentsSettingsAdd = data.establishmentsSettingsAdd;
      this.establishmentsSettingsUpdate = data.establishmentsSettingsUpdate;
      this.establishmentsSettingsArchive = data.establishmentsSettingsArchive;
      this.establishmentsSettingsRestore = data.establishmentsSettingsRestore;
      this.establishmentsSettingsDelete = data.establishmentsSettingsDelete;
    } else {
      this.setInitialValue();
    }
  }
}
