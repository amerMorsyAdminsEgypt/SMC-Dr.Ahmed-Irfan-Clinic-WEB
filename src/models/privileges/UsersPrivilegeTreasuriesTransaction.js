export default class UsersPrivilegeTreasuriesTransaction {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.treasuriesTransactionsView = false;
    this.depositToTreasury = false;
    this.dropdownFromTreasury = false;
  }
  fillData(data) {
    if (data) {
      this.treasuriesTransactionsView = data.treasuriesTransactionsView;
      this.depositToTreasury = data.depositToTreasury;
      this.dropdownFromTreasury = data.dropdownFromTreasury;
    } else {
      this.setInitialValue();
    }
  }
}
