import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class AllowancesPlansSlideDetails {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.allowancesPlansSlidesDetailsToken = "";
    this.allowanceToken = "";
    this.allowanceNameCurrent = "";
    this.allowancesPlansToken = "";
    this.allowancesPlansNameCurrent = "";
    this.attendanceTypeToken = "";
    this.attendanceTypeNameCurrent = "";
    this.attendanceTypeNameEn = "";
    this.attendanceTypeNameAr = "";
    this.attendanceTypeNameUnd = "";
    this.allowancesValue = "";
    this.allowancesMaximumNumberInDay = "";
    this.allowancesMaximumNumberInMonth = "";
    this.allowancesMaximumNumberInYear = "";
    this.timeMethodCalcolateToken = "";
    this.timeMethodCalcolateNameCurrent = "";
    this.timeMethodCalcolateNameEn = "";
    this.timeMethodCalcolateNameAr = "";
    this.timeMethodCalcolateNameUnd = "";
    // this.dayTypeToken = ""; //
    // this.dayTypeNameCurrent = ""; //
    // this.dayTypeNameEn = ""; //
    // this.dayTypeNameAr = ""; //
    // this.dayTypeNameUnd = ""; //
    this.workShiftTimeFrom = "";
    this.workShiftTimeTo = "";
    this.workShiftDuration = "";
    this.dateTimeStart = "";
    this.dateTimeEnd = "";
    this.dateStart = "";
    this.dateEnd = "";
    this.totalTimeOfShift = "";
    this.beginningOfTheEntitlementInHours = "";
    this.beginningOfTheEntitlementInMinutes = "";
    this.beginningOfTheEntitlementInSeconds = "";
    this.allowancesPlansSlidesDetailsNote = "";
    this.allowancesPlansSlidesDetailsArchiveStatus = "";
  }
  fillData(data) {
    this.allowancesPlansSlidesDetailsToken =
      data.allowancesPlansSlidesDetailsToken;
    this.allowanceToken = data.allowanceToken;
    this.allowanceNameCurrent = data.allowanceNameCurrent;
    this.allowancesPlansToken = data.allowancesPlansToken;
    this.allowancesPlansNameCurrent = data.allowancesPlansNameCurrent;
    this.attendanceTypeToken = data.attendanceTypeToken;
    this.attendanceTypeNameCurrent = data.attendanceTypeNameCurrent;
    this.attendanceTypeNameEn = data.attendanceTypeNameEn;
    this.attendanceTypeNameAr = data.attendanceTypeNameAr;
    this.attendanceTypeNameUnd = data.attendanceTypeNameUnd;
    this.allowancesValue = data.allowancesValue;
    this.allowancesMaximumNumberInDay = data.allowancesMaximumNumberInDay;
    this.allowancesMaximumNumberInMonth = data.allowancesMaximumNumberInMonth;
    this.allowancesMaximumNumberInYear = data.allowancesMaximumNumberInYear;
    this.timeMethodCalcolateToken = data.timeMethodCalcolateToken;
    this.timeMethodCalcolateNameCurrent = data.timeMethodCalcolateNameCurrent;
    this.timeMethodCalcolateNameEn = data.timeMethodCalcolateNameEn;
    this.timeMethodCalcolateNameAr = data.timeMethodCalcolateNameAr;
    this.timeMethodCalcolateNameUnd = data.timeMethodCalcolateNameUnd;
    // this.dayTypeToken = data.dayTypeToken;
    // this.dayTypeNameCurrent = data.dayTypeNameCurrent;
    // this.dayTypeNameEn = data.dayTypeNameEn;
    // this.dayTypeNameAr = data.dayTypeNameAr;
    // this.dayTypeNameUnd = data.dayTypeNameUnd;
    this.workShiftTimeFrom = data.workShiftTimeFrom;
    this.workShiftTimeTo = data.workShiftTimeTo;
    this.workShiftDuration = data.workShiftDuration;
    this.dateTimeStart = data.dateTimeStart;
    this.dateTimeEnd = data.dateTimeEnd;
    this.dateStart = data.dateStart;
    this.dateEnd = data.dateEnd;
    this.totalTimeOfShift = data.totalTimeOfShift;
    this.beginningOfTheEntitlementInHours =
      data.beginningOfTheEntitlementInHours;
    this.beginningOfTheEntitlementInMinutes =
      data.beginningOfTheEntitlementInMinutes;
    this.beginningOfTheEntitlementInSeconds =
      data.beginningOfTheEntitlementInSeconds;
    this.allowancesPlansSlidesDetailsNote =
      data.allowancesPlansSlidesDetailsNote;
    this.allowancesPlansSlidesDetailsArchiveStatus =
      data.allowancesPlansSlidesDetailsArchiveStatus;
  }

  async getAllAllowancesPlansSlidesDetails(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/AllowancesPlansSlidesDetails/GetAllAllowancesPlansSlidesDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getAllowancesPlansSlidesDetailsDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/AllowancesPlansSlidesDetails/GetAllowancesPlansSlidesDetailsDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&allowancesPlansSlidesDetailsToken=${this.allowancesPlansSlidesDetailsToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateAllowancesPlansSlidesDetails(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      allowancesPlansSlidesDetailsToken: this.allowancesPlansSlidesDetailsToken,
      allowancesPlansToken: this.allowancesPlansToken,
      allowanceToken: this.allowanceToken,
      attendanceTypeToken: this.attendanceTypeToken,
      allowancesValue: this.allowancesValue,
      allowancesMaximumNumberInDay: this.allowancesMaximumNumberInDay,
      allowancesMaximumNumberInMonth: this.allowancesMaximumNumberInMonth,
      allowancesMaximumNumberInYear: this.allowancesMaximumNumberInYear,
      // dayTypeToken: this.dayTypeToken,
      workShiftTimeFrom: this.workShiftTimeFrom,
      workShiftTimeTo: this.workShiftTimeTo,
      timeMethodCalcolateToken: this.timeMethodCalcolateToken,
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      beginningOfTheEntitlementInHours: this.beginningOfTheEntitlementInHours,
      beginningOfTheEntitlementInMinutes:
        this.beginningOfTheEntitlementInMinutes,
      beginningOfTheEntitlementInSeconds:
        this.beginningOfTheEntitlementInSeconds,
      allowancesPlansSlidesDetailsNote: this.allowancesPlansSlidesDetailsNote,
    };

    try {
      let response = "";
      if (
        this.allowancesPlansSlidesDetailsToken == "" ||
        this.allowancesPlansSlidesDetailsToken == undefined
      ) {
        response = await axios.post(
          `/AllowancesPlansSlidesDetails//AddAllowancesPlansSlidesDetails`,
          data
        );
      } else {
        response = await axios.post(
          `/AllowancesPlansSlidesDetails//UpdatAllowancesPlansSlidesDetails`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveAllowancesPlansSlidesDetails(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      allowancesPlansSlidesDetailsToken: this.allowancesPlansSlidesDetailsToken,
    };

    try {
      let response = await axios.post(
        `/AllowancesPlansSlidesDetails//ArchiveAllowancesPlansSlidesDetails`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
