export default class UsersPrivilegeExpenses {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.expensesView = false;
    this.expensesAdd = false;
    this.expensesRefund = false;
  }
  fillData(data) {
    if (data) {
      this.expensesView = data.expensesView;
      this.expensesAdd = data.expensesAdd;
      this.expensesRefund = data.expensesRefund;
    } else {
      this.setInitialValue();
    }
  }
}
