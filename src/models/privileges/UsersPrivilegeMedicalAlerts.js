export default class UsersPrivilegeMedicalAlerts {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicalAlertView = false;
    this.medicalAlertAdd = false;
    this.medicalAlertUpdate = false;
    this.medicalAlertArchive = false;
    this.medicalAlertRestore = false;
    this.medicalAlertDelete = false;
  }
  fillData(data) {
    if (data) {
      this.medicalAlertView = data.medicalAlertView;
      this.medicalAlertAdd = data.medicalAlertAdd;
      this.medicalAlertUpdate = data.medicalAlertUpdate;
      this.medicalAlertArchive = data.medicalAlertArchive;
      this.medicalAlertRestore = data.medicalAlertRestore;
      this.medicalAlertDelete = data.medicalAlertDelete;
    } else {
      this.setInitialValue();
    }
  }
}
