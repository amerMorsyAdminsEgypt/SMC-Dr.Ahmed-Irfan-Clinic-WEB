import { PAGE_SIZE } from "@/utils/constants";
import { date2slash } from "@/utils/functions";
import axios from "axios";

export default class EmployeeWorkSchedule {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.employeeWorkScheduleToken = "";
    this.employeeWorkScheduleCode = "";
    this.employeeToken = "";
    this.employeeNameCurrent = "";
    this.workPlanToken = "";
    this.workPlanNameCurrent = "";
    this.employeeWorkScheduleActiveStart = "";
    this.employeeWorkScheduleActiveEnd = "";
    this.employeeWorkScheduleNotes = "";
    this.actionDateTime = "";
    this.actionDate = "";
    this.actionTime = "";
    this.employeeWorkScheduleArchiveStatus = "";
  }
  fillData(data) {
    this.employeeWorkScheduleToken = data.employeeWorkScheduleToken;
    this.employeeWorkScheduleCode = data.employeeWorkScheduleCode;
    this.employeeToken = data.employeeToken;
    this.employeeNameCurrent = data.employeeNameCurrent;
    this.workPlanToken = data.workPlanToken;
    this.workPlanNameCurrent = data.workPlanNameCurrent;
    this.employeeWorkScheduleActiveStart = data.employeeWorkScheduleActiveStart;
    this.employeeWorkScheduleActiveEnd = data.employeeWorkScheduleActiveEnd;
    this.employeeWorkScheduleNotes = data.employeeWorkScheduleNotes;
    this.actionDateTime = data.actionDateTime;
    this.actionDate = data.actionDate;
    this.actionTime = data.actionTime;
    this.employeeWorkScheduleArchiveStatus =
      data.employeeWorkScheduleArchiveStatus;
  }

  async getAllEmployeeWorkSchedules(
    language,
    userAuthorizeToken,
    selfPage,
    employeeToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/EmployeeWorkSchedule/GetAllEmployeeWorkSchedule?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&employeeToken=${employeeToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getEmployeeWorkScheduleDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/EmployeeWorkSchedule/GetEmployeeWorkScheduleDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&employeeWorkScheduleToken=${this.employeeWorkScheduleToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addEmployeeWorkSchedule(
    language,
    userAuthorizeToken,
    employeeTokenList
  ) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      employeeWorkScheduleNotes: this.employeeWorkScheduleNotes,
      workPlanToken: this.workPlanToken,
      employeeWorkScheduleActiveStart: date2slash(
        this.employeeWorkScheduleActiveStart
      ),
      employeeTokenList: employeeTokenList,
    };

    try {
      let response = "";
      response = await axios.post(
        `/EmployeeWorkSchedule/AddEmployeeWorkSchedule`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async finalDeleteEmployeeWorkSchedule(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      employeeWorkScheduleToken: this.employeeWorkScheduleToken,
    };

    try {
      let response = await axios.post(
        `/EmployeeWorkSchedule/FinalDeleteEmployeeWorkSchedule`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
