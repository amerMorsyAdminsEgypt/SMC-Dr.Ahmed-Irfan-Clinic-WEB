import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class WorkShift {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.workShiftToken = "";
    this.workShiftCode = "";
    this.workShiftNameCurrent = "";
    this.workShiftNameEn = "";
    this.workShiftNameAr = "";
    this.workShiftNameUnd = "";
    this.workShiftTimeFrom = "";
    this.workShiftTimeTo = "";
    this.workShiftDuration = "";
    this.workShiftNotes = "";
    this.actionDateTime = "";
    this.actionDate = "";
    this.actionTime = "";
    this.isHaveShiftIntersectingStatus = "";
    this.workShiftArchiveStatus = "";
  }
  fillData(data) {
    this.workShiftToken = data.workShiftToken;
    this.workShiftCode = data.workShiftCode;
    this.workShiftNameCurrent = data.workShiftNameCurrent;
    this.workShiftNameEn = data.workShiftNameEn;
    this.workShiftNameAr = data.workShiftNameAr;
    this.workShiftNameUnd = data.workShiftNameUnd;
    this.workShiftTimeFrom = data.workShiftTimeFrom;
    this.workShiftTimeTo = data.workShiftTimeTo;
    this.workShiftDuration = data.workShiftDuration;
    this.workShiftNotes = data.workShiftNotes;
    this.actionDateTime = data.actionDateTime;
    this.actionDate = data.actionDate;
    this.actionTime = data.actionTime;
    this.isHaveShiftIntersectingStatus = data.isHaveShiftIntersectingStatus;
    this.workShiftArchiveStatus = data.workShiftArchiveStatus;
  }

  async getAllWorkShifts(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/WorkShifts/GetAllWorkShifts?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getWorkShiftDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/WorkShifts/GetWorkShiftDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&workShiftToken=${this.workShiftToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfWorkShifts(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/WorkShifts/GetDialogOfWorkShifts?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateWorkShift(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      workShiftToken: this.workShiftToken,
      workShiftNameEn: this.workShiftNameEn,
      workShiftNameAr: this.workShiftNameAr,
      workShiftNameUnd: this.workShiftNameUnd,
      workShiftTimeFrom: this.workShiftTimeFrom,
      workShiftTimeTo: this.workShiftTimeTo,
      workShiftNotes: this.workShiftNotes,
    };

    try {
      let response = "";
      if (this.workShiftToken == "" || this.workShiftToken == undefined) {
        response = await axios.post(`/WorkShifts/AddWorkShift`, data);
      } else {
        response = await axios.post(`/WorkShifts/UpdateWorkShift`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveWorkShift(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      workShiftToken: this.workShiftToken,
    };

    try {
      let response = await axios.post(`/WorkShifts/ArchiveWorkShift`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
