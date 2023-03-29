import PaginationData from "@/models/general/PaginationData";
import QuestionPlan from "@/models/historicalPlans/questionPlans/QuestionPlan";
import QuestionPlansFilter from "@/models/historicalPlans/questionPlans/QuestionPlansFilter";

export default class QuestionPlans {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.pagination = new PaginationData();
    this.questionPlansData = [];
    this.questionPlan = new QuestionPlan();
    this.filterData = new QuestionPlansFilter();
  }
  fillData(data) {
    this.status = data.status;
    this.msg = data.msg;
    this.pagination.fillData(data.questionPlanPagination);
    this.questionPlansData = data.questionPlanPagination.questionPlanData;
  }
}
