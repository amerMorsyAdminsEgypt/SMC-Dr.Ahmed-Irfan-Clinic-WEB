import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class OfficialHolidaysPlansSlideDetails {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.officialHolidaysPlansSlidesDetailsToken = "";
    this.officialHolidaysPlansToken = "";
    this.officialHolidaysPlansNameCurrent = "";
    this.officialHolidayToken = "";
    this.officialHolidayNameCurrent = "";
    this.officialHolidaysPlansSlidesDetailsNote = "";
    this.officialHolidaysPlansSlidesDetailsArchiveStatus = "";
  }
  fillData(data) {
    this.officialHolidaysPlansSlidesDetailsToken =
      data.officialHolidaysPlansSlidesDetailsToken;
    this.officialHolidaysPlansToken = data.officialHolidaysPlansToken;
    this.officialHolidaysPlansNameCurrent =
      data.officialHolidaysPlansNameCurrent;
    this.officialHolidayToken = data.officialHolidayToken;
    this.officialHolidayNameCurrent = data.officialHolidayNameCurrent;
    this.officialHolidaysPlansSlidesDetailsNote =
      data.officialHolidaysPlansSlidesDetailsNote;
    this.officialHolidaysPlansSlidesDetailsArchiveStatus =
      data.officialHolidaysPlansSlidesDetailsArchiveStatus;
  }

  async getAllOfficialHolidaysPlansSlidesDetails(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/OfficialHolidaysPlansSlidesDetails/GetAllOfficialHolidaysPlansSlidesDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getOfficialHolidaysPlansSlidesDetailsDetails(
    language,
    userAuthorizeToken
  ) {
    try {
      let response = await axios.get(
        `/OfficialHolidaysPlansSlidesDetails/GetOfficialHolidaysPlansSlidesDetailsDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&officialHolidaysPlansSlidesDetailsToken=${this.officialHolidaysPlansSlidesDetailsToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateOfficialHolidaysPlansSlidesDetails(
    language,
    userAuthorizeToken
  ) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      officialHolidaysPlansSlidesDetailsToken:
        this.officialHolidaysPlansSlidesDetailsToken,
      officialHolidaysPlansToken: this.officialHolidaysPlansToken,
      officialHolidayToken: this.officialHolidayToken,
      balancesPlansSlidesDetailsNote: this.balancesPlansSlidesDetailsNote,
    };

    try {
      let response = "";
      if (
        this.officialHolidaysPlansSlidesDetailsToken == "" ||
        this.officialHolidaysPlansSlidesDetailsToken == undefined
      ) {
        response = await axios.post(
          `/OfficialHolidaysPlansSlidesDetails//AddOfficialHolidaysPlansSlidesDetails`,
          data
        );
      } else {
        response = await axios.post(
          `/OfficialHolidaysPlansSlidesDetails//UpdatOfficialHolidaysPlansSlidesDetails`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveOfficialHolidaysPlansSlidesDetails(
    language,
    userAuthorizeToken
  ) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      officialHolidaysPlansSlidesDetailsToken:
        this.officialHolidaysPlansSlidesDetailsToken,
    };

    try {
      let response = await axios.post(
        `/OfficialHolidaysPlansSlidesDetails//ArchiveOfficialHolidaysPlansSlidesDetails`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
