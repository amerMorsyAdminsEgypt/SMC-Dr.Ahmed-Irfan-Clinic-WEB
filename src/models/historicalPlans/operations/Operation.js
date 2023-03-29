import { PAGE_SIZE, STATUS } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";
import MainReservationData from "@/models/historicalPlans/MainReservationData";
import SurgriesHistoryDetilsBodyAnatomyData from "@/models/historicalPlans/operations/SurgriesHistoryDetilsBodyAnatomyData";

export default class Operation {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.surgeryHistoryToken = "";
    this.surgeryPlaceTypeToken = "";
    this.surgeryHistoryCode = "";
    this.surgeryToken = "";
    this.surgeryNameCurrent = "";
    this.surgeryNameAr = "";
    this.surgeryNameEn = "";
    this.surgeryNameUnd = "";
    this.reservationToken = "";
    this.employeeTokenInReport = "";
    this.employeeNameCurrentInReport = "";
    this.employeeJobTokenInReport = "";
    this.employeeJobNameCurrentInReport = "";
    this.employeeScientificDegreeTokenInReport = "";
    this.employeeScientificDegreeNameCurrentInReport = "";
    this.surgeryHistoryClientToken = "";
    this.surgeryHistoryClientNameCurrent = "";
    this.surgeryHistoryClientImagePath = "";
    this.surgeryHistoryClientBirthDate = "";
    this.surgeryHistoryClientAge = "";
    this.surgeryHistoryClientPhoneWithCC = "";
    this.surgeryHistoryDateTime = "";
    this.surgeryHistoryDate = "";
    this.surgeryHistoryTime = "";
    this.surgeryHistoryDescriptionCurrent = "";
    this.surgeryHistoryDescriptionAr = "";
    this.surgeryHistoryDescriptionEn = "";
    this.surgeryHistoryDescriptionUnd = "";
    this.surgeryHistoryReasonCurrent = "";
    this.surgeryHistoryReasonAr = "";
    this.surgeryHistoryReasonEn = "";
    this.surgeryHistoryReasonUnd = "";
    this.surgeryHistoryNotes = "";
    this.dateTimeAction = "";
    this.mainReservationData = new MainReservationData();
    this.surgriesHistoryDetilsBodyAnatomyData = [
      new SurgriesHistoryDetilsBodyAnatomyData(),
    ];
    this.paginationData = new PaginationData();
    this.dateFrom = "";
    this.dateTo = "";
    this.textSearch = "";
    this.sendTo = "";
  }
  fillData(data) {
    this.surgeryHistoryToken = data.surgeryHistoryToken;
    this.surgeryPlaceTypeToken = data.surgeryPlaceTypeToken ?? "";
    this.surgeryHistoryCode = data.surgeryHistoryCode;
    this.surgeryToken = data.surgeryToken;
    this.surgeryNameCurrent = data.surgeryNameCurrent;
    this.surgeryNameAr = data.surgeryNameAr;
    this.surgeryNameEn = data.surgeryNameEn;
    this.surgeryNameUnd = data.surgeryNameUnd;
    this.reservationToken = data.reservationToken;
    this.employeeTokenInReport = data.employeeTokenInReport;
    this.employeeNameCurrentInReport = data.employeeNameCurrentInReport;
    this.employeeJobTokenInReport = data.employeeJobTokenInReport;
    this.employeeJobNameCurrentInReport = data.employeeJobNameCurrentInReport;
    this.employeeScientificDegreeTokenInReport =
      data.employeeScientificDegreeTokenInReport;
    this.employeeScientificDegreeNameCurrentInReport =
      data.employeeScientificDegreeNameCurrentInReport;
    this.surgeryHistoryClientToken = data.surgeryHistoryClientToken;
    this.surgeryHistoryClientNameCurrent = data.surgeryHistoryClientNameCurrent;
    this.surgeryHistoryClientImagePath = data.surgeryHistoryClientImagePath;
    this.surgeryHistoryClientBirthDate = data.surgeryHistoryClientBirthDate;
    this.surgeryHistoryClientAge = data.surgeryHistoryClientAge;
    this.surgeryHistoryClientPhoneWithCC = data.surgeryHistoryClientPhoneWithCC;
    this.surgeryHistoryDateTime = data.surgeryHistoryDateTime;
    this.surgeryHistoryDate = data.surgeryHistoryDate;
    this.surgeryHistoryTime = data.surgeryHistoryTime;
    this.surgeryHistoryDescriptionCurrent =
      data.surgeryHistoryDescriptionCurrent;
    this.surgeryHistoryDescriptionAr = data.surgeryHistoryDescriptionAr;
    this.surgeryHistoryDescriptionEn = data.surgeryHistoryDescriptionEn;
    this.surgeryHistoryDescriptionUnd = data.surgeryHistoryDescriptionUnd;
    this.surgeryHistoryReasonCurrent = data.surgeryHistoryReasonCurrent;
    this.surgeryHistoryReasonAr = data.surgeryHistoryReasonAr;
    this.surgeryHistoryReasonEn = data.surgeryHistoryReasonEn;
    this.surgeryHistoryReasonUnd = data.surgeryHistoryReasonUnd;
    this.surgeryHistoryNotes = data.surgeryHistoryNotes;
    this.dateTimeAction = data.dateTimeAction;
    this.surgriesHistoryDetilsBodyAnatomyData =
      data.surgriesHistoryDetilsBodyAnatomyData;
  }

  async getAllMedicalOperations(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/SurgriesHistory/GetSurgriesHistory?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&surgeryHistoryClientToken=${this.surgeryHistoryClientToken}&reservationToken=${this.reservationToken}&surgeryToken=${this.surgeryToken}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&textSearch=${this.textSearch}&surgeryPlaceTypeToken=${this.surgeryPlaceTypeToken}`
      );
      this.paginationData = {
        totalPages: response.data.surgriesHistoryDataPagination.totalPages,
        totalItems: response.data.surgriesHistoryDataPagination.totalItems,
        countItemsInPage:
          response.data.surgriesHistoryDataPagination.countItemsInPage,
        selfPage: response.data.surgriesHistoryDataPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMedicalOperationDetalis(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/SurgriesHistory/GetSurgriesHistoryDetalis?language=${language}&userAuthorizeToken=${userAuthorizeToken}&surgeryHistoryToken=${this.surgeryHistoryToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
  async downloadMedicalOperation(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/SurgriesHistory/GetSurgriesHistoryReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&surgeryHistoryToken=${this.surgeryHistoryToken}&sendTo=${this.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPathMedicine);
      }
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMedicalOperation(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      surgeryHistoryToken: this.surgeryHistoryToken,
      surgeryToken: this.surgeryToken,
      surgeryHistoryClientToken: this.surgeryHistoryClientToken,
      reservationToken: this.reservationToken,
      employeeTokenInReport: this.employeeTokenInReport,
      surgeryHistoryDateTime: `${this.surgeryHistoryDate} ${this.surgeryHistoryTime}`,
      surgeryHistoryDescriptionAr: this.surgeryHistoryDescriptionAr,
      surgeryHistoryDescriptionEn: this.surgeryHistoryDescriptionEn,
      surgeryHistoryDescriptionUnd: this.surgeryHistoryDescriptionUnd,
      surgeryHistoryReasonAr: this.surgeryHistoryReasonAr,
      surgeryHistoryReasonEn: this.surgeryHistoryReasonEn,
      surgeryHistoryReasonUnd: this.surgeryHistoryReasonUnd,
      surgeryHistoryNotes: this.surgeryHistoryNotes,
      surgriesHistoryDetilsBodyAnatomyData:
        this.surgriesHistoryDetilsBodyAnatomyData,
    };

    try {
      let response = "";
      if (
        this.surgeryHistoryToken == "" ||
        this.surgeryHistoryToken == undefined
      ) {
        response = await axios.post(
          `/SurgriesHistory/AddSurgriesHistory`,
          data
        );
      } else {
        response = await axios.post(
          `/SurgriesHistory/UpdateSurgriesHistory`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveMedicationPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      surgeryHistoryToken: this.surgeryHistoryToken,
    };

    try {
      let response = await axios.post(
        `/SurgriesHistory/ArchiveSurgriesHistory`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
