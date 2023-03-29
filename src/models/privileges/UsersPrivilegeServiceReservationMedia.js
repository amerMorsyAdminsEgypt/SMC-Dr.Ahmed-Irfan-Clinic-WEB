export default class UsersPrivilegeServiceReservationMedia {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.serviceReservationMediaView = false;
    this.serviceReservationMediaAdd = false;
    this.serviceReservationMediaUpdate = false;
    this.serviceReservationMediaArchive = false;
    this.serviceReservationMediaRestore = false;
    this.serviceReservationMediaDelete = false;
  }
  fillData(data) {
    if (data) {
      this.serviceReservationMediaView = data.serviceReservationMediaView;
      this.serviceReservationMediaAdd = data.serviceReservationMediaAdd;
      this.serviceReservationMediaUpdate = data.serviceReservationMediaUpdate;
      this.serviceReservationMediaArchive = data.serviceReservationMediaArchive;
      this.serviceReservationMediaRestore = data.serviceReservationMediaRestore;
      this.serviceReservationMediaDelete = data.serviceReservationMediaDelete;
    } else {
      this.setInitialValue();
    }
  }
}
