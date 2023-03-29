export default class QuestionPlansFilter {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.reservationToken = "";
    this.employeeTokenInReport = "";
    this.clientToken = "";
    this.dateFrom = "";
    this.dateTo = "";
    this.textSearch = "";
  }
  fillData(data) {
    this.reservationToken = data.reservationToken;
    this.employeeTokenInReport = data.employeeTokenInReport;
    this.clientToken = data.clientToken;
    this.dateFrom = data.dateFrom;
    this.dateTo = data.dateTo;
    this.textSearch = data.textSearch;
  }
}
