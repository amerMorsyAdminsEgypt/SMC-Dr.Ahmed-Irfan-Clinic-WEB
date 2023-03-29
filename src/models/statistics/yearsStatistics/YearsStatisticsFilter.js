export default class YearsStatisticsFilter {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.employeeToken = "";
    this.clientToken = "";
    this.serviceToken = "";
    this.reservationStatusToken = "";
    this.branchToken = "";
    this.buildingToken = "";
    this.chamberToken = "";
    this.floorToken = "";
    this.officeTimeToken = "";
    this.officeToken = "";
    this.dayToken = "";
    this.specialSpecialtyToken = "";
    this.generalSpecialtyToken = "";
    this.feesTypeToken = "";
    this.dateFrom = "";
    this.dateTo = "";
    this.timeFrom = "";
    this.timeTo = "";
    this.textSearch = "";
  }
  fillData(data) {
    this.employeeToken = data.employeeToken;
    this.clientToken = data.clientToken;
    this.serviceToken = data.serviceToken;
    this.reservationStatusToken = data.reservationStatusToken;
    this.branchToken = data.branchToken;
    this.buildingToken = data.buildingToken;
    this.chamberToken = data.chamberToken;
    this.floorToken = data.floorToken;
    this.officeTimeToken = data.officeTimeToken;
    this.officeToken = data.officeToken;
    this.dayToken = data.dayToken;
    this.specialSpecialtyToken = data.specialSpecialtyToken;
    this.generalSpecialtyToken = data.generalSpecialtyToken;
    this.feesTypeToken = data.feesTypeToken;
    this.dateFrom = data.dateFrom;
    this.dateTo = data.dateTo;
    this.timeFrom = data.timeFrom;
    this.timeTo = data.timeTo;
    this.textSearch = data.textSearch;
  }
}
