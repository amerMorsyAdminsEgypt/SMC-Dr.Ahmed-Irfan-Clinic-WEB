import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import AbsencePlansSlideDetails from "@/models/settings/settingsSalary/absencePlans/AbsencePlansSlideDetails";

export default class AbsencePlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.absencePlansToken = "";
    this.absencePlansCode = "";
    this.absencePlansNameCurrent = "";
    this.absencePlansNameAr = "";
    this.absencePlansNameEn = "";
    this.absencePlansNameUnd = "";
    this.absencePlansNote = "";
    this.dateTimeActionAdd = "";
    this.dateActionAdd = "";
    this.TimeActionAdd = "";
    this.absencePlansArchiveStatus = "";
    this.absencePlansSlidesDetailsData = [new AbsencePlansSlideDetails()];
  }
  fillData(data) {
    this.absencePlansToken = data.absencePlansToken;
    this.absencePlansCode = data.absencePlansCode;
    this.absencePlansNameCurrent = data.absencePlansNameCurrent;
    this.absencePlansNameAr = data.absencePlansNameAr;
    this.absencePlansNameEn = data.absencePlansNameEn;
    this.absencePlansNameUnd = data.absencePlansNameUnd;
    this.absencePlansNote = data.absencePlansNote;
    this.dateTimeActionAdd = data.dateTimeActionAdd;
    this.dateActionAdd = data.dateActionAdd;
    this.TimeActionAdd = data.TimeActionAdd;
    this.absencePlansArchiveStatus = data.absencePlansArchiveStatus;
    this.absencePlansSlidesDetailsData = data.absencePlansSlidesDetailsData;
  }

  async getAbsencePlanses(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/AbsencePlans/GetAbsencePlanses?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getAbsencePlanDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/AbsencePlans/GetAbsencePlansDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&absencePlansToken=${this.absencePlansToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfAbsencePlans(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/AbsencePlans/GetDialogOfAbsencePlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateAbsencePlan(language, userAuthorizeToken) {
    for (let item in this.absencePlansSlidesDetailsData) {
      if (item != 0)
        this.absencePlansSlidesDetailsData[item]["workShiftsNumberFrom"] =
          this.absencePlansSlidesDetailsData[item - 1]["workShiftsNumberTo"];
    }
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      absencePlansToken: this.absencePlansToken,
      absencePlansCode: this.absencePlansCode,
      absencePlansNameAr: this.absencePlansNameAr,
      absencePlansNameEn: this.absencePlansNameEn,
      absencePlansNameUnd: this.absencePlansNameUnd,
      absencePlansNote: this.absencePlansNote,
      absencePlansSlidesDetailsData: this.absencePlansSlidesDetailsData,
    };

    try {
      let response = "";
      if (this.absencePlansToken == "" || this.absencePlansToken == undefined) {
        response = await axios.post(`/AbsencePlans//AddAbsencePlans`, data);
      } else {
        response = await axios.post(`/AbsencePlans//UpdateAbsencePlans`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveAbsencePlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      absencePlansToken: this.absencePlansToken,
    };

    try {
      let response = await axios.post(
        `/AbsencePlans//ArchiveAbsencePlans`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
