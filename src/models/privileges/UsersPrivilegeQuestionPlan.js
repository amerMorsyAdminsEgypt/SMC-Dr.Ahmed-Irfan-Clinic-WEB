export default class UsersPrivilegeQuestionPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.questionPlanView = false;
    this.questionPlanAdd = false;
    this.questionPlanUpdate = false;
    this.questionPlanArchive = false;
    this.questionPlanRestore = false;
    this.questionPlanDelete = false;
  }
  fillData(data) {
    if (data) {
      this.questionPlanView = data.questionPlanView;
      this.questionPlanAdd = data.questionPlanAdd;
      this.questionPlanUpdate = data.questionPlanUpdate;
      this.questionPlanArchive = data.questionPlanArchive;
      this.questionPlanRestore = data.questionPlanRestore;
      this.questionPlanDelete = data.questionPlanDelete;
    } else {
      this.setInitialValue();
    }
  }
}
