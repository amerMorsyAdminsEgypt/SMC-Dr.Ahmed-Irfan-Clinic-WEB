import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class BalancesPlansSlideDetails {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.balancesPlansSlidesDetailsToken = "";
    this.balancesPlansToken = "";
    this.balancesPlansNameCurrent = "";
    this.employeeSalaryEffectToken = "";
    this.employeeSalaryEffectNameCurrent = "";
    this.maximumNumberInYearInDays = "";
    this.maximumNumberInYearInHours = "";
    this.maximumNumberInYearInMinutes = "";
    this.maximumNumberInYearInSeconds = "";
    this.maximumNumberInMonthInDays = "";
    this.maximumNumberInMonthInHours = "";
    this.maximumNumberInMonthInMinutes = "";
    this.maximumNumberInMonthInSeconds = "";
    this.maximumNumberInDayInHours = "";
    this.maximumNumberInDayInMinutes = "";
    this.maximumNumberInDayInSeconds = "";
    this.totalMaximumNumberInMillisecond = "";
    this.balancesPlansSlidesDetailsNote = "";
    this.balancesPlansSlidesDetailsArchiveStatus = "";
  }
  fillData(data) {
    this.balancesPlansSlidesDetailsToken = data.balancesPlansSlidesDetailsToken;
    this.balancesPlansToken = data.balancesPlansToken;
    this.balancesPlansNameCurrent = data.balancesPlansNameCurrent;
    this.employeeSalaryEffectToken = data.employeeSalaryEffectToken;
    this.employeeSalaryEffectNameCurrent = data.employeeSalaryEffectNameCurrent;
    this.maximumNumberInYearInDays = data.maximumNumberInYearInDays;
    this.maximumNumberInYearInHours = data.maximumNumberInYearInHours;
    this.maximumNumberInYearInMinutes = data.maximumNumberInYearInMinutes;
    this.maximumNumberInYearInSeconds = data.maximumNumberInYearInSeconds;
    this.maximumNumberInMonthInDays = data.maximumNumberInMonthInDays;
    this.maximumNumberInMonthInHours = data.maximumNumberInMonthInHours;
    this.maximumNumberInMonthInMinutes = data.maximumNumberInMonthInMinutes;
    this.maximumNumberInMonthInSeconds = data.maximumNumberInMonthInSeconds;
    this.maximumNumberInDayInHours = data.maximumNumberInDayInHours;
    this.maximumNumberInDayInMinutes = data.maximumNumberInDayInMinutes;
    this.maximumNumberInDayInSeconds = data.maximumNumberInDayInSeconds;
    this.totalMaximumNumberInMillisecond = data.totalMaximumNumberInMillisecond;
    this.balancesPlansSlidesDetailsNote = data.balancesPlansSlidesDetailsNote;
    this.balancesPlansSlidesDetailsArchiveStatus =
      data.balancesPlansSlidesDetailsArchiveStatus;
  }

  async getAllBalancesPlansSlidesDetails(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/BalancesPlansSlidesDetails/GetAllBalancesPlansSlidesDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getBalancesPlansSlidesDetailsDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/BalancesPlansSlidesDetails/GetBalancesPlansSlidesDetailsDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&balancesPlansSlidesDetailsToken=${this.balancesPlansSlidesDetailsToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateBalancesPlansSlidesDetails(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      balancesPlansSlidesDetailsToken: this.balancesPlansSlidesDetailsToken,
      balancesPlansToken: this.balancesPlansToken,
      employeeSalaryEffectToken: this.employeeSalaryEffectToken,
      maximumNumberInYearInDays: this.maximumNumberInYearInDays,
      maximumNumberInYearInHours: this.maximumNumberInYearInHours,
      maximumNumberInYearInMinutes: this.maximumNumberInYearInMinutes,
      maximumNumberInYearInSeconds: this.maximumNumberInYearInSeconds,
      maximumNumberInMonthInDays: this.maximumNumberInMonthInDays,
      maximumNumberInMonthInHours: this.maximumNumberInMonthInHours,
      maximumNumberInMonthInMinutes: this.maximumNumberInMonthInMinutes,
      maximumNumberInMonthInSeconds: this.maximumNumberInMonthInSeconds,
      maximumNumberInDayInHours: this.maximumNumberInDayInHours,
      maximumNumberInDayInMinutes: this.maximumNumberInDayInMinutes,
      maximumNumberInDayInSeconds: this.maximumNumberInDayInSeconds,
      balancesPlansSlidesDetailsNote: this.balancesPlansSlidesDetailsNote,
    };

    try {
      let response = "";
      if (
        this.balancesPlansSlidesDetailsToken == "" ||
        this.balancesPlansSlidesDetailsToken == undefined
      ) {
        response = await axios.post(
          `/BalancesPlansSlidesDetails//AddBalancesPlansSlidesDetails`,
          data
        );
      } else {
        response = await axios.post(
          `/BalancesPlansSlidesDetails//UpdatBalancesPlansSlidesDetails`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveBalancesPlansSlidesDetails(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      balancesPlansSlidesDetailsToken: this.balancesPlansSlidesDetailsToken,
    };

    try {
      let response = await axios.post(
        `/BalancesPlansSlidesDetails//ArchiveBalancesPlansSlidesDetails`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
