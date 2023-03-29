export default class ServicesReservationRequirementPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.requirementPlanToken = "";
    this.requirementTypeToken = "";
    this.requirementTypeNameCurrent = "";
    this.requirementTypeNameAr = "";
    this.requirementTypeNameEn = "";
    this.requirementTypeNameUnd = "";
    this.requirementToken = "";
    this.requirementNameCurrent = "";
    this.requirementNameAr = "";
    this.requirementNameEn = "";
    this.requirementNameUnd = "";
    this.treatmentPlanToken = "";
    this.requirementPlanNote = "";
    this.requirementPlanArchiveStatus = "";
  }
  fillData(data) {
    this.requirementPlanToken = data.requirementPlanToken;
    this.requirementTypeToken = data.requirementTypeToken;
    this.requirementTypeNameCurrent = data.requirementTypeNameCurrent;
    this.requirementTypeNameAr = data.requirementTypeNameAr;
    this.requirementTypeNameEn = data.requirementTypeNameEn;
    this.requirementTypeNameUnd = data.requirementTypeNameUnd;
    this.requirementToken = data.requirementToken;
    this.requirementNameCurrent = data.requirementNameCurrent;
    this.requirementNameAr = data.requirementNameAr;
    this.requirementNameEn = data.requirementNameEn;
    this.requirementNameUnd = data.requirementNameUnd;
    this.treatmentPlanToken = data.treatmentPlanToken;
    this.requirementPlanNote = data.requirementPlanNote;
    this.requirementPlanArchiveStatus = data.requirementPlanArchiveStatus;
  }
}
