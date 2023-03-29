export default class QuestionsTypes {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountQuestionsTypes = 0;
    this.totalCountQuestionsTypesNotActive = 0;
    this.totalCountQuestionsTypesArchived = 0;
  }
  fillData(data) {
    this.totalCountQuestionsTypes = data.totalCountQuestionsTypes;
    this.totalCountQuestionsTypesNotActive =
      data.totalCountQuestionsTypesNotActive;
    this.totalCountQuestionsTypesArchived =
      data.totalCountQuestionsTypesArchived;
  }
}
