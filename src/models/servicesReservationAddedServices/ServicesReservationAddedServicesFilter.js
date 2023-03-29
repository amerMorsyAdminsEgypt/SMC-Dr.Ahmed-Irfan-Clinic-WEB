export default class ServicesReservationAddedServicesFilter {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.reservationToken = "";
    this.reservationAddedServicesToken = "";
    this.clientToken = "";
    this.serviceToken = "";
    this.feesTypeToken = "";
    this.specialSpecialtyToken = "";
    this.generalSpecialtyToken = "";
    this.dateFrom = "";
    this.dateTo = "";
    this.textSearch = "";
    this.sendTo = "";
  }
  fillData(data) {
    this.reservationToken = data.reservationToken;
    this.reservationAddedServicesToken = data.reservationAddedServicesToken;
    this.clientToken = data.clientToken;
    this.serviceToken = data.serviceToken;
    this.feesTypeToken = data.feesTypeToken;
    this.specialSpecialtyToken = data.specialSpecialtyToken;
    this.generalSpecialtyToken = data.generalSpecialtyToken;
    this.dateFrom = data.dateFrom;
    this.dateTo = data.dateTo;
    this.textSearch = data.textSearch;
    this.sendTo = data.sendTo;
  }
}
