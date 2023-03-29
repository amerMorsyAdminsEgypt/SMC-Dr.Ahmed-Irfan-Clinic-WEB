export default class SurgriesHistoryDetilsBodyAnatomyData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.surgeryHistoryDetilsBodyAnatomyToken = "";
    this.surgeryHistoryToken = "";
    this.bodyAnatomyToken = "";
    this.bodyAnatomyNameCurrent = "";
    this.bodyAnatomyImagePath = "";
    this.bodyAnatomyTypeToken = "";
    this.bodyAnatomyTypeNameCurrent = "";
    this.surgeryHistoryDetilsBodyAnatomyNotes = "";
    this.surgeryHistoryDetilsBodyAnatomyArchiveStatus = "";
  }
  fillData(data) {
    this.surgeryHistoryDetilsBodyAnatomyToken =
      data.surgeryHistoryDetilsBodyAnatomyToken;
    this.surgeryHistoryToken = data.surgeryHistoryToken;
    this.bodyAnatomyToken = data.bodyAnatomyToken;
    this.bodyAnatomyNameCurrent = data.bodyAnatomyNameCurrent;
    this.bodyAnatomyImagePath = data.bodyAnatomyImagePath;
    this.bodyAnatomyTypeToken = data.bodyAnatomyTypeToken;
    this.bodyAnatomyTypeNameCurrent = data.bodyAnatomyTypeNameCurrent;
    this.surgeryHistoryDetilsBodyAnatomyNotes =
      data.surgeryHistoryDetilsBodyAnatomyNotes;
    this.surgeryHistoryDetilsBodyAnatomyArchiveStatus =
      data.surgeryHistoryDetilsBodyAnatomyArchiveStatus;
  }
}
