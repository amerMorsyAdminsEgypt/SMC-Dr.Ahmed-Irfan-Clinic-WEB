import { PAGE_SIZE } from "@/utils/constants";
import { date2slash } from "@/utils/functions";
import axios from "axios";

export default class OfficialHoliday {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.officialHolidayToken = "";
    this.officialHolidayCode = "";
    this.officialHolidayNameCurrent = "";
    this.officialHolidayNameEn = "";
    this.officialHolidayNameAr = "";
    this.officialHolidayNameUnd = "";
    this.officialHolidayStartDateTime = "";
    this.officialHolidayStartDate = "";
    this.officialHolidayStartTime = "";
    this.officialHolidayEndDateTime = "";
    this.officialHolidayEndDate = "";
    this.officialHolidayEndTime = "";
    this.officialHolidayDurationTime = "";
    this.officialHolidayWorkHourPrice = "";
    this.officialHolidayDescriptionCurrent = "";
    this.officialHolidayDescriptionEn = "";
    this.officialHolidayDescriptionAr = "";
    this.officialHolidayDescriptionUnd = "";
    this.officialHolidayNotes = "";
    this.actionDateTime = "";
    this.actionDate = "";
    this.actionTime = "";
    this.officialHolidayArchiveStatus = "";
  }
  fillData(data) {
    this.officialHolidayToken = data.officialHolidayToken;
    this.officialHolidayCode = data.officialHolidayCode;
    this.officialHolidayNameCurrent = data.officialHolidayNameCurrent;
    this.officialHolidayNameEn = data.officialHolidayNameEn;
    this.officialHolidayNameAr = data.officialHolidayNameAr;
    this.officialHolidayNameUnd = data.officialHolidayNameUnd;
    this.officialHolidayStartDateTime = data.officialHolidayStartDateTime;
    this.officialHolidayStartDate = data.officialHolidayStartDate;
    this.officialHolidayStartTime = data.officialHolidayStartTime;
    this.officialHolidayEndDateTime = data.officialHolidayEndDateTime;
    this.officialHolidayEndDate = data.officialHolidayEndDate;
    this.officialHolidayEndTime = data.officialHolidayEndTime;
    this.officialHolidayDurationTime = data.officialHolidayDurationTime;
    this.officialHolidayWorkHourPrice = data.officialHolidayWorkHourPrice;
    this.officialHolidayDescriptionCurrent =
      data.officialHolidayDescriptionCurrent;
    this.officialHolidayDescriptionEn = data.officialHolidayDescriptionEn;
    this.officialHolidayDescriptionAr = data.officialHolidayDescriptionAr;
    this.officialHolidayDescriptionUnd = data.officialHolidayDescriptionUnd;
    this.officialHolidayNotes = data.officialHolidayNotes;
    this.actionDateTime = data.actionDateTime;
    this.actionDate = data.actionDate;
    this.actionTime = data.actionTime;
    this.officialHolidayArchiveStatus = data.officialHolidayArchiveStatus;
  }

  async getAllOfficialHolidays(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/OfficialHolidays/GetAllOfficialHolidays?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getOfficialHolidayDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/OfficialHolidays/GetOfficialHolidayDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&officialHolidayToken=${this.officialHolidayToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfOfficialHolidays(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/OfficialHolidays/GetDialogOfOfficialHolidays?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateOfficialHoliday(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      officialHolidayToken: this.officialHolidayToken,
      officialHolidayNameEn: this.officialHolidayNameEn,
      officialHolidayNameAr: this.officialHolidayNameAr,
      officialHolidayNameUnd: this.officialHolidayNameUnd,
      officialHolidayStartDate: date2slash(this.officialHolidayStartDate),
      officialHolidayStartTime: this.officialHolidayStartTime,
      officialHolidayEndDate: date2slash(this.officialHolidayEndDate),
      officialHolidayEndTime: this.officialHolidayEndTime,
      officialHolidayWorkHourPrice: this.officialHolidayWorkHourPrice,
      officialHolidayDescriptionEn: this.officialHolidayDescriptionEn,
      officialHolidayDescriptionAr: this.officialHolidayDescriptionAr,
      officialHolidayDescriptionUnd: this.officialHolidayDescriptionUnd,
      officialHolidayNotes: this.officialHolidayNotes,
    };

    try {
      let response = "";
      if (
        this.officialHolidayToken == "" ||
        this.officialHolidayToken == undefined
      ) {
        response = await axios.post(
          `/OfficialHolidays/AddOfficialHoliday`,
          data
        );
      } else {
        response = await axios.post(
          `/OfficialHolidays/UpdateOfficialHoliday`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveOfficialHoliday(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      officialHolidayToken: this.officialHolidayToken,
    };

    try {
      let response = await axios.post(
        `/OfficialHolidays/ArchiveOfficialHoliday`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
