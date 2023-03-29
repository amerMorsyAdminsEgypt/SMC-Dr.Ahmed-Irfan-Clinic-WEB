import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class EmployeeOfficialHolidaysPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.employeeOfficialHolidaysPlansToken = "";
    this.employeeOfficialHolidaysPlansCode = "";
    this.employeeToken = "";
    this.employeeNameCurrent = "";
    this.officialHolidaysPlansToken = "";
    this.officialHolidaysPlansNameCurrent = "";
    this.employeeOfficialHolidaysPlansNotes = "";
    this.actionDateTime = "";
    this.actionDate = "";
    this.actionTime = "";
    this.employeeOfficialHolidaysPlansArchiveStatus = "";
    this.officialHolidaysPlansTokenList = [];
    this.employeeTokenList = [];
  }
  fillData(data) {
    this.employeeOfficialHolidaysPlansToken =
      data.employeeOfficialHolidaysPlansToken;
    this.employeeOfficialHolidaysPlansCode =
      data.employeeOfficialHolidaysPlansCode;
    this.employeeToken = data.employeeToken;
    this.employeeNameCurrent = data.employeeNameCurrent;
    this.officialHolidaysPlansToken = data.officialHolidaysPlansToken;
    this.officialHolidaysPlansNameCurrent =
      data.officialHolidaysPlansNameCurrent;
    this.employeeOfficialHolidaysPlansNotes =
      data.employeeOfficialHolidaysPlansNotes;
    this.actionDateTime = data.actionDateTime;
    this.actionDate = data.actionDate;
    this.actionTime = data.actionTime;
    this.employeeOfficialHolidaysPlansArchiveStatus =
      data.employeeOfficialHolidaysPlansArchiveStatus;
    this.officialHolidaysPlansTokenList = data.officialHolidaysPlansTokenList;
    this.employeeTokenList = data.employeeTokenList;
  }

  async getAllEmployeeOfficialHolidaysPlans(
    language,
    userAuthorizeToken,
    selfPage,
    employeeToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/EmployeeOfficialHolidaysPlans/GetAllEmployeeOfficialHolidaysPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&employeeToken=${employeeToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getEmployeeOfficialHolidaysPlansDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/EmployeeOfficialHolidaysPlans/GetEmployeeOfficialHolidaysPlansDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&employeeOfficialHolidaysPlansToken=${this.employeeOfficialHolidaysPlansToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addEmployeeOfficialHolidaysPlans(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      employeeOfficialHolidaysPlansCode: this.employeeOfficialHolidaysPlansCode,
      employeeOfficialHolidaysPlansNotes:
        this.employeeOfficialHolidaysPlansNotes,
      officialHolidaysPlansTokenList: this.officialHolidaysPlansTokenList,
      employeeTokenList: this.employeeTokenList,
    };

    try {
      let response = "";
      response = await axios.post(
        `/EmployeeOfficialHolidaysPlans/AddEmployeeOfficialHolidaysPlans`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveEmployeeOfficialHolidaysPlans(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      employeeOfficialHolidaysPlansToken:
        this.employeeOfficialHolidaysPlansToken,
    };

    try {
      let response = await axios.post(
        `/EmployeeOfficialHolidaysPlans/ArchiveEmployeeOfficialHolidaysPlans`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
