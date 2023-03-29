export default class Meals {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountMeals = 0;
    this.totalCountMealsNotActive = 0;
    this.totalCountMealsArchived = 0;
  }
  fillData(data) {
    this.totalCountMeals = data.totalCountMeals;
    this.totalCountMealsNotActive = data.totalCountMealsNotActive;
    this.totalCountMealsArchived = data.totalCountMealsArchived;
  }
}
