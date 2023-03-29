export default class PaginationData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalPages = 1;
    this.totalItems = 0;
    this.countItemsInPage = 0;
    this.selfPage = 1;
  }
  fillData(data) {
    this.totalPages = data.totalPages;
    this.totalItems = data.totalItems;
    this.countItemsInPage = data.countItemsInPage;
    this.selfPage = data.selfPage;
  }
}
