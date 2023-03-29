import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class WorkPlanShift {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.workPlanShiftToken = "";
    this.workPlanToken = "";
    this.workPlanNameCurrent = "";
    this.workPlanDayToken = "";
    this.workPlanDayNameCurrent = "";
    this.workShiftToken = "";
    this.workShiftNameCurrent = "";
    this.workPlanShiftArchiveStatus = "";
  }
  fillData(data) {
    this.workPlanShiftToken = data.workPlanShiftToken;
    this.workPlanToken = data.workPlanToken;
    this.workPlanNameCurrent = data.workPlanNameCurrent;
    this.workPlanDayToken = data.workPlanDayToken;
    this.workPlanDayNameCurrent = data.workPlanDayNameCurrent;
    this.workShiftToken = data.workShiftToken;
    this.workShiftNameCurrent = data.workShiftNameCurrent;
    this.workPlanShiftArchiveStatus = data.workPlanShiftArchiveStatus;
  }

  async getAllWorkPlansShifts(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/WorkPlansShifts/GetAllWorkPlansShifts?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getWorkPlanShiftsDetalis(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/WorkPlansShifts/GetWorkPlanShiftsDetalis?language=${language}&userAuthorizeToken=${userAuthorizeToken}&workPlanShiftToken=${this.workPlanShiftToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addWorkPlansShifts(
    language,
    userAuthorizeToken,
    workPlanDayToken,
    workShiftTokenList
  ) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      workPlanDayToken: workPlanDayToken,
      workShiftTokenList: workShiftTokenList,
    };

    try {
      let response = "";
      response = await axios.post(`/WorkPlansShifts/AddWorkPlansShifts`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async updateWorkPlanShift(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      workPlanShiftToken: this.workPlanShiftToken,
      workShiftToken: this.workShiftToken,
    };

    try {
      let response = "";
      response = await axios.post(`/WorkPlansShifts/UpdateWorkPlanShift`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async finalDeleteWorkPlansShift(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      workPlanShiftToken: this.workPlanShiftToken,
    };

    try {
      let response = await axios.post(
        `/WorkPlansShifts/FinalDeleteWorkPlansShift`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
