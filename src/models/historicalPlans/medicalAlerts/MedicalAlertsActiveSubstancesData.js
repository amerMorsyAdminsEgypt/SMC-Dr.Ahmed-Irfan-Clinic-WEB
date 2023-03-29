export default class MedicalAlertsActiveSubstancesData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicalAlertActiveSubstancesToken = "";
    this.medicalAlertToken = "";
    this.activeSubstanceToken = "";
    this.activeSubstanceNameCurrent = "";
    this.activeSubstancePercentage = "";
    this.medicalAlertActiveSubstancesNotes = "";
    this.medicalAlertActiveSubstancesArchiveStatus = "";
  }
  fillData(data) {
    this.medicalAlertActiveSubstancesToken =
      data.medicalAlertActiveSubstancesToken;
    this.medicalAlertToken = data.medicalAlertToken;
    this.activeSubstanceToken = data.activeSubstanceToken;
    this.activeSubstanceNameCurrent = data.activeSubstanceNameCurrent;
    this.activeSubstancePercentage = data.activeSubstancePercentage;
    this.medicalAlertActiveSubstancesNotes =
      data.medicalAlertActiveSubstancesNotes;
    this.medicalAlertActiveSubstancesArchiveStatus =
      data.medicalAlertActiveSubstancesArchiveStatus;
  }
}
