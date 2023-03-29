import axios from "axios";
import { STATUS } from "@/utils/constants";
import i18n from "@/i18n/index.js";

export default class EmployeesInputSheetAttendance {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.sheet = "";
    this.inputSheetAttendaceToken = "";
    this.inputSheetAttendaceCode = "";
    this.mainColumnToken = "";
    this.mainColumnNameCurrent = "";
    this.inputSheetAttendaceMonth = "";
    this.inputSheetAttendaceYear = "";
    this.dateTimeUpload = "";
    this.dateUpload = "";
    this.timeUpload = "";
    this.sheetTypeStatusToken = "";
    this.sheetTypeStatusNameCurrent = "";
    this.sheetTypeStatusNameEn = "";
    this.sheetTypeStatusNameAr = "";
    this.sheetTypeStatusNameUnd = "";
    this.inputSheetPath = "";
    this.inputSheetArchiveStatus = "";
  }
  fillData(data) {
    this.sheet = data.sheet;
    this.inputSheetAttendaceToken = data.inputSheetAttendaceToken;
    this.inputSheetAttendaceCode = data.inputSheetAttendaceCode;
    this.mainColumnToken = data.mainColumnToken;
    this.mainColumnNameCurrent = data.mainColumnNameCurrent;
    this.inputSheetAttendaceMonth = data.inputSheetAttendaceMonth;
    this.inputSheetAttendaceYear = data.inputSheetAttendaceYear;
    this.dateTimeUpload = data.dateTimeUpload;
    this.dateUpload = data.dateUpload;
    this.timeUpload = data.timeUpload;
    this.sheetTypeStatusToken = data.sheetTypeStatusToken;
    this.sheetTypeStatusNameCurrent = data.sheetTypeStatusNameCurrent;
    this.sheetTypeStatusNameEn = data.sheetTypeStatusNameEn;
    this.sheetTypeStatusNameAr = data.sheetTypeStatusNameAr;
    this.sheetTypeStatusNameUnd = data.sheetTypeStatusNameUnd;
    this.inputSheetPath = data.inputSheetPath;
    this.inputSheetArchiveStatus = data.inputSheetArchiveStatus;
  }

  async getEmployeesInputSheetAttendanceDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/EmployeesInputSheetAttendance/GetEmployeesInputSheetAttendanceDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&inputSheetAttendaceToken=${this.inputSheetAttendaceToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addEmployeesInputSheetAttendance(language, userAuthorizeToken) {
    var data = {
      sheet: this.sheet,
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      inputSheetAttendaceYear: this.inputSheetAttendaceYear,
      inputSheetAttendaceMonth: this.inputSheetAttendaceMonth,
      sheetTypeStatusToken: this.sheetTypeStatusToken,
      mainColumnToken: this.mainColumnToken,
    };
    if (this.sheet != "" && this.sheet != undefined) {
      var formData = new FormData();
      formData.append("sheet", this.sheet);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (this.sheet != "" && this.sheet != undefined) {
        response = await axios.post(
          `/EmployeesInputSheetAttendance/AddEmployeesInputSheetAttendance`,
          formData
        );
      } else {
        response = {
          data: {
            status: STATUS.ERROR,
            msg: i18n.t("pleaseSelectASheetToUploadIt"),
          },
        };
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async finalDeleteEmployeesInputSheetAttendance(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      inputSheetAttendaceToken: this.inputSheetAttendaceToken,
    };

    try {
      let response = await axios.post(
        `/EmployeesInputSheetAttendance/FinalDeleteEmployeesInputSheetAttendance`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
