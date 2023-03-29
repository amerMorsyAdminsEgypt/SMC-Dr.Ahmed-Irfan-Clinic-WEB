export default class ReservationsMediasFilter {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.clientToken = "";
    this.reservationToken = "";
    this.reservationMediaToken = "";
    this.mediaTypeToken = "";
    this.textSearch = "";
  }
  fillData(data) {
    this.clientToken = data.clientToken;
    this.reservationToken = data.reservationToken;
    this.reservationMediaToken = data.reservationMediaToken;
    this.mediaTypeToken = data.mediaTypeToken;
    this.textSearch = data.textSearch;
  }
}
