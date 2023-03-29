import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class EmployeesInputSheetAttendanceMerge {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.mergeToken = "";
    this.mergeCode = "";
    this.mergeYear = "";
    this.mergeMonth = "";
    this.mergeDateTimeAtion = "";
    this.mergeDateAtion = "";
    this.mergeTimeAtion = "";
    this.mergeNote = "";
    this.sheetExptionPath = "";
    this.sheetExptionStatus = "";
    this.mergeArchiveStatus = "";
  }
  fillData(data) {
    this.mergeToken = data.mergeToken;
    this.mergeCode = data.mergeCode;
    this.mergeYear = data.mergeYear;
    this.mergeMonth = data.mergeMonth;
    this.mergeDateTimeAtion = data.mergeDateTimeAtion;
    this.mergeDateAtion = data.mergeDateAtion;
    this.mergeTimeAtion = data.mergeTimeAtion;
    this.mergeNote = data.mergeNote;
    this.sheetExptionPath = data.sheetExptionPath;
    this.sheetExptionStatus = data.sheetExptionStatus;
    this.mergeArchiveStatus = data.mergeArchiveStatus;
  }

  async getAllEmployeesInputSheetAttendanceMerge(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/EmployeesInputSheetAttendanceMerge/GetAllEmployeesInputSheetAttendanceMerge?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getEmployeesInputSheetAttendanceMergeDetails(
    language,
    userAuthorizeToken
  ) {
    try {
      let response = await axios.get(
        `/EmployeesInputSheetAttendanceMerge/GetEmployeesInputSheetAttendanceMergeDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&mergeToken=${this.mergeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addEmployeesInputSheetAttendanceMerge(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      mergeCode: this.mergeCode,
      mergeYear: this.mergeYear,
      mergeMonth: this.mergeMonth,
      mergeNote: this.mergeNote,
    };

    try {
      let response = "";
      response = await axios.post(
        `/EmployeesInputSheetAttendanceMerge/AddEmployeesInputSheetAttendanceMerge`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async finalDeleteEmployeesInputSheetAttendanceMerge(
    language,
    userAuthorizeToken
  ) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      mergeToken: this.mergeToken,
    };

    try {
      let response = await axios.post(
        `/EmployeesInputSheetAttendanceMerge/FinalDeleteEmployeesInputSheetAttendanceMerge`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
