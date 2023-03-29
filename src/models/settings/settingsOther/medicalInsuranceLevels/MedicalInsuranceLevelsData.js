import MedicalInsuranceLevelServicesData from "../medicalInsuranceLevelServices/MedicalInsuranceLevelServicesData";

export default class MedicalInsuranceLevelsData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicalInsuranceLevelToken = "";
    this.medicalInsuranceLevelCode = "";
    this.colorToken = "";
    this.colorNameCurrent = "";
    this.insuranceCompanyToken = "";
    this.insuranceCompanyNameCurrent = "";
    this.medicalInsuranceLevelNameCurrent = "";
    this.medicalInsuranceLevelNameAr = "";
    this.medicalInsuranceLevelNameEn = "";
    this.medicalInsuranceLevelNameUnd = "";
    this.medicalInsuranceLevelDescriptionCurrent = "";
    this.medicalInsuranceLevelDescriptionEn = "";
    this.medicalInsuranceLevelDescriptionAr = "";
    this.medicalInsuranceLevelDescriptionUnd = "";
    this.medicalInsuranceLevelNotes = "";
    this.medicalInsuranceLevelArchiveStatus = "";
    this.medicalInsuranceLevelServicesData = [
      new MedicalInsuranceLevelServicesData(),
    ];
  }
  fillData(data) {
    if (data) {
      this.medicalInsuranceLevelToken = data.medicalInsuranceLevelToken ?? "";
      this.medicalInsuranceLevelCode = data.medicalInsuranceLevelCode ?? "";
      this.colorToken = data.colorToken ?? "";
      this.colorNameCurrent = data.colorNameCurrent ?? "";
      this.insuranceCompanyToken = data.insuranceCompanyToken ?? "";
      this.insuranceCompanyNameCurrent = data.insuranceCompanyNameCurrent ?? "";
      this.medicalInsuranceLevelNameCurrent =
        data.medicalInsuranceLevelNameCurrent ?? "";
      this.medicalInsuranceLevelNameAr = data.medicalInsuranceLevelNameAr ?? "";
      this.medicalInsuranceLevelNameEn = data.medicalInsuranceLevelNameEn ?? "";
      this.medicalInsuranceLevelNameUnd =
        data.medicalInsuranceLevelNameUnd ?? "";
      this.medicalInsuranceLevelDescriptionCurrent =
        data.medicalInsuranceLevelDescriptionCurrent ?? "";
      this.medicalInsuranceLevelDescriptionEn =
        data.medicalInsuranceLevelDescriptionEn ?? "";
      this.medicalInsuranceLevelDescriptionAr =
        data.medicalInsuranceLevelDescriptionAr ?? "";
      this.medicalInsuranceLevelDescriptionUnd =
        data.medicalInsuranceLevelDescriptionUnd ?? "";
      this.medicalInsuranceLevelNotes = data.medicalInsuranceLevelNotes ?? "";
      this.medicalInsuranceLevelArchiveStatus =
        data.medicalInsuranceLevelArchiveStatus ?? "";
      this.medicalInsuranceLevelServicesData =
        data.medicalInsuranceLevelServicesData ?? [
          new MedicalInsuranceLevelServicesData(),
        ];
    } else {
      this.setInitialValue();
    }
  }
}
