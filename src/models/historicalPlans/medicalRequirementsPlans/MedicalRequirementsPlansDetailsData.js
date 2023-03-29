export default class MedicalRequirementsPlansDetailsData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicalRequirementPlanDetailsToken = "";
    this.medicalRequirementsPlanToken = "";
    this.requirementTypeToken = "";
    this.requirementTypeNameCurrent = "";
    this.requirementToken = "";
    this.requirementNameCurrent = "";
    this.medicalRequirementPlanDetailsNotes = "";
    this.medicalRequirementPlanDetailsArchiveStatus = "";
  }
  fillData(data) {
    this.medicalRequirementPlanDetailsToken =
      data.medicalRequirementPlanDetailsToken;
    this.medicalRequirementsPlanToken = data.medicalRequirementsPlanToken;
    this.requirementTypeToken = data.requirementTypeToken;
    this.requirementTypeNameCurrent = data.requirementTypeNameCurrent;
    this.requirementToken = data.requirementToken;
    this.requirementNameCurrent = data.requirementNameCurrent;
    this.medicalRequirementPlanDetailsNotes =
      data.medicalRequirementPlanDetailsNotes;
    this.medicalRequirementPlanDetailsArchiveStatus =
      data.medicalRequirementPlanDetailsArchiveStatus;
  }
}
