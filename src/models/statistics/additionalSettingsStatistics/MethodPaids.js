export default class MethodPaids {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountMethodPaids = 0;
    this.totalCountMethodPaidsNotActive = 0;
    this.totalCountMethodPaidsArchived = 0;
  }
  fillData(data) {
    this.totalCountMethodPaids = data.totalCountMethodPaids;
    this.totalCountMethodPaidsNotActive = data.totalCountMethodPaidsNotActive;
    this.totalCountMethodPaidsArchived = data.totalCountMethodPaidsArchived;
  }
}
