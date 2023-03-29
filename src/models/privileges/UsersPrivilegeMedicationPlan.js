export default class UsersPrivilegeMedicationPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicationPlanView = false;
    this.medicationPlanAdd = false;
    this.medicationPlanUpdate = false;
    this.medicationPlanArchive = false;
    this.medicationPlanRestore = false;
    this.medicationPlanDelete = false;
  }
  fillData(data) {
    if (data) {
      this.medicationPlanView = data.medicationPlanView;
      this.medicationPlanAdd = data.medicationPlanAdd;
      this.medicationPlanUpdate = data.medicationPlanUpdate;
      this.medicationPlanArchive = data.medicationPlanArchive;
      this.medicationPlanRestore = data.medicationPlanRestore;
      this.medicationPlanDelete = data.medicationPlanDelete;
    } else {
      this.setInitialValue();
    }
  }
}
