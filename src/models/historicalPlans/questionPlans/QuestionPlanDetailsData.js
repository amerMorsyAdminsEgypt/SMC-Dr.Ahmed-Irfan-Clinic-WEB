export default class QuestionPlanDetailsData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.questionPlanDetailsToken = "";
    this.questionPlanToken = "";
    this.questionsTypeToken = "";
    this.questionsTypeNameCurrent = "";
    this.questionToken = "";
    this.questionNameCurrent = "";
    this.questionAnswerTextCurrent = "";
    this.questionAnswerTextEn = "";
    this.questionAnswerTextAr = "";
    this.questionAnswerTextUnd = "";
    this.questionAnswerTrueOrFalse = "";
    this.questionPlanNotes = "";
    this.questionPlanArchiveStatus = "";
  }
  fillData(data) {
    this.questionPlanDetailsToken = data.questionPlanDetailsToken;
    this.questionPlanToken = data.questionPlanToken;
    this.questionsTypeToken = data.questionsTypeToken;
    this.questionsTypeNameCurrent = data.questionsTypeNameCurrent;
    this.questionToken = data.questionToken;
    this.questionNameCurrent = data.questionNameCurrent;
    this.questionAnswerTextCurrent = data.questionAnswerTextCurrent;
    this.questionAnswerTextEn = data.questionAnswerTextEn;
    this.questionAnswerTextAr = data.questionAnswerTextAr;
    this.questionAnswerTextUnd = data.questionAnswerTextUnd;
    this.questionAnswerTrueOrFalse = data.questionAnswerTrueOrFalse;
    this.questionPlanNotes = data.questionPlanNotes;
    this.questionPlanArchiveStatus = data.questionPlanArchiveStatus;
  }
}
