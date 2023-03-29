export default class NewsCategories {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountNewsCategories = 0;
    this.totalCountNewsCategoriesNotActive = 0;
    this.totalCountNewsCategoriesArchived = 0;
  }
  fillData(data) {
    this.totalCountNewsCategories = data.totalCountNewsCategories;
    this.totalCountNewsCategoriesNotActive =
      data.totalCountNewsCategoriesNotActive;
    this.totalCountNewsCategoriesArchived =
      data.totalCountNewsCategoriesArchived;
  }
}
