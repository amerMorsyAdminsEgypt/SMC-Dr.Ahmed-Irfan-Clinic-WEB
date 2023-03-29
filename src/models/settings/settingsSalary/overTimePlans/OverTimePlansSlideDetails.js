export default class OverTimePlansSlidesDetails {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.timeFrom = "12:00:00 am";
    this.timeTo = "12:00:00 am";
    this.overTimePriceFactor = "";
    this.dayTypeToken = "";
    this.overTimePlansSlidesDetailsNote = "";
  }
  fillData(data) {
    this.timeFrom = data.timeFrom;
    this.timeTo = data.timeTo;
    this.overTimePriceFactor = data.overTimePriceFactor;
    this.dayTypeToken = data.dayTypeToken;
    this.overTimePlansSlidesDetailsNote = data.overTimePlansSlidesDetailsNote;
  }
}
