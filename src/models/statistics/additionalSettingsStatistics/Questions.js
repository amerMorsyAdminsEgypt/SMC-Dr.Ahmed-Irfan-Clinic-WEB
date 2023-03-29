export default class Questions {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountQuestions = 0;
    this.totalCountQuestionsNotActive = 0;
    this.totalCountQuestionsArchived = 0;
  }
  fillData(data) {
    this.totalCountQuestions = data.totalCountQuestions;
    this.totalCountQuestionsNotActive = data.totalCountQuestionsNotActive;
    this.totalCountQuestionsArchived = data.totalCountQuestionsArchived;
  }
}
