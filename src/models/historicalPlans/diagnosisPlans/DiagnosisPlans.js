import PaginationData from "@/models/general/PaginationData";
import DiagnosisPlan from "@/models/historicalPlans/diagnosisPlans/DiagnosisPlan";
import DiagnosisPlansFilter from "@/models/historicalPlans/diagnosisPlans/DiagnosisPlansFilter";

export default class DiagnosisPlans {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.pagination = new PaginationData();
    this.diagnosisPlansData = [];
    this.diagnosisPlan = new DiagnosisPlan();
    this.filterData = new DiagnosisPlansFilter();
  }
  fillData(data) {
    this.status = data.status;
    this.msg = data.msg;
    this.pagination.fillData(data.diagnosisPlansDataPagination);
    this.diagnosisPlansData =
      data.diagnosisPlansDataPagination.diagnosisPlansData;
  }
}
