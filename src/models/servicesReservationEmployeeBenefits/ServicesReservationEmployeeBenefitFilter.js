export default class ServicesReservationEmployeeBenefitFilter {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.sortBySumEmployeeBenefitValue = true;
    this.employeesHaveBenefitStatus = true;
    this.textSearch = "";
    this.employeeTypeToken = "";
    this.employeeToken = "";
    this.sectorToken = "";
    this.employeeJobToken = "";
    this.generalSpecialtyToken = "";
    this.specialSpecialtyToken = "";
    this.employeeGenderToken = "";
    this.branchToken = "";
    this.floorToken = "";
    this.chamberToken = "";
    this.officeToken = "";
    this.serviceToken = "";
    this.serviceProvideTypeToken = "";
    this.dateTimeFrom = "";
    this.dateTimeTo = "";
  }
  fillData(data) {
    if (data) {
      this.sortBySumEmployeeBenefitValue =
        data.sortBySumEmployeeBenefitValue ?? true;
      this.employeesHaveBenefitStatus = data.employeesHaveBenefitStatus ?? true;
      this.textSearch = data.textSearch ?? "";
      this.employeeTypeToken = data.employeeTypeToken ?? "";
      this.employeeToken = data.employeeToken ?? "";
      this.sectorToken = data.sectorToken ?? "";
      this.employeeJobToken = data.employeeJobToken ?? "";
      this.generalSpecialtyToken = data.generalSpecialtyToken ?? "";
      this.specialSpecialtyToken = data.specialSpecialtyToken ?? "";
      this.employeeGenderToken = data.employeeGenderToken ?? "";
      this.branchToken = data.branchToken ?? "";
      this.floorToken = data.floorToken ?? "";
      this.chamberToken = data.chamberToken ?? "";
      this.officeToken = data.officeToken ?? "";
      this.serviceToken = data.serviceToken ?? "";
      this.serviceProvideTypeToken = data.serviceProvideTypeToken ?? "";
      this.dateTimeFrom = data.dateTimeFrom ?? "";
      this.dateTimeTo = data.dateTimeTo ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
