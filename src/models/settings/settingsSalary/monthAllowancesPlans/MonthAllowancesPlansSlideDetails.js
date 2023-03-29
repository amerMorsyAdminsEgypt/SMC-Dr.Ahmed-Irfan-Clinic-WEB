import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class MonthAllowancesPlansSlideDetails {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.monthAllowancesPlansSlidesDetailsToken = "";
    this.allowanceToken = "";
    this.allowanceNameCurrent = "";
    this.monthAllowancesPlansToken = "";
    this.monthAllowancesPlansNameCurrent = "";
    this.monthAllowancesValue = "";
    this.monthAllowancesMaximumNumberInMonth = "";
    this.monthAllowancesMaximumNumberInYear = "";
    this.beginningOfTheEntitlementInDays = "";
    this.beginningOfTheEntitlementInHours = "";
    this.beginningOfTheEntitlementInMinutes = "";
    this.beginningOfTheEntitlementInSeconds = "";
    this.monthAllowancesPlansSlidesDetailsNote = "";
    this.monthAllowancesPlansSlidesDetailsArchiveStatus = "";
  }
  fillData(data) {
    this.monthAllowancesPlansSlidesDetailsToken =
      data.monthAllowancesPlansSlidesDetailsToken;
    this.allowanceToken = data.allowanceToken;
    this.allowanceNameCurrent = data.allowanceNameCurrent;
    this.monthAllowancesPlansToken = data.monthAllowancesPlansToken;
    this.monthAllowancesPlansNameCurrent = data.monthAllowancesPlansNameCurrent;
    this.monthAllowancesValue = data.monthAllowancesValue;
    this.monthAllowancesMaximumNumberInMonth =
      data.monthAllowancesMaximumNumberInMonth;
    this.monthAllowancesMaximumNumberInYear =
      data.monthAllowancesMaximumNumberInYear;
    this.beginningOfTheEntitlementInDays = data.beginningOfTheEntitlementInDays;
    this.beginningOfTheEntitlementInHours =
      data.beginningOfTheEntitlementInHours;
    this.beginningOfTheEntitlementInMinutes =
      data.beginningOfTheEntitlementInMinutes;
    this.beginningOfTheEntitlementInSeconds =
      data.beginningOfTheEntitlementInSeconds;
    this.monthAllowancesPlansSlidesDetailsNote =
      data.monthAllowancesPlansSlidesDetailsNote;
    this.monthAllowancesPlansSlidesDetailsArchiveStatus =
      data.monthAllowancesPlansSlidesDetailsArchiveStatus;
  }

  async getAllMonthAllowancesPlansSlidesDetails(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/MonthAllowancesPlansSlidesDetails/GetAllMonthAllowancesPlansSlidesDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMonthAllowancesPlansSlidesDetailsDetails(
    language,
    userAuthorizeToken
  ) {
    try {
      let response = await axios.get(
        `/MonthAllowancesPlansSlidesDetails/GetMonthAllowancesPlansSlidesDetailsDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&monthAllowancesPlansSlidesDetailsToken=${this.monthAllowancesPlansSlidesDetailsToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMonthAllowancesPlansSlidesDetails(
    language,
    userAuthorizeToken
  ) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      monthAllowancesPlansSlidesDetailsToken:
        this.monthAllowancesPlansSlidesDetailsToken,
      monthAllowancesPlansToken: this.monthAllowancesPlansToken,
      allowanceToken: this.allowanceToken,
      monthAllowancesValue: this.monthAllowancesValue,
      monthAllowancesMaximumNumberInMonth:
        this.monthAllowancesMaximumNumberInMonth,
      monthAllowancesMaximumNumberInYear:
        this.monthAllowancesMaximumNumberInYear,
      beginningOfTheEntitlementInDays: this.beginningOfTheEntitlementInDays,
      beginningOfTheEntitlementInHours: this.beginningOfTheEntitlementInHours,
      beginningOfTheEntitlementInMinutes:
        this.beginningOfTheEntitlementInMinutes,
      beginningOfTheEntitlementInSeconds:
        this.beginningOfTheEntitlementInSeconds,
      monthAllowancesPlansSlidesDetailsNote:
        this.monthAllowancesPlansSlidesDetailsNote,
    };

    try {
      let response = "";
      if (
        this.monthAllowancesPlansSlidesDetailsToken == "" ||
        this.monthAllowancesPlansSlidesDetailsToken == undefined
      ) {
        response = await axios.post(
          `/MonthAllowancesPlansSlidesDetails//AddMonthAllowancesPlansSlidesDetails`,
          data
        );
      } else {
        response = await axios.post(
          `/MonthAllowancesPlansSlidesDetails//UpdatMonthAllowancesPlansSlidesDetails`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveMonthAllowancesPlansSlidesDetails(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      monthAllowancesPlansSlidesDetailsToken:
        this.monthAllowancesPlansSlidesDetailsToken,
    };

    try {
      let response = await axios.post(
        `/MonthAllowancesPlansSlidesDetails//ArchiveMonthAllowancesPlansSlidesDetails`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
