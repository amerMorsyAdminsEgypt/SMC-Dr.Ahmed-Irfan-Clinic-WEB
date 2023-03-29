export default class UsersPrivilegeRevenus {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.revenuesView = false;
    this.revenuesAdd = false;
    this.revenuesRefund = false;
  }
  fillData(data) {
    if (data) {
      this.revenuesView = data.revenuesView;
      this.revenuesAdd = data.revenuesAdd;
      this.revenuesRefund = data.revenuesRefund;
    } else {
      this.setInitialValue();
    }
  }
}
