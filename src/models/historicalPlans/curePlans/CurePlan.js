import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";

export default class CurePlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.curePlanToken = "";
    this.employeeCodeInReport = "";
    this.employeeImagePathInReport = "";
    this.employeeTokenInReport = "";
    this.employeeNameCurrentInReport = "";
    this.employeeJobTokenInReport = "";
    this.employeeJobNameCurrentInReport = "";
    this.employeeScientificDegreeTokenInReport = "";
    this.employeeScientificDegreeNameCurrentInReport = "";
    this.curePlanDescriptionCurrent = "";
    this.clientToken = "";
    this.clientNameCurrent = "";
    this.curePlanDescriptionEn = "";
    this.curePlanDescriptionAr = "";
    this.curePlanDescriptionUnd = "";
    this.curePlanDateTimeFrom = "";
    this.curePlanDateFrom = "";
    this.curePlanTimeFrom = "";
    this.curePlanDateTimeTo = "";
    this.curePlanDateTo = "";
    this.curePlanTimeTo = "";
    this.showTypeToken = "";
    this.showTypeNameCurrent = "";
    this.showTypeNameAr = "";
    this.showTypeNameEn = "";
    this.showTypeNameUnd = "";
    this.curePlanDateTime = "";
    this.curePlanDate = "";
    this.curePlanDayName = "";
    this.curePlanTime = "";
    this.employeeTokenAdded = "";
    this.employeeTokenUpdate = "";
    this.curePlanArchiveStatus = "";
    this.paginationData = new PaginationData();
    this.textSearch = "";
    this.dateFrom = "";
    this.timeFrom = "";
    this.dateTo = "";
    this.timeTo = "";
  }
  fillData(data) {
    this.curePlanToken = data.curePlanToken;
    this.employeeCodeInReport = data.employeeCodeInReport;
    this.employeeImagePathInReport = data.employeeImagePathInReport;
    this.employeeTokenInReport = data.employeeTokenInReport;
    this.employeeNameCurrentInReport = data.employeeNameCurrentInReport;
    this.employeeJobTokenInReport = data.employeeJobTokenInReport;
    this.employeeJobNameCurrentInReport = data.employeeJobNameCurrentInReport;
    this.employeeScientificDegreeTokenInReport =
      data.employeeScientificDegreeTokenInReport;
    this.employeeScientificDegreeNameCurrentInReport =
      data.employeeScientificDegreeNameCurrentInReport;
    this.curePlanDescriptionCurrent = data.curePlanDescriptionCurrent;
    this.clientToken = data.clientToken;
    this.clientNameCurrent = data.clientNameCurrent;
    this.curePlanDescriptionEn = data.curePlanDescriptionEn;
    this.curePlanDescriptionAr = data.curePlanDescriptionAr;
    this.curePlanDescriptionUnd = data.curePlanDescriptionUnd;
    this.curePlanDateTimeFrom = data.curePlanDateTimeFrom;
    this.curePlanDateFrom = data.curePlanDateFrom;
    this.curePlanTimeFrom = data.curePlanTimeFrom;
    this.curePlanDateTimeTo = data.curePlanDateTimeTo;
    this.curePlanDateTo = data.curePlanDateTo;
    this.curePlanTimeTo = data.curePlanTimeTo;
    this.showTypeToken = data.showTypeToken;
    this.showTypeNameCurrent = data.showTypeNameCurrent;
    this.showTypeNameAr = data.showTypeNameAr;
    this.showTypeNameEn = data.showTypeNameEn;
    this.showTypeNameUnd = data.showTypeNameUnd;
    this.curePlanDateTime = data.curePlanDateTime;
    this.curePlanDate = data.curePlanDate;
    this.curePlanDayName = data.curePlanDayName;
    this.curePlanTime = data.curePlanTime;
    this.employeeTokenAdded = data.employeeTokenAdded;
    this.employeeTokenUpdate = data.employeeTokenUpdate;
    this.curePlanArchiveStatus = data.curePlanArchiveStatus;
  }

  async getCurePlans(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/CurePlans/GetAllCurePlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&clientToken=${this.clientToken}&employeeTokenInReport=${this.employeeTokenInReport}&showTypeToken=${this.showTypeToken}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages: response.data.curePlansPagination.totalPages,
        totalItems: response.data.curePlansPagination.totalItems,
        countItemsInPage: response.data.curePlansPagination.countItemsInPage,
        selfPage: response.data.curePlansPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getCurePlanDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/CurePlans/GetCurePlanDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&curePlanToken=${this.curePlanToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateCurePlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      curePlanToken: this.curePlanToken,
      employeeTokenInReport: this.employeeTokenInReport,
      curePlanDescriptionEn: this.curePlanDescriptionEn,
      curePlanDescriptionAr: this.curePlanDescriptionAr,
      curePlanDescriptionUnd: this.curePlanDescriptionUnd,
      clientToken: this.clientToken,
      showTypeToken: this.showTypeToken,
    };

    if (this.curePlanDateFrom && this.curePlanTimeFrom) {
      data.curePlanDateTimeFrom =
        this.curePlanDateFrom + " " + this.curePlanTimeFrom;
    } else {
      data.curePlanDateTimeFrom = "";
    }

    if (this.curePlanDateTo && this.curePlanTimeTo) {
      data.curePlanDateTimeTo = this.curePlanDateTo + " " + this.curePlanTimeTo;
    } else {
      data.curePlanDateTimeTo = "";
    }

    try {
      let response = "";
      if (this.curePlanToken == "" || this.curePlanToken == undefined) {
        response = await axios.post(`/CurePlans/AddCurePlan`, data);
      } else {
        response = await axios.post(`/CurePlans/UpdateCurePlan`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveCurePlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      curePlanToken: this.curePlanToken,
    };

    try {
      let response = await axios.post(`/CurePlans/ArchiveCurePlan`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
