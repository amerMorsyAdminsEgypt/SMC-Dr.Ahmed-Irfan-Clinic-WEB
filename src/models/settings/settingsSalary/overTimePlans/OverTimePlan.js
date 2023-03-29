import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import OverTimePlansSlideDetails from "@/models/settings/settingsSalary/overTimePlans/OverTimePlansSlideDetails";

export default class OverTimePlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.overTimePlansToken = "";
    this.overTimePlansCode = "";
    this.overTimePlansNameCurrent = "";
    this.overTimePlansNameAr = "";
    this.overTimePlansNameEn = "";
    this.overTimePlansNameUnd = "";
    this.overTimePlansNote = "";
    this.dateTimeActionAdd = "";
    this.dateActionAdd = "";
    this.TimeActionAdd = "";
    this.overTimePlansArchiveStatus = "";
    this.overTimePlansSlidesDetailsData = [new OverTimePlansSlideDetails()];
  }
  fillData(data) {
    this.overTimePlansToken = data.overTimePlansToken;
    this.overTimePlansCode = data.overTimePlansCode;
    this.overTimePlansNameCurrent = data.overTimePlansNameCurrent;
    this.overTimePlansNameAr = data.overTimePlansNameAr;
    this.overTimePlansNameEn = data.overTimePlansNameEn;
    this.overTimePlansNameUnd = data.overTimePlansNameUnd;
    this.overTimePlansNote = data.overTimePlansNote;
    this.dateTimeActionAdd = data.dateTimeActionAdd;
    this.dateActionAdd = data.dateActionAdd;
    this.TimeActionAdd = data.TimeActionAdd;
    this.overTimePlansArchiveStatus = data.overTimePlansArchiveStatus;
    this.overTimePlansSlidesDetailsData = data.overTimePlansSlidesDetailsData;
  }

  async getOverTimePlans(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/OverTimePlans/GetOverTimePlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getOverTimePlanDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/OverTimePlans/GetOverTimePlansDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&overTimePlansToken=${this.overTimePlansToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfOverTimePlans(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/OverTimePlans/GetDialogOfOverTimePlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateOverTimePlan(language, userAuthorizeToken) {
    for (let item in this.overTimePlansSlidesDetailsData) {
      if (item != 0)
        this.overTimePlansSlidesDetailsData[item]["timeFrom"] =
          this.overTimePlansSlidesDetailsData[item - 1]["timeTo"];
    }
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      overTimePlansToken: this.overTimePlansToken,
      overTimePlansCode: this.overTimePlansCode,
      overTimePlansNameAr: this.overTimePlansNameAr,
      overTimePlansNameEn: this.overTimePlansNameEn,
      overTimePlansNameUnd: this.overTimePlansNameUnd,
      overTimePlansNote: this.overTimePlansNote,
      overTimePlansSlidesDetailsData: this.overTimePlansSlidesDetailsData,
    };

    try {
      let response = "";
      if (
        this.overTimePlansToken == "" ||
        this.overTimePlansToken == undefined
      ) {
        response = await axios.post(`/OverTimePlans//AddOverTimePlans`, data);
      } else {
        response = await axios.post(
          `/OverTimePlans//UpdateOverTimePlans`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveOverTimePlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      overTimePlansToken: this.overTimePlansToken,
    };

    try {
      let response = await axios.post(
        `/OverTimePlans//ArchiveOverTimePlans`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
