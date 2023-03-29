export default class InsuranceCompanyServicesDetailsData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.insuranceCompanyServicesDetailsToken = "";
    this.serviceToken = "";
    this.serviceNameCurrent = "";
    this.insuranceCompanyServiceToken = "";
    this.discountPercentage = "";
    this.insuranceCompanyServicesDetailsArchiveStatus = "";
  }
  fillData(data) {
    if (data) {
      this.insuranceCompanyServicesDetailsToken =
        data.insuranceCompanyServicesDetailsToken ?? "";
      this.serviceToken = data.serviceToken ?? "";
      this.serviceNameCurrent = data.serviceNameCurrent ?? "";
      this.insuranceCompanyServiceToken =
        data.insuranceCompanyServiceToken ?? "";
      this.discountPercentage = data.discountPercentage ?? "";
      this.insuranceCompanyServicesDetailsArchiveStatus =
        data.insuranceCompanyServicesDetailsArchiveStatus ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
