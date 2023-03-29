export default class InsuranceCompanies {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountInsuranceCompanies = 0;
    this.totalCountInsuranceCompaniesNotActive = 0;
    this.totalCountInsuranceCompaniesArchived = 0;
  }
  fillData(data) {
    this.totalCountInsuranceCompanies = data.totalCountInsuranceCompanies;
    this.totalCountInsuranceCompaniesNotActive =
      data.totalCountInsuranceCompaniesNotActive;
    this.totalCountInsuranceCompaniesArchived =
      data.totalCountInsuranceCompaniesArchived;
  }
}
