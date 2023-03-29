export default class Qualifications {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountQualifications = 0;
    this.totalCountQualificationsNotActive = 0;
    this.totalCountQualificationsArchived = 0;
  }
  fillData(data) {
    this.totalCountQualifications = data.totalCountQualifications;
    this.totalCountQualificationsNotActive =
      data.totalCountQualificationsNotActive;
    this.totalCountQualificationsArchived =
      data.totalCountQualificationsArchived;
  }
}
