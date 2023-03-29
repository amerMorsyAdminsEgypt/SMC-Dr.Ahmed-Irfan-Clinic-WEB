export default class UsersPrivilegeServicesReservationAddedServices {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.servicesReservationAddedServicesView = false;
    this.servicesReservationAddedServicesAdd = false;
    this.servicesReservationAddedServicesCancel = false;
  }
  fillData(data) {
    if (data) {
      this.servicesReservationAddedServicesView =
        data.servicesReservationAddedServicesView;
      this.servicesReservationAddedServicesAdd =
        data.servicesReservationAddedServicesAdd;
      this.servicesReservationAddedServicesCancel =
        data.servicesReservationAddedServicesCancel;
    } else {
      this.setInitialValue();
    }
  }
}
