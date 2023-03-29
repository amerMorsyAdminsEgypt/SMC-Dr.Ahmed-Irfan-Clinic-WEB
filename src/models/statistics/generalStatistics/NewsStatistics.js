export default class NewsStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountNews = 0;
    this.totalCountNewsNotArchived = 0;
    this.totalCountNewsArchived = 0;
  }
  fillData(data) {
    this.totalCountNews = data.totalCountNews;
    this.totalCountNewsNotArchived = data.totalCountNewsNotArchived;
    this.totalCountNewsArchived = data.totalCountNewsArchived;
  }
}
