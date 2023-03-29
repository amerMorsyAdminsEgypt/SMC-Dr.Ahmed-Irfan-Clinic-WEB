import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import OfficialHolidaysPlansSlideDetails from "@/models/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlansSlideDetails";

export default class OfficialHolidaysPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.officialHolidaysPlansToken = "";
    this.officialHolidaysPlansCode = "";
    this.officialHolidaysPlansNameAr = "";
    this.officialHolidaysPlansNameEn = "";
    this.officialHolidaysPlansNameUnd = "";
    this.officialHolidaysPlansNameCurrent = "";
    this.officialHolidaysPlansNote = "";
    this.dateTimeActionAdd = "";
    this.dateActionAdd = "";
    this.TimeActionAdd = "";
    this.officialHolidaysPlansArchiveStatus = "";
    this.officialHolidaysPlansSlidesDetailsData = [
      new OfficialHolidaysPlansSlideDetails(),
    ];
  }
  fillData(data) {
    this.officialHolidaysPlansToken = data.officialHolidaysPlansToken;
    this.officialHolidaysPlansCode = data.officialHolidaysPlansCode;
    this.officialHolidaysPlansNameAr = data.officialHolidaysPlansNameAr;
    this.officialHolidaysPlansNameEn = data.officialHolidaysPlansNameEn;
    this.officialHolidaysPlansNameUnd = data.officialHolidaysPlansNameUnd;
    this.officialHolidaysPlansNameCurrent =
      data.officialHolidaysPlansNameCurrent;
    this.officialHolidaysPlansNote = data.officialHolidaysPlansNote;
    this.dateTimeActionAdd = data.dateTimeActionAdd;
    this.dateActionAdd = data.dateActionAdd;
    this.TimeActionAdd = data.TimeActionAdd;
    this.officialHolidaysPlansArchiveStatus =
      data.officialHolidaysPlansArchiveStatus;
    this.officialHolidaysPlansSlidesDetailsData =
      data.officialHolidaysPlansSlidesDetailsData;
  }

  async getOfficialHolidaysPlanses(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/OfficialHolidaysPlans/GetOfficialHolidaysPlanses?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getOfficialHolidaysPlanDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/OfficialHolidaysPlans/GetOfficialHolidaysPlansDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&officialHolidaysPlansToken=${this.officialHolidaysPlansToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfOfficialHolidaysPlans(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/OfficialHolidaysPlans/GetDialogOfOfficialHolidaysPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateOfficialHolidaysPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      officialHolidaysPlansToken: this.officialHolidaysPlansToken,
      officialHolidaysPlansCode: this.officialHolidaysPlansCode,
      officialHolidaysPlansNameAr: this.officialHolidaysPlansNameAr,
      officialHolidaysPlansNameEn: this.officialHolidaysPlansNameEn,
      officialHolidaysPlansNameUnd: this.officialHolidaysPlansNameUnd,
      officialHolidaysPlansNote: this.officialHolidaysPlansNote,
      officialHolidaysPlansSlidesDetailsData:
        this.officialHolidaysPlansSlidesDetailsData,
    };

    try {
      let response = "";
      if (
        this.officialHolidaysPlansToken == "" ||
        this.officialHolidaysPlansToken == undefined
      ) {
        response = await axios.post(
          `/OfficialHolidaysPlans//AddOfficialHolidaysPlans`,
          data
        );
      } else {
        response = await axios.post(
          `/OfficialHolidaysPlans//UpdateOfficialHolidaysPlans`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveOfficialHolidaysPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      officialHolidaysPlansToken: this.officialHolidaysPlansToken,
    };

    try {
      let response = await axios.post(
        `/OfficialHolidaysPlans//ArchiveOfficialHolidaysPlans`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
