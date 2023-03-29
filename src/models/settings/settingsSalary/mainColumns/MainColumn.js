import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class MainColumn {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.mainColumnToken = "";
    this.mainColumnNameCurrent = "";
    this.mainColumnNameAr = "";
    this.mainColumnNameEn = "";
    this.mainColumnNameUnd = "";
    this.employeeCodeInOutColumnName = "";
    this.employeeCodeInOutFindStatus = "";
    this.branchCodeInOutColumnName = "";
    this.branchCodeInOutFindStatus = "";
    this.dateTimeInColumnName = "";
    this.dateTimeInFindStatus = "";
    this.dateInColumnName = "";
    this.timeInColumnName = "";
    this.dateTimeSeparatedInFindStatus = "";
    this.dateTimeOutColumnName = "";
    this.dateTimeOutFindStatus = "";
    this.dateOutColumnName = "";
    this.timeOutColumnName = "";
    this.dateTimeSeparatedOutFindStatus = "";
    this.mainColumnNote = "";
    this.mainColumnArchiveStatus = "";
  }
  fillData(data) {
    this.mainColumnToken = data.mainColumnToken;
    this.mainColumnNameCurrent = data.mainColumnNameCurrent;
    this.mainColumnNameAr = data.mainColumnNameAr;
    this.mainColumnNameEn = data.mainColumnNameEn;
    this.mainColumnNameUnd = data.mainColumnNameUnd;
    this.employeeCodeInOutColumnName = data.employeeCodeInOutColumnName;
    this.employeeCodeInOutFindStatus = data.employeeCodeInOutFindStatus;
    this.branchCodeInOutColumnName = data.branchCodeInOutColumnName;
    this.branchCodeInOutFindStatus = data.branchCodeInOutFindStatus;
    this.dateTimeInColumnName = data.dateTimeInColumnName;
    this.dateTimeInFindStatus = data.dateTimeInFindStatus;
    this.dateInColumnName = data.dateInColumnName;
    this.timeInColumnName = data.timeInColumnName;
    this.dateTimeSeparatedInFindStatus = data.dateTimeSeparatedInFindStatus;
    this.dateTimeOutColumnName = data.dateTimeOutColumnName;
    this.dateTimeOutFindStatus = data.dateTimeOutFindStatus;
    this.dateOutColumnName = data.dateOutColumnName;
    this.timeOutColumnName = data.timeOutColumnName;
    this.dateTimeSeparatedOutFindStatus = data.dateTimeSeparatedOutFindStatus;
    this.mainColumnNote = data.mainColumnNote;
    this.mainColumnArchiveStatus = data.mainColumnArchiveStatus;
  }

  async getAllMainColumns(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/InputAttendaceSheetMainColumns/GetAllInputAttendaceSheetMainColumns?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMainColumnDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/InputAttendaceSheetMainColumns/GetInputAttendaceSheetMainColumnsDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&mainColumnToken=${this.mainColumnToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfMainColumns(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/InputAttendaceSheetMainColumns/GetDialogOfInputAttendaceSheetMainColumns?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMainColumn(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      mainColumnToken: this.mainColumnToken,
      mainColumnNameCurrent: this.mainColumnNameCurrent,
      mainColumnNameAr: this.mainColumnNameAr,
      mainColumnNameEn: this.mainColumnNameEn,
      mainColumnNameUnd: this.mainColumnNameUnd,
      employeeCodeInOutColumnName: this.employeeCodeInOutColumnName,
      employeeCodeInOutFindStatus: this.employeeCodeInOutFindStatus,
      branchCodeInOutColumnName: this.branchCodeInOutColumnName,
      branchCodeInOutFindStatus: this.branchCodeInOutFindStatus,
      dateTimeInColumnName: this.dateTimeInColumnName,
      dateTimeInFindStatus: this.dateTimeInFindStatus,
      dateInColumnName: this.dateInColumnName,
      timeInColumnName: this.timeInColumnName,
      dateTimeSeparatedInFindStatus: this.dateTimeSeparatedInFindStatus,
      dateTimeOutColumnName: this.dateTimeOutColumnName,
      dateTimeOutFindStatus: this.dateTimeOutFindStatus,
      dateOutColumnName: this.dateOutColumnName,
      timeOutColumnName: this.timeOutColumnName,
      dateTimeSeparatedOutFindStatus: this.dateTimeSeparatedOutFindStatus,
      mainColumnNote: this.mainColumnNote,
    };

    try {
      let response = "";
      if (this.mainColumnToken == "" || this.mainColumnToken == undefined) {
        response = await axios.post(
          `/InputAttendaceSheetMainColumns/AddInputAttendaceSheetMainColumns`,
          data
        );
      } else {
        response = await axios.post(
          `/InputAttendaceSheetMainColumns/UpdateInputAttendaceSheetMainColumns`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveMainColumn(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      mainColumnToken: this.mainColumnToken,
    };

    try {
      let response = await axios.post(
        `/InputAttendaceSheetMainColumns/ArchiveInputAttendaceSheetMainColumns`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
