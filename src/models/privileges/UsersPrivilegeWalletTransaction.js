export default class UsersPrivilegeWalletTransaction {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.walletTransactionView = false;
    this.walletTransactionIncrease = false;
    this.walletTransactionDecrease = false;
  }
  fillData(data) {
    if (data) {
      this.walletTransactionView = data.walletTransactionView;
      this.walletTransactionIncrease = data.walletTransactionIncrease;
      this.walletTransactionDecrease = data.walletTransactionDecrease;
    } else {
      this.setInitialValue();
    }
  }
}
