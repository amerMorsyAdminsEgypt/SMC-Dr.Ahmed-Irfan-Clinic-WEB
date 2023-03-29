import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";

export default class DoctorNotes {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.doctorNoteToken = "";
    this.doctorNoteNameCurrent = "";
    this.doctorNoteNameEn = "";
    this.doctorNoteNameAr = "";
    this.doctorNoteNameUnd = "";
    this.employeeTokenInReport = "";
    this.employeeCodeInReport = "";
    this.employeeImagePathInReport = "";
    this.employeeNameCurrentInReport = "";
    this.employeeJobTokenInReport = "";
    this.employeeJobNameCurrentInReport = "";
    this.employeeScientificDegreeTokenInReport = "";
    this.employeeScientificDegreeNameCurrentInReport = "";
    this.clientToken = "";
    this.clientNameCurrent = "";
    this.showTypeToken = "";
    this.showTypeNameCurrent = "";
    this.showTypeNameAr = "";
    this.showTypeNameEn = "";
    this.showTypeNameUnd = "";
    this.doctorNoteDateTime = "";
    this.doctorNoteDate = "";
    this.doctorNoteDay = "";
    this.doctorNoteTime = "";
    this.employeeTokenAdded = "";
    this.employeeTokenUpdate = "";
    this.doctorNoteArchiveStatus = "";
    this.paginationData = new PaginationData();
    this.textSearch = "";
    this.sectorToken = "";
  }
  fillData(data) {
    this.doctorNoteToken = data.doctorNoteToken;
    this.doctorNoteNameCurrent = data.doctorNoteNameCurrent;
    this.doctorNoteNameEn = data.doctorNoteNameEn;
    this.doctorNoteNameAr = data.doctorNoteNameAr;
    this.doctorNoteNameUnd = data.doctorNoteNameUnd;
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
    this.clientToken = data.clientToken;
    this.clientNameCurrent = data.clientNameCurrent;
    this.showTypeToken = data.showTypeToken;
    this.showTypeNameCurrent = data.showTypeNameCurrent;
    this.showTypeNameAr = data.showTypeNameAr;
    this.showTypeNameEn = data.showTypeNameEn;
    this.showTypeNameUnd = data.showTypeNameUnd;
    this.doctorNoteDateTime = data.doctorNoteDateTime;
    this.doctorNoteDate = data.doctorNoteDate;
    this.doctorNoteDay = data.doctorNoteDay;
    this.doctorNoteTime = data.doctorNoteTime;
    this.employeeTokenAdded = data.employeeTokenAdded;
    this.employeeTokenUpdate = data.employeeTokenUpdate;
    this.doctorNoteArchiveStatus = data.doctorNoteArchiveStatus;
  }

  async getAllDoctorNotes(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/DoctorNotes/GetAllDoctorNotes?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&clientToken=${this.clientToken}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages: response.data.doctorNotesPagination.totalPages,
        totalItems: response.data.doctorNotesPagination.totalItems,
        countItemsInPage: response.data.doctorNotesPagination.countItemsInPage,
        selfPage: response.data.doctorNotesPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDoctorNoteDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/DoctorNotes/GetDoctorNoteDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&doctorNoteToken=${this.doctorNoteToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
  async getDialogOfDoctorNotes(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/DoctorNotes/GetDialogOfDoctorNotes?language=${language}&userAuthorizeToken=${userAuthorizeToken}&sectorToken=${this.sectorToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateDoctorNote(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      doctorNoteToken: this.doctorNoteToken,
      employeeTokenInReport: this.employeeTokenInReport,
      clientToken: this.clientToken,
      doctorNoteNameEn: this.doctorNoteNameEn,
      doctorNoteNameAr: this.doctorNoteNameAr,
      doctorNoteNameUnd: this.doctorNoteNameUnd,
      showTypeToken: this.showTypeToken,
    };

    try {
      let response = "";
      if (this.doctorNoteToken == "" || this.doctorNoteToken == undefined) {
        response = await axios.post(`/DoctorNotes/AddDoctorNote`, data);
      } else {
        response = await axios.post(`/DoctorNotes/UpdateDoctorNote`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveDoctorNote(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      doctorNoteToken: this.doctorNoteToken,
    };

    try {
      let response = await axios.post(`/DoctorNotes/ArchiveDoctorNote`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
