import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import MonthAllowancesPlansSlideDetails from "@/models/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlansSlideDetails";

export default class AllowancesPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.monthAllowancesPlansToken = "";
    this.monthAllowancesPlansCode = "";
    this.monthAllowancesPlansNameAr = "";
    this.monthAllowancesPlansNameEn = "";
    this.monthAllowancesPlansNameUnd = "";
    this.monthAllowancesPlansNameCurrent = "";
    this.monthAllowancesPlansNote = "";
    this.dateTimeActionAdd = "";
    this.dateActionAdd = "";
    this.TimeActionAdd = "";
    this.monthAllowancesPlansArchiveStatus = "";
    this.monthAllowancesPlansSlidesDetailsData = [
      new MonthAllowancesPlansSlideDetails(),
    ];
  }
  fillData(data) {
    this.monthAllowancesPlansToken = data.monthAllowancesPlansToken;
    this.monthAllowancesPlansCode = data.monthAllowancesPlansCode;
    this.monthAllowancesPlansNameAr = data.monthAllowancesPlansNameAr;
    this.monthAllowancesPlansNameEn = data.monthAllowancesPlansNameEn;
    this.monthAllowancesPlansNameUnd = data.monthAllowancesPlansNameUnd;
    this.monthAllowancesPlansNameCurrent = data.monthAllowancesPlansNameCurrent;
    this.monthAllowancesPlansNote = data.monthAllowancesPlansNote;
    this.dateTimeActionAdd = data.dateTimeActionAdd;
    this.dateActionAdd = data.dateActionAdd;
    this.TimeActionAdd = data.TimeActionAdd;
    this.monthAllowancesPlansArchiveStatus =
      data.monthAllowancesPlansArchiveStatus;
    this.monthAllowancesPlansSlidesDetailsData =
      data.monthAllowancesPlansSlidesDetailsData;
  }

  async getMonthAllowancesPlans(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/MonthAllowancesPlans/GetMonthAllowancesPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMonthAllowancesPlanDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MonthAllowancesPlans/GetMonthAllowancesPlansDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&monthAllowancesPlansToken=${this.monthAllowancesPlansToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfMonthAllowancesPlans(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MonthAllowancesPlans/GetDialogOfMonthAllowancesPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMonthAllowancesPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      monthAllowancesPlansToken: this.monthAllowancesPlansToken,
      monthAllowancesPlansCode: this.monthAllowancesPlansCode,
      monthAllowancesPlansNameAr: this.monthAllowancesPlansNameAr,
      monthAllowancesPlansNameEn: this.monthAllowancesPlansNameEn,
      monthAllowancesPlansNameUnd: this.monthAllowancesPlansNameUnd,
      monthAllowancesPlansNote: this.monthAllowancesPlansNote,
      monthAllowancesPlansSlidesDetailsData:
        this.monthAllowancesPlansSlidesDetailsData,
    };

    try {
      let response = "";
      if (
        this.monthAllowancesPlansToken == "" ||
        this.monthAllowancesPlansToken == undefined
      ) {
        response = await axios.post(
          `/MonthAllowancesPlans//AddMonthAllowancesPlans`,
          data
        );
      } else {
        response = await axios.post(
          `/MonthAllowancesPlans//UpdateMonthAllowancesPlans`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveMonthAllowancesPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      monthAllowancesPlansToken: this.monthAllowancesPlansToken,
    };

    try {
      let response = await axios.post(
        `/MonthAllowancesPlans//ArchiveMonthAllowancesPlans`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
