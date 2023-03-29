export default class ServicesReservationMedicationPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicationPlanToken = "";
    this.treatmentPlanToken = "";
    this.medicinesTypeToken = "";
    this.medicinesTypeNameCurrent = "";
    this.medicinesTypeNameAr = "";
    this.medicinesTypeNameEn = "";
    this.medicinesTypeNameUnd = "";
    this.medicineToken = "";
    this.medicineNameCurrent = "";
    this.medicineNameAr = "";
    this.medicineNameEn = "";
    this.medicineNameUnd = "";
    this.countInDay = "";
    this.medicationTime = "";
    this.medicationQuantity = "";
    this.medicationPlanNotes = "";
    this.medicationPlanArchiveStatus = "";
  }
  fillData(data) {
    this.medicationPlanToken = data.medicationPlanToken;
    this.treatmentPlanToken = data.treatmentPlanToken;
    this.medicinesTypeToken = data.medicinesTypeToken;
    this.medicinesTypeNameCurrent = data.medicinesTypeNameCurrent;
    this.medicinesTypeNameAr = data.medicinesTypeNameAr;
    this.medicinesTypeNameEn = data.medicinesTypeNameEn;
    this.medicinesTypeNameUnd = data.medicinesTypeNameUnd;
    this.medicineToken = data.medicineToken;
    this.medicineNameCurrent = data.medicineNameCurrent;
    this.medicineNameAr = data.medicineNameAr;
    this.medicineNameEn = data.medicineNameEn;
    this.medicineNameUnd = data.medicineNameUnd;
    this.countInDay = data.countInDay;
    this.medicationTime = data.medicationTime;
    this.medicationQuantity = data.medicationQuantity;
    this.medicationPlanNotes = data.medicationPlanNotes;
    this.medicationPlanArchiveStatus = data.medicationPlanArchiveStatus;
  }
}
