export default class UsersPrivilegeStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.servicesReservationStatisticsView = false;
    this.generalStatisticsView = false;
    this.branchesInformationStatisticsView = false;
    this.additionalSettingsStatisticsView = false;
  }
  fillData(data) {
    if (data) {
      this.servicesReservationStatisticsView =
        data.servicesReservationStatisticsView;
      this.generalStatisticsView = data.generalStatisticsView;
      this.branchesInformationStatisticsView =
        data.branchesInformationStatisticsView;
      this.additionalSettingsStatisticsView =
        data.additionalSettingsStatisticsView;
    } else {
      this.setInitialValue();
    }
  }
}
