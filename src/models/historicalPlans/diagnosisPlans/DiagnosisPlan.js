import { PAGE_SIZE, STATUS } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";
import axios from "axios";
import MainReservationData from "@/models/historicalPlans/MainReservationData";
import DiagnosisPlansDetilsData from "@/models/historicalPlans/diagnosisPlans/DiagnosisPlansDetilsData";

export default class DiagnosisPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.diagnosisPlanToken = "";
    this.diagnosisPlanCode = "";
    this.reservationToken = "";
    this.clientToken = "";
    this.employeeTokenInReport = "";
    this.employeeNameCurrentInReport = "";
    this.employeeJobTokenInReport = "";
    this.employeeJobNameCurrentInReport = "";
    this.employeeScientificDegreeTokenInReport = "";
    this.employeeScientificDegreeNameCurrentInReport = "";
    this.diagnosisPlanDateTime = "";
    this.diagnosisPlanDayName = "";
    this.diagnosisPlanDate = "";
    this.diagnosisPlanTime = "";
    this.diagnosisPlanArchiveStatus = "";
    this.mainReservationData = new MainReservationData();
    this.diagnosisPlansDetilsData = [new DiagnosisPlansDetilsData()];
    this.sendTo = "";
  }
  fillData(data) {
    this.diagnosisPlanToken = data.diagnosisPlanToken;
    this.diagnosisPlanCode = data.diagnosisPlanCode;
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
    this.diagnosisPlanDateTime = data.diagnosisPlanDateTime;
    this.diagnosisPlanDayName = data.diagnosisPlanDayName;
    this.diagnosisPlanDate = data.diagnosisPlanDate;
    this.diagnosisPlanTime = data.diagnosisPlanTime;
    this.diagnosisPlanArchiveStatus = data.diagnosisPlanArchiveStatus;
    this.mainReservationData = data.mainReservationData;
    this.diagnosisPlansDetilsData = data.diagnosisPlansDetilsData;
  }

  async getAllDiagnosisPlans(
    language,
    userAuthorizeToken,
    pagination,
    filterData
  ) {
    try {
      let response = await axios.get(
        `/DiagnosisPlan/GetDiagnosisPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${pagination.selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&paginationStatus=true&reservationToken=${filterData.reservationToken}&employeeTokenInReport=${filterData.employeeTokenInReport}&clientToken=${filterData.clientToken}&dateFrom=${filterData.dateFrom}&dateTo=${filterData.dateTo}&textSearch=${filterData.textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDiagnosisPlanDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/DiagnosisPlan/GetDiagnosisPlanDetalis?language=${language}&userAuthorizeToken=${userAuthorizeToken}&diagnosisPlanToken=${this.diagnosisPlanToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateDiagnosisPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      diagnosisPlanToken: this.diagnosisPlanToken,
      reservationToken: this.reservationToken,
      employeeTokenInReport: this.employeeTokenInReport,
      diagnosisPlansDetilsData: this.diagnosisPlansDetilsData,
    };

    try {
      let response = "";
      if (
        this.diagnosisPlanToken == "" ||
        this.diagnosisPlanToken == undefined
      ) {
        response = await axios.post(`/DiagnosisPlan/AddDiagnosisPlan`, data);
      } else {
        response = await axios.post(`/DiagnosisPlan/UpdateDiagnosisPlan`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveDiagnosisPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      diagnosisPlanToken: this.diagnosisPlanToken,
    };

    try {
      let response = await axios.post(
        `/DiagnosisPlan/ArchiveDiagnosisPlan`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async downloadDiagnosisPlan(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/DiagnosisPlan/GetDiagnosisPlanReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&diagnosisPlanToken=${this.diagnosisPlanToken}&sendTo=${this.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPathMedicine);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
