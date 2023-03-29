import axios from "axios";
import { PAGE_SIZE } from "@/utils/constants";

export default class OfficeTime {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.officeTimeToken = "";
    this.officeTimeCode = "";
    this.branchToken = "";
    this.branchNameCurrent = "";
    this.buildingToken = "";
    this.buildingNameCurrent = "";
    this.floorToken = "";
    this.floorNameCurrent = "";
    this.chamberToken = "";
    this.chamberNameCurrent = "";
    this.generalSpecialtyToken = "";
    this.generalSpecialtyNameCurrent = "";
    this.officeToken = "";
    this.officeNameCurrent = "";
    this.specialSpecialtyToken = "";
    this.specialSpecialtyNameCurrent = "";
    this.employeeToken = "";
    this.employeeNameCurrent = "";
    this.employeeJobTokn = "";
    this.employeeJobNameCurrent = "";
    this.timeNameCollection = "";
    this.timeNameCurrent = "";
    this.timeNameAr = "";
    this.timeNameEn = "";
    this.timeNameUnd = "";
    this.officeOpenTime = "";
    this.officeCloseTime = "";
    this.dayToken = "";
    this.dayNameCurrent = "";
    this.dayNameAr = "";
    this.dayNameEn = "";
    this.dayNameUnd = "";
    this.officeTimeNotes = "";
    this.reservationShowStatus = "";
    this.officeTimeArchiveStatus = "";
    this.textSearch = "";
    // this.serviceResponsiblePercentage = 0;
  }
  fillData(data) {
    this.officeTimeToken = data.officeTimeToken;
    this.officeTimeCode = data.officeTimeCode;
    this.branchToken = data.branchToken;
    this.branchNameCurrent = data.branchNameCurrent;
    this.buildingToken = data.buildingToken;
    this.buildingNameCurrent = data.buildingNameCurrent;
    this.floorToken = data.floorToken;
    this.floorNameCurrent = data.floorNameCurrent;
    this.chamberToken = data.chamberToken;
    this.chamberNameCurrent = data.chamberNameCurrent;
    this.generalSpecialtyToken = data.generalSpecialtyToken;
    this.generalSpecialtyNameCurrent = data.generalSpecialtyNameCurrent;
    this.officeToken = data.officeToken;
    this.officeNameCurrent = data.officeNameCurrent;
    this.specialSpecialtyToken = data.specialSpecialtyToken;
    this.specialSpecialtyNameCurrent = data.specialSpecialtyNameCurrent;
    this.employeeToken = data.employeeToken;
    this.employeeNameCurrent = data.employeeNameCurrent;
    this.employeeJobTokn = data.employeeJobTokn;
    this.employeeJobNameCurrent = data.employeeJobNameCurrent;
    this.timeNameCollection = data.timeNameCollection;
    this.timeNameCurrent = data.timeNameCurrent;
    this.timeNameAr = data.timeNameAr;
    this.timeNameEn = data.timeNameEn;
    this.timeNameUnd = data.timeNameUnd;
    this.officeOpenTime = data.officeOpenTime;
    this.officeCloseTime = data.officeCloseTime;
    this.dayToken = data.dayToken;
    this.dayNameCurrent = data.dayNameCurrent;
    this.dayNameAr = data.dayNameAr;
    this.dayNameEn = data.dayNameEn;
    this.dayNameUnd = data.dayNameUnd;
    this.officeTimeNotes = data.officeTimeNotes;
    this.reservationShowStatus = data.reservationShowStatus;
    this.officeTimeArchiveStatus = data.officeTimeArchiveStatus;
    // this.serviceResponsiblePercentage = data.serviceResponsiblePercentage ?? 0;
  }

  async GetAllOfficesTimes(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/OfficesTimes/GetAllOfficesTimes?language=${language}&userAuthorizeToken=${userAuthorizeToken}&paginationStatus=true&page=${selfPage}&pageSize=${PAGE_SIZE}&textSearch=${textSearch}&branchTimeArchiveStatus=false&filterStatus=false&reservationShowStatus=${this.reservationShowStatus}&dayToken=${this.dayToken}&branchToken=${this.branchToken}&buildingToken=${this.buildingToken}&floorToken=${this.floorToken}&chamberToken=${this.chamberToken}&generalSpecialtyToken=${this.generalSpecialtyToken}&specialSpecialtyToken=${this.specialSpecialtyToken}&employeeToken=${this.employeeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getOfficeTimeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/OfficesTimes/GetOfficeTimeDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&officeTimeToken=${this.officeTimeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfOfficesTimes(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/OfficesTimes/GetDialogOfOfficesTimes?language=${language}&userAuthorizeToken=${userAuthorizeToken}&reservationShowStatus=true&filterStatus=true&dayToken=${this.dayToken}&branchToken=${this.branchToken}&buildingToken=${this.buildingToken}&floorToken=${this.floorToken}&chamberToken=${this.chamberToken}&generalSpecialtyToken=${this.generalSpecialtyToken}&specialSpecialtyToken=${this.specialSpecialtyToken}&employeeToken=${this.employeeToken}&textSearch=${this.textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateOfficeTime(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      officeTimeToken: this.officeTimeToken,
      employeeToken: this.employeeToken,
      officeToken: this.officeToken,
      dayToken: this.dayToken,
      officeOpenTime: this.officeOpenTime,
      officeCloseTime: this.officeCloseTime,
      officeTimeNotes: this.officeTimeNotes,
      reservationShowStatus: this.reservationShowStatus,
      // serviceResponsiblePercentage: this.serviceResponsiblePercentage,
    };

    //#region validation
    // let validation = await this.validFloor();
    // if (validation.data.status != STATUS.SUCCESS) return validation;
    //#endregion validation

    try {
      let response = "";
      if (this.officeTimeToken == "" || this.officeTimeToken == undefined) {
        response = await axios.post(`/OfficesTimes/AddOfficeTime`, data);
      } else {
        response = await axios.post(`/OfficesTimes/UpdateOfficeTime`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveOfficeTime(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      officeTimeToken: this.officeTimeToken,
    };

    try {
      let response = await axios.post(`/OfficesTimes/ArchiveOfficeTime`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
