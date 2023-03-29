export default class MealsTypes {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountMealsTypes = 0;
    this.totalCountMealsTypesNotActive = 0;
    this.totalCountMealsTypesArchived = 0;
  }
  fillData(data) {
    this.totalCountMealsTypes = data.totalCountMealsTypes;
    this.totalCountMealsTypesNotActive = data.totalCountMealsTypesNotActive;
    this.totalCountMealsTypesArchived = data.totalCountMealsTypesArchived;
  }
}
