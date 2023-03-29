export default class AbsencePlansSlidesDetails {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.workShiftsNumberFrom = 0;
    this.workShiftsNumberTo = "";
    this.priceFactor = "";
    this.absencePlansSlidesDetailsNote = "";
  }
  fillData(data) {
    this.workShiftsNumberFrom = data.workShiftsNumberFrom;
    this.workShiftsNumberTo = data.workShiftsNumberTo;
    this.priceFactor = data.priceFactor;
    this.absencePlansSlidesDetailsNote = data.absencePlansSlidesDetailsNote;
  }
}
