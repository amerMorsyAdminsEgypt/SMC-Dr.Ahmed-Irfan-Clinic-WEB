export default class UsersPrivilegeTransactionPointsHistory {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.transactionPointsHistoryView = false;
    this.transactionPointsHistoryIncrease = false;
    this.transactionPointsHistoryDecrease = false;
  }
  fillData(data) {
    if (data) {
      this.transactionPointsHistoryView = data.transactionPointsHistoryView;
      this.transactionPointsHistoryIncrease =
        data.transactionPointsHistoryIncrease;
      this.transactionPointsHistoryDecrease =
        data.transactionPointsHistoryDecrease;
    } else {
      this.setInitialValue();
    }
  }
}
