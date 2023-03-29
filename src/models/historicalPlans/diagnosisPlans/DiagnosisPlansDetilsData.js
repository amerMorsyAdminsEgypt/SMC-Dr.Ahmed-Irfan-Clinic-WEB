import DiagnosisPlansDetilsBodyAnatomyData from "@/models/historicalPlans/diagnosisPlans/DiagnosisPlansDetilsBodyAnatomyData";

export default class DiagnosisPlansDetilsData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.diagnosisPlansDetilsToken = "";
    this.diagnosisPlansDetilsCode = "";
    this.diagnosisPlanToken = "";
    this.diagnosisTextCurrent = "";
    this.diagnosisTextAr = "";
    this.diagnosisTextEn = "";
    this.diagnosisTextUnd = "";
    this.diseaseTextCurrent = "";
    this.diseaseTextAr = "";
    this.diseaseTextEn = "";
    this.diseaseTextUnd = "";
    this.complaintTextCurrent = "";
    this.complaintTextAr = "";
    this.complaintTextEn = "";
    this.complaintTextUnd = "";
    this.symptomsTextCurrent = "";
    this.symptomsTextAr = "";
    this.symptomsTextEn = "";
    this.symptomsTextUnd = "";
    this.diagnosisPlansDetilsNotes = "";
    this.diagnosisPlansDetilsArchiveStatus = false;
    this.diagnosisPlansDetilsBodyAnatomyData = [
      new DiagnosisPlansDetilsBodyAnatomyData(),
    ];
  }
  fillData(data) {
    this.diagnosisPlansDetilsToken = data.diagnosisPlansDetilsToken;
    this.diagnosisPlansDetilsCode = data.diagnosisPlansDetilsCode;
    this.diagnosisPlanToken = data.diagnosisPlanToken;
    this.diagnosisTextCurrent = data.diagnosisTextCurrent;
    this.diagnosisTextAr = data.diagnosisTextAr;
    this.diagnosisTextEn = data.diagnosisTextEn;
    this.diagnosisTextUnd = data.diagnosisTextUnd;
    this.diseaseTextCurrent = data.diseaseTextCurrent;
    this.diseaseTextAr = data.diseaseTextAr;
    this.diseaseTextEn = data.diseaseTextEn;
    this.diseaseTextUnd = data.diseaseTextUnd;
    this.complaintTextCurrent = data.complaintTextCurrent;
    this.complaintTextAr = data.complaintTextAr;
    this.complaintTextEn = data.complaintTextEn;
    this.complaintTextUnd = data.complaintTextUnd;
    this.symptomsTextCurrent = data.symptomsTextCurrent;
    this.symptomsTextAr = data.symptomsTextAr;
    this.symptomsTextEn = data.symptomsTextEn;
    this.symptomsTextUnd = data.symptomsTextUnd;
    this.diagnosisPlansDetilsNotes = data.diagnosisPlansDetilsNotes;
    this.diagnosisPlansDetilsArchiveStatus =
      data.diagnosisPlansDetilsArchiveStatus;
    this.diagnosisPlansDetilsBodyAnatomyData =
      data.diagnosisPlansDetilsBodyAnatomyData;
  }
}
