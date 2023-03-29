export default class OfficesTimes {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountOfficesTimes = 0;
    this.totalCountOfficesTimesNotActive = 0;
    this.totalCountOfficesTimesArchived = 0;
  }
  fillData(data) {
    this.totalCountOfficesTimes = data.totalCountOfficesTimes;
    this.totalCountOfficesTimesNotActive = data.totalCountOfficesTimesNotActive;
    this.totalCountOfficesTimesArchived = data.totalCountOfficesTimesArchived;
  }
}
