export default class ExpensesTypes {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountExpensesTypes = 0;
    this.totalCountExpensesTypesNotActive = 0;
    this.totalCountExpensesTypesArchived = 0;
  }
  fillData(data) {
    this.totalCountExpensesTypes = data.totalCountExpensesTypes;
    this.totalCountExpensesTypesNotActive =
      data.totalCountExpensesTypesNotActive;
    this.totalCountExpensesTypesArchived = data.totalCountExpensesTypesArchived;
  }
}
