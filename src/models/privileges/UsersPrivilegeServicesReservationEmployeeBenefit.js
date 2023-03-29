export default class UsersPrivilegeServicesReservationEmployeeBenefit {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.servicesReservationEmployeeBenefitView = false;
  }
  fillData(data) {
    if (data) {
      this.servicesReservationEmployeeBenefitView =
        data.servicesReservationEmployeeBenefitView;
    } else {
      this.setInitialValue();
    }
  }
}
