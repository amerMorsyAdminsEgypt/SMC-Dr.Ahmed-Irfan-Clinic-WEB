import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class WorkPlanDay {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.workPlanDayToken = "";
    this.workPlanToken = "";
    this.dayToken = "";
    this.dayNameCurrent = "";
    this.dayNameAr = "";
    this.dayNameEn = "";
    this.dayNameUnd = "";
    this.dayStatusToken = "";
    this.dayStatusNameCurrent = "";
    this.dayStatusNameAr = "";
    this.dayStatusNameEn = "";
    this.dayStatusNameUnd = "";
    this.workPlanDayArchiveStatus = "";
    this.WorkPlansShiftsData = [];
  }
  fillData(data) {
    this.workPlanDayToken = data.workPlanDayToken;
    this.workPlanToken = data.workPlanToken;
    this.dayToken = data.dayToken;
    this.dayNameCurrent = data.dayNameCurrent;
    this.dayNameAr = data.dayNameAr;
    this.dayNameEn = data.dayNameEn;
    this.dayNameUnd = data.dayNameUnd;
    this.dayStatusToken = data.dayStatusToken;
    this.dayStatusNameCurrent = data.dayStatusNameCurrent;
    this.dayStatusNameAr = data.dayStatusNameAr;
    this.dayStatusNameEn = data.dayStatusNameEn;
    this.dayStatusNameUnd = data.dayStatusNameUnd;
    this.workPlanDayArchiveStatus = data.workPlanDayArchiveStatus;
    this.WorkPlansShiftsData = data.WorkPlansShiftsData;
  }

  async getAllWorkPlanDays(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch,
    workPlanToken = ""
  ) {
    try {
      let response = await axios.get(
        `/WorkPlansDays/GetAllWorkPlansDays?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&workPlanToken=${workPlanToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getWorkPlanDayDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/WorkPlansDays/GetWorkPlanDayDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&workPlanDayToken=${this.workPlanDayToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async updateWorkPlanDay(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      workPlanDayToken: this.workPlanDayToken,
      dayStatusToken: this.dayStatusToken,
    };

    try {
      let response = "";
      response = await axios.post(`/WorkPlansDays/UpdateWorkPlanDay`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
