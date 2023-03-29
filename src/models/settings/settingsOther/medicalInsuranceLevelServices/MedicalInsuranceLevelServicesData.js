export default class MedicalInsuranceLevelServicesData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicalInsuranceLevelServiceToken = "";
    this.serviceToken = "";
    this.serviceNameCurrent = "";
    this.medicalInsuranceLevelToken = "";
    this.medicalInsuranceLevelNameCurrent = "";
    this.discountPercentage = "";
    this.medicalInsuranceLevelServiceArchiveStatus = "";
  }
  fillData(data) {
    if (data) {
      this.medicalInsuranceLevelServiceToken =
        data.medicalInsuranceLevelServiceToken ?? "";
      this.serviceToken = data.serviceToken ?? "";
      this.serviceNameCurrent = data.serviceNameCurrent ?? "";
      this.medicalInsuranceLevelToken = data.medicalInsuranceLevelToken ?? "";
      this.medicalInsuranceLevelNameCurrent =
        data.medicalInsuranceLevelNameCurrent ?? "";
      this.discountPercentage = data.discountPercentage ?? "";
      this.medicalInsuranceLevelServiceArchiveStatus =
        data.medicalInsuranceLevelServiceArchiveStatus ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
