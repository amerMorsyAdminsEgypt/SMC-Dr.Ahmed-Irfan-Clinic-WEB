import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class WorkPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.workPlanToken = "";
    this.workPlanCode = "";
    this.workPlanNameCurrent = "";
    this.workPlanNameEn = "";
    this.workPlanNameAr = "";
    this.workPlanNameUnd = "";
    this.workPlanNotes = "";
    this.actionDateTime = "";
    this.workPlanArchiveStatus = "";
  }
  fillData(data) {
    this.workPlanToken = data.workPlanToken;
    this.workPlanCode = data.workPlanCode;
    this.workPlanNameCurrent = data.workPlanNameCurrent;
    this.workPlanNameEn = data.workPlanNameEn;
    this.workPlanNameAr = data.workPlanNameAr;
    this.workPlanNameUnd = data.workPlanNameUnd;
    this.workPlanNotes = data.workPlanNotes;
    this.actionDateTime = data.actionDateTime;
    this.workPlanArchiveStatus = data.workPlanArchiveStatus;
  }

  async getAllWorkPlans(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/WorkPlans/GetAllWorkPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getWorkPlanDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/WorkPlans/GetWorkPlanDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&workPlanToken=${this.workPlanToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfWorkPlans(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/WorkPlans/GetDialogOfWorkPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateWorkPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      workPlanToken: this.workPlanToken,
      workPlanCode: this.workPlanCode,
      workPlanNameEn: this.workPlanNameEn,
      workPlanNameAr: this.workPlanNameAr,
      workPlanNameUnd: this.workPlanNameUnd,
      workPlanNotes: this.workPlanNotes,
    };

    try {
      let response = "";
      if (this.workPlanToken == "" || this.workPlanToken == undefined) {
        response = await axios.post(`/WorkPlans/AddWorkPlan`, data);
      } else {
        response = await axios.post(`/WorkPlans/UpdateWorkPlan`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveWorkPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      workPlanToken: this.workPlanToken,
    };

    try {
      let response = await axios.post(`/WorkPlans/ArchiveWorkPlan`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
