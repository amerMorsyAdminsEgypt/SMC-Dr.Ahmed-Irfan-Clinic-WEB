import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class EstablishmentYearSetting {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.establishmentYearSettingToken = "";
    this.establishmentYearSettingCode = "";
    this.establishmentToken = "EST-1";
    this.establishmentNameCurrent = "";
    this.establishmentYearSettingNameEn = "";
    this.establishmentYearSettingNameAr = "";
    this.establishmentYearSettingNameUnd = "";
    this.establishmentYearSettingNameCurrent = "";
    this.year = "";
    this.employeeYearStart = "";
    this.employeeYearEnd = "";
    this.financialYearStart = "";
    this.financialYearEnd = "";
    this.establishmentYearSettingNote = "";
    this.dateTimeActionAdd = "";
    this.dateActionAdd = "";
    this.TimeActionAdd = "";
    this.establishmentYearSettingArchiveStatus = "";
  }
  fillData(data) {
    this.establishmentYearSettingToken = data.establishmentYearSettingToken;
    this.establishmentYearSettingCode = data.establishmentYearSettingCode;
    this.establishmentToken = data.establishmentToken;
    this.establishmentNameCurrent = data.establishmentNameCurrent;
    this.establishmentYearSettingNameEn = data.establishmentYearSettingNameEn;
    this.establishmentYearSettingNameAr = data.establishmentYearSettingNameAr;
    this.establishmentYearSettingNameUnd = data.establishmentYearSettingNameUnd;
    this.establishmentYearSettingNameCurrent =
      data.establishmentYearSettingNameCurrent;
    this.year = data.year;
    this.employeeYearStart = data.employeeYearStart;
    this.employeeYearEnd = data.employeeYearEnd;
    this.financialYearStart = data.financialYearStart;
    this.financialYearEnd = data.financialYearEnd;
    this.establishmentYearSettingNote = data.establishmentYearSettingNote;
    this.dateTimeActionAdd = data.dateTimeActionAdd;
    this.dateActionAdd = data.dateActionAdd;
    this.TimeActionAdd = data.TimeActionAdd;
    this.establishmentYearSettingArchiveStatus =
      data.establishmentYearSettingArchiveStatus;
  }

  async getAllEstablishmentYearSettings(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/EstablishmentYearSetting/GetAllEstablishmentYearSetting?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getEstablishmentYearSettingDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/EstablishmentYearSetting/GetEstablishmentYearSettingDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&establishmentYearSettingToken=${this.establishmentYearSettingToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfEstablishmentYearSettings(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/EstablishmentYearSetting/GetDialogOfEstablishmentYearSetting?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateEstablishmentYearSetting(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      establishmentYearSettingToken: this.establishmentYearSettingToken,
      establishmentToken: this.establishmentToken,
      establishmentYearSettingCode: this.establishmentYearSettingCode,
      establishmentYearSettingNameEn: this.establishmentYearSettingNameEn,
      establishmentYearSettingNameAr: this.establishmentYearSettingNameAr,
      establishmentYearSettingNameUnd: this.establishmentYearSettingNameUnd,
      year: this.year,
      employeeYearStart: this.employeeYearStart,
      employeeYearEnd: this.employeeYearEnd,
      financialYearStart: this.financialYearStart,
      financialYearEnd: this.financialYearEnd,
      establishmentYearSettingNote: this.establishmentYearSettingNote,
    };

    try {
      let response = "";
      if (
        this.establishmentYearSettingToken == "" ||
        this.establishmentYearSettingToken == undefined
      ) {
        response = await axios.post(
          `/EstablishmentYearSetting/AddEstablishmentYearSetting`,
          data
        );
      } else {
        response = await axios.post(
          `/EstablishmentYearSetting/UpdateEstablishmentYearSetting`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveEstablishmentYearSetting(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      establishmentYearSettingToken: this.establishmentYearSettingToken,
    };

    try {
      let response = await axios.post(
        `/EstablishmentYearSetting/ArchiveEstablishmentYearSetting`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
