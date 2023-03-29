import InsuranceCompanyServicesDetailsData from "../insuranceCompanyServicesDetails/InsuranceCompanyServicesDetailsData";

export default class InsuranceCompanyServicesData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.insuranceCompanyServiceToken = "";
    this.insuranceCompanyServiceCode = "";
    this.insuranceCompanyToken = "";
    this.insuranceCompanyNameCurrent = "";
    this.insuranceCompanyServiceNote = "";
    this.dateTimeActionAdd = "";
    this.dateActionAdd = "";
    this.TimeActionAdd = "";
    this.insuranceCompanyServiceArchiveStatus = "";
    this.insuranceCompanyServicesDetailsData = [
      new InsuranceCompanyServicesDetailsData(),
    ];
  }
  fillData(data) {
    if (data) {
      this.insuranceCompanyServiceToken =
        data.insuranceCompanyServiceToken ?? "";
      this.insuranceCompanyServiceCode = data.insuranceCompanyServiceCode ?? "";
      this.insuranceCompanyToken = data.insuranceCompanyToken ?? "";
      this.insuranceCompanyNameCurrent = data.insuranceCompanyNameCurrent ?? "";
      this.insuranceCompanyServiceNote = data.insuranceCompanyServiceNote ?? "";
      this.dateTimeActionAdd = data.dateTimeActionAdd ?? "";
      this.dateActionAdd = data.dateActionAdd ?? "";
      this.TimeActionAdd = data.TimeActionAdd ?? "";
      this.insuranceCompanyServiceArchiveStatus =
        data.insuranceCompanyServiceArchiveStatus ?? "";
      this.insuranceCompanyServicesDetailsData =
        data.insuranceCompanyServicesDetailsData ?? [
          new InsuranceCompanyServicesDetailsData(),
        ];
    } else {
      this.setInitialValue();
    }
  }
}
