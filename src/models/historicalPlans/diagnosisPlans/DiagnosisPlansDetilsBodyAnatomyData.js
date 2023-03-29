export default class DiagnosisPlansDetilsBodyAnatomyData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.diagnosisPlansDetilsBodyAnatomyToken = "";
    this.diagnosisPlansDetilsToken = "";
    this.bodyAnatomyToken = "";
    this.bodyAnatomyNameCurrent = "";
    this.bodyAnatomyImagePath = "";
    this.bodyAnatomyTypeToken = "";
    this.bodyAnatomyTypeNameCurrent = "";
    this.diagnosisPlansDetilsBodyAnatomyNotes = "";
    this.diagnosisPlansDetilsBodyAnatomyArchiveStatus = false;
  }
  fillData(data) {
    this.diagnosisPlansDetilsBodyAnatomyToken =
      data.diagnosisPlansDetilsBodyAnatomyToken;
    this.diagnosisPlansDetilsToken = data.diagnosisPlansDetilsToken;
    this.bodyAnatomyToken = data.bodyAnatomyToken;
    this.bodyAnatomyNameCurrent = data.bodyAnatomyNameCurrent;
    this.bodyAnatomyImagePath = data.bodyAnatomyImagePath;
    this.bodyAnatomyTypeToken = data.bodyAnatomyTypeToken;
    this.bodyAnatomyTypeNameCurrent = data.bodyAnatomyTypeNameCurrent;
    this.diagnosisPlansDetilsBodyAnatomyNotes =
      data.diagnosisPlansDetilsBodyAnatomyNotes;
    this.diagnosisPlansDetilsBodyAnatomyArchiveStatus =
      data.diagnosisPlansDetilsBodyAnatomyArchiveStatus;
  }
}
