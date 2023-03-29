import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class Requirement {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.requirementToken = "";
    this.requirementNameCurrent = "";
    this.requirementNameAr = "";
    this.requirementNameEn = "";
    this.requirementNameUnd = "";
    this.requirementTypeToken = "";
    this.requirementTypeNameCurrent = "";
    this.requirementTypeNameAr = "";
    this.requirementTypeNameEn = "";
    this.requirementTypeNameUnd = "";
    this.requirementNote = "";
    this.requirementArchiveStatus = "";
  }
  fillData(data) {
    this.requirementToken = data.requirementToken;
    this.requirementNameCurrent = data.requirementNameCurrent;
    this.requirementNameAr = data.requirementNameAr;
    this.requirementNameEn = data.requirementNameEn;
    this.requirementNameUnd = data.requirementNameUnd;
    this.requirementTypeToken = data.requirementTypeToken;
    this.requirementTypeNameCurrent = data.requirementTypeNameCurrent;
    this.requirementTypeNameAr = data.requirementTypeNameAr;
    this.requirementTypeNameEn = data.requirementTypeNameEn;
    this.requirementTypeNameUnd = data.requirementTypeNameUnd;
    this.requirementNote = data.requirementNote;
    this.requirementArchiveStatus = data.requirementArchiveStatus;
  }

  async getAllRequirements(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/Requirements/GetAllRequirements?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getRequirementDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Requirements/GetRequirementDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&requirementToken=${this.requirementToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfRequirements(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Requirements/GetDialogOfRequirements?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&requirementTypeToken=${this.requirementTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateRequirement(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      requirementToken: this.requirementToken,
      requirementTypeToken: this.requirementTypeToken,
      requirementNameAr: this.requirementNameAr,
      requirementNameEn: this.requirementNameEn,
      requirementNameUnd: this.requirementNameUnd,
      requirementNote: this.requirementNote,
    };

    try {
      let response = "";
      if (this.requirementToken == "" || this.requirementToken == undefined) {
        response = await axios.post(`/Requirements/AddRequirement`, data);
      } else {
        response = await axios.post(`/Requirements/UpdateRequirement`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveRequirement(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      requirementToken: this.requirementToken,
    };

    try {
      let response = await axios.post(`/Requirements/ArchiveRequirement`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
