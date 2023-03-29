export default class Countries {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountCountries = 0;
    this.totalCountCountriesNotActive = 0;
    this.totalCountCountriesArchived = 0;
  }
  fillData(data) {
    this.totalCountCountries = data.totalCountCountries;
    this.totalCountCountriesNotActive = data.totalCountCountriesNotActive;
    this.totalCountCountriesArchived = data.totalCountCountriesArchived;
  }
}
