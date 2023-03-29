export default class UsersPrivilegeReports {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.treasuriesTransactionsReportView = false;
    this.paymentReportView = false;
    this.servicesReservationsReportView = false;
  }
  fillData(data) {
    if (data) {
      this.treasuriesTransactionsReportView =
        data.treasuriesTransactionsReportView;
      this.paymentReportView = data.paymentReportView;
      this.servicesReservationsReportView = data.servicesReservationsReportView;
    } else {
      this.setInitialValue();
    }
  }
}
