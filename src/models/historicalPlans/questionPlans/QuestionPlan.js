import { STATUS, PAGE_SIZE } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";
import axios from "axios";
import MainReservationData from "@/models/historicalPlans/MainReservationData";
import QuestionPlanDetailsData from "@/models/historicalPlans/questionPlans/QuestionPlanDetailsData";

export default class QuestionPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.questionPlanToken = "";
    this.questionPlanCode = "";
    this.reservationToken = "";
    this.clientToken = "";
    this.employeeTokenInReport = "";
    this.employeeNameCurrentInReport = "";
    this.employeeJobTokenInReport = "";
    this.employeeJobNameCurrentInReport = "";
    this.employeeScientificDegreeTokenInReport = "";
    this.employeeScientificDegreeNameCurrentInReport = "";
    this.questionPlanDateTime = "";
    this.questionPlanDate = "";
    this.questionPlanDayName = "";
    this.questionPlanTime = "";
    this.questionPlanData = "";
    this.notes = "";
    this.sendTo = "";
    this.mainReservationData = new MainReservationData();
    this.questionPlanDetailsData = [new QuestionPlanDetailsData()];
  }
  fillData(data) {
    this.questionPlanToken = data.questionPlanToken;
    this.questionPlanCode = data.questionPlanCode;
    this.reservationToken = data.reservationToken;
    this.clientToken = data.clientToken;
    this.employeeTokenInReport = data.employeeTokenInReport;
    this.employeeNameCurrentInReport = data.employeeNameCurrentInReport;
    this.employeeJobTokenInReport = data.employeeJobTokenInReport;
    this.employeeJobNameCurrentInReport = data.employeeJobNameCurrentInReport;
    this.employeeScientificDegreeTokenInReport =
      data.employeeScientificDegreeTokenInReport;
    this.employeeScientificDegreeNameCurrentInReport =
      data.employeeScientificDegreeNameCurrentInReport;
    this.questionPlanDateTime = data.questionPlanDateTime;
    this.questionPlanDate = data.questionPlanDate;
    this.questionPlanDayName = data.questionPlanDayName;
    this.questionPlanTime = data.questionPlanTime;
    this.questionPlanArchiveStatus = data.questionPlanArchiveStatus;
    this.notes = data.notes;
    this.mainReservationData = data.mainReservationData;
    this.questionPlanDetailsData = data.questionPlanDetailsData;
  }

  async getAllQuestionPlans(
    language,
    userAuthorizeToken,
    pagination,
    filterData
  ) {
    try {
      let response = await axios.get(
        `/QuestionPlan/GetQuestionPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${pagination.selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&paginationStatus=true&reservationToken=${filterData.reservationToken}&employeeTokenInReport=${filterData.employeeTokenInReport}&clientToken=${filterData.clientToken}&dateFrom=${filterData.dateFrom}&dateTo=${filterData.dateTo}&textSearch=${filterData.textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getQuestionPlanDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/QuestionPlan/GetQuestionPlanDetalis?language=${language}&userAuthorizeToken=${userAuthorizeToken}&questionPlanToken=${this.questionPlanToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async downloadQuestionPlan(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/QuestionPlan/GetQuestionPlanReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&questionPlanToken=${this.questionPlanToken}&sendTo=${this.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPathMedicine);
      }
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateQuestionPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      questionPlanToken: this.questionPlanToken,
      reservationToken: this.reservationToken,
      employeeTokenInReport: this.employeeTokenInReport,
      notes: this.notes,
      questionPlanDetailsData: this.questionPlanDetailsData,
    };

    try {
      let response = "";
      if (this.questionPlanToken == "" || this.questionPlanToken == undefined) {
        response = await axios.post(`/QuestionPlan/AddQuestionPlan`, data);
      } else {
        response = await axios.post(`/QuestionPlan/UpdateQuestionPlan`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveQuestionPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      questionPlanToken: this.questionPlanToken,
    };

    try {
      let response = await axios.post(
        `/QuestionPlan/ArchiveQuestionPlan`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
