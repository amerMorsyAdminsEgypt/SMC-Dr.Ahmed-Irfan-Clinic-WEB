export default class UsersPrivilegeMedicalRequirementsPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicalRequirementsPlanView = false;
    this.medicalRequirementsPlanAdd = false;
    this.medicalRequirementsPlanUpdate = false;
    this.medicalRequirementsPlanArchive = false;
    this.medicalRequirementsPlanRestore = false;
    this.medicalRequirementsPlanDelete = false;
  }
  fillData(data) {
    if (data) {
      this.medicalRequirementsPlanView = data.medicalRequirementsPlanView;
      this.medicalRequirementsPlanAdd = data.medicalRequirementsPlanAdd;
      this.medicalRequirementsPlanUpdate = data.medicalRequirementsPlanUpdate;
      this.medicalRequirementsPlanArchive = data.medicalRequirementsPlanArchive;
      this.medicalRequirementsPlanRestore = data.medicalRequirementsPlanRestore;
      this.medicalRequirementsPlanDelete = data.medicalRequirementsPlanDelete;
    } else {
      this.setInitialValue();
    }
  }
}
