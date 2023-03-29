export default class OffersStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountOffers = 0;
    this.totalCountOffersActive = 0;
    this.totalCountOffersNotArchived = 0;
    this.totalCountOffersArchived = 0;
  }
  fillData(data) {
    this.totalCountOffers = data.totalCountOffers;
    this.totalCountOffersActive = data.totalCountOffersActive;
    this.totalCountOffersNotArchived = data.totalCountOffersNotArchived;
    this.totalCountOffersArchived = data.totalCountOffersArchived;
  }
}
