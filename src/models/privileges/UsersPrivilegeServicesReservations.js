export default class UsersPrivilegeServicesReservations {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.servicesReservationView = false;
    this.servicesReservationClientAdd = false; //
    this.servicesReservationAdd = false;
    this.servicesReservationApprov = false;
    this.servicesReservationViewPay = false;
    this.servicesReservationAddPay = false;
    this.servicesReservationRefoundPay = false;
    this.servicesReservationViewMeasurementRoom = false; //
    this.servicesReservationAddMeasurementRoom = false; //
    this.servicesReservationUpdateMeasurementRoom = false; //
    this.servicesReservationDeleteMeasurementRoom = false; //
    this.servicesReservationViewCancel = false; //
    this.servicesReservationAddCancel = false;
    this.servicesReservationEnter = false;
    this.servicesReservationFinish = false;
    this.servicesReservationAttendance = false;
    this.servicesReservationWaitAndWillComeBack = false;
  }
  fillData(data) {
    if (data) {
      this.servicesReservationView = data.servicesReservationView;
      this.servicesReservationClientAdd = data.servicesReservationClientAdd;
      this.servicesReservationAdd = data.servicesReservationAdd;
      this.servicesReservationApprov = data.servicesReservationApprov;
      this.servicesReservationViewPay = data.servicesReservationViewPay;
      this.servicesReservationAddPay = data.servicesReservationAddPay;
      this.servicesReservationRefoundPay = data.servicesReservationRefoundPay;
      this.servicesReservationViewMeasurementRoom =
        data.servicesReservationViewMeasurementRoom;
      this.servicesReservationAddMeasurementRoom =
        data.servicesReservationAddMeasurementRoom;
      this.servicesReservationUpdateMeasurementRoom =
        data.servicesReservationUpdateMeasurementRoom;
      this.servicesReservationDeleteMeasurementRoom =
        data.servicesReservationDeleteMeasurementRoom;
      this.servicesReservationViewCancel = data.servicesReservationViewCancel;
      this.servicesReservationAddCancel = data.servicesReservationAddCancel;
      this.servicesReservationEnter = data.servicesReservationEnter;
      this.servicesReservationFinish = data.servicesReservationFinish;
      this.servicesReservationAttendance = data.servicesReservationAttendance;
      this.servicesReservationWaitAndWillComeBack =
        data.servicesReservationWaitAndWillComeBack;
    } else {
      this.setInitialValue();
    }
  }
}
