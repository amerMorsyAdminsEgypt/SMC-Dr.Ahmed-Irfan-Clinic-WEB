import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";

export default class AddictiveStuffClient {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.addictiveStuffClientToken = "";
    this.clientToken = "";
    this.clientNameCurrent = "";
    this.addictiveStuffToken = "";
    this.addictiveStuffNameCurrent = "";
    this.addictiveStuffTypeToken = "";
    this.addictiveStuffTypeNameCurrent = "";
    this.addictiveStuffClientNotes = "";
    this.employeeTokenInReport = "";
    this.employeeCodeInReport = "";
    this.employeeImagePathInReport = "";
    this.employeeNameCurrentInReport = "";
    this.employeeJobTokenInReport = "";
    this.employeeJobNameCurrentInReport = "";
    this.employeeScientificDegreeTokenInReport = "";
    this.employeeScientificDegreeNameCurrentInReport = "";
    this.employeeTokenAdded = "";
    this.employeeTokenUpdate = "";
    this.recoveryState = false;
    this.recoveryDate = "";
    this.recoveryNotes = "";
    this.actionDateTime = "";
    this.actionDate = "";
    this.actionDayName = "";
    this.actionTime = "";
    this.addictiveStuffClientArchiveStatus = "";
    this.injuryDate = "";
    this.InjuryDetailsCurrent = "";
    this.InjuryDetailsAr = "";
    this.InjuryDetailsEn = "";
    this.InjuryDetailsUnd = "";
    this.InjuryReasonCurrent = "";
    this.InjuryReasonAr = "";
    this.InjuryReasonEn = "";
    this.InjuryReasonUnd = "";
    this.InjurySyndromeCurrent = "";
    this.InjurySyndromeAr = "";
    this.InjurySyndromeEn = "";
    this.InjurySyndromeUnd = "";
    this.InjuryTreatmentCurrent = "";
    this.InjuryTreatmentAr = "";
    this.InjuryTreatmentEn = "";
    this.InjuryTreatmentUnd = "";
    this.injuryDurationToNow = "";
    this.treatmentDuration = "";
    this.paginationData = new PaginationData();
    this.textSearch = "";
    this.sendTo = "";
  }
  fillData(data) {
    this.addictiveStuffClientToken = data.addictiveStuffClientToken;
    this.clientToken = data.clientToken;
    this.clientNameCurrent = data.clientNameCurrent;
    this.addictiveStuffToken = data.addictiveStuffToken;
    this.addictiveStuffNameCurrent = data.addictiveStuffNameCurrent;
    this.addictiveStuffTypeToken = data.addictiveStuffTypeToken;
    this.addictiveStuffTypeNameCurrent = data.addictiveStuffTypeNameCurrent;
    this.addictiveStuffClientNotes = data.addictiveStuffClientNotes;
    this.employeeTokenInReport = data.employeeTokenInReport;
    this.employeeCodeInReport = data.employeeCodeInReport;
    this.employeeImagePathInReport = data.employeeImagePathInReport;
    this.employeeNameCurrentInReport = data.employeeNameCurrentInReport;
    this.employeeJobTokenInReport = data.employeeJobTokenInReport;
    this.employeeJobNameCurrentInReport = data.employeeJobNameCurrentInReport;
    this.employeeScientificDegreeTokenInReport =
      data.employeeScientificDegreeTokenInReport;
    this.employeeScientificDegreeNameCurrentInReport =
      data.employeeScientificDegreeNameCurrentInReport;
    this.employeeTokenAdded = data.employeeTokenAdded;
    this.employeeTokenUpdate = data.employeeTokenUpdate;
    this.recoveryState = data.recoveryState;
    this.recoveryDate = data.recoveryDate;
    this.recoveryNotes = data.recoveryNotes;
    this.actionDateTime = data.actionDateTime;
    this.actionDate = data.actionDate;
    this.actionDayName = data.actionDayName;
    this.actionTime = data.actionTime;
    this.addictiveStuffClientArchiveStatus =
      data.addictiveStuffClientArchiveStatus;
    this.injuryDate = data.injuryDate;
    this.InjuryDetailsCurrent = data.InjuryDetailsCurrent;
    this.InjuryDetailsAr = data.InjuryDetailsAr;
    this.InjuryDetailsEn = data.InjuryDetailsEn;
    this.InjuryDetailsUnd = data.InjuryDetailsUnd;
    this.InjuryReasonCurrent = data.InjuryReasonCurrent;
    this.InjuryReasonAr = data.InjuryReasonAr;
    this.InjuryReasonEn = data.InjuryReasonEn;
    this.InjuryReasonUnd = data.InjuryReasonUnd;
    this.InjurySyndromeCurrent = data.InjurySyndromeCurrent;
    this.InjurySyndromeAr = data.InjurySyndromeAr;
    this.InjurySyndromeEn = data.InjurySyndromeEn;
    this.InjurySyndromeUnd = data.InjurySyndromeUnd;
    this.InjuryTreatmentCurrent = data.InjuryTreatmentCurrent;
    this.InjuryTreatmentAr = data.InjuryTreatmentAr;
    this.InjuryTreatmentEn = data.InjuryTreatmentEn;
    this.InjuryTreatmentUnd = data.InjuryTreatmentUnd;
    this.injuryDurationToNow = data.injuryDurationToNow;
    this.treatmentDuration = data.treatmentDuration;
  }

  async getAddictiveStuffClients(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/AddictiveStuffClient/GetAllAddictiveStuffClient?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&clientToken=${this.clientToken}&employeeTokenInReport=${this.employeeTokenInReport}&addictiveStuffTypeToken=${this.addictiveStuffTypeToken}&clientToken=${this.clientToken}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages: response.data.addictiveStuffientPagination.totalPages,
        totalItems: response.data.addictiveStuffientPagination.totalItems,
        countItemsInPage:
          response.data.addictiveStuffientPagination.countItemsInPage,
        selfPage: response.data.addictiveStuffientPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getAddictiveStuffClientDetalis(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/AddictiveStuffClient/GetAddictiveStuffClientDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&addictiveStuffClientToken=${this.addictiveStuffClientToken}&sendTo=${this.sendTo}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateAddictiveStuffClient(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      addictiveStuffClientToken: this.addictiveStuffClientToken,
      clientToken: this.clientToken,
      addictiveStuffToken: this.addictiveStuffToken,
      addictiveStuffClientNotes: this.addictiveStuffClientNotes,
      employeeTokenInReport: this.employeeTokenInReport,
      //injury Data
      injuryDate: this.injuryDate,
      InjuryDetailsAr: this.InjuryDetailsAr,
      InjuryDetailsEn: this.InjuryDetailsEn,
      InjuryDetailsUnd: this.InjuryDetailsUnd,
      InjuryReasonAr: this.InjuryReasonAr,
      InjuryReasonEn: this.InjuryReasonEn,
      InjuryReasonUnd: this.InjuryReasonUnd,
      InjurySyndromeAr: this.InjurySyndromeAr,
      InjurySyndromeEn: this.InjurySyndromeEn,
      InjurySyndromeUnd: this.InjurySyndromeUnd,
      InjuryTreatmentAr: this.InjuryTreatmentAr,
      InjuryTreatmentEn: this.InjuryTreatmentEn,
      InjuryTreatmentUnd: this.InjuryTreatmentUnd,
      //recovery Data
      recoveryState: this.recoveryState,
      recoveryDate: this.recoveryDate,
      recoveryNotes: this.recoveryNotes,
    };

    if (!data.recoveryState) {
      data.recoveryDate = "";
      data.recoveryNotes = "";
    }

    try {
      let response = "";
      if (
        this.addictiveStuffClientToken == "" ||
        this.addictiveStuffClientToken == undefined
      ) {
        response = await axios.post(
          `/AddictiveStuffClient/AddAddictiveStuffClient`,
          data
        );
      } else {
        response = await axios.post(
          `/AddictiveStuffClient/UpdateAddictiveStuffClient`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveAddictiveStuffClient(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      addictiveStuffClientToken: this.addictiveStuffClientToken,
    };

    try {
      let response = await axios.post(
        `/AddictiveStuffClient/ArchiveAddictiveStuffClient`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
