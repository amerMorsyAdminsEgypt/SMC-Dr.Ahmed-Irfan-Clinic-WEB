import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class Allowance {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.allowanceToken = "";
    this.allowanceNameCurrent = "";
    this.allowanceNameEn = "";
    this.allowanceNameAr = "";
    this.allowanceNameUnd = "";
    this.allowanceDescriptionCurrent = "";
    this.allowanceDescriptionEn = "";
    this.allowanceDescriptionAr = "";
    this.allowanceDescriptionUnd = "";
    this.allowanceNotes = "";
    this.allowanceArchiveStatus = "";
  }
  fillData(data) {
    this.allowanceToken = data.allowanceToken;
    this.allowanceNameCurrent = data.allowanceNameCurrent;
    this.allowanceNameEn = data.allowanceNameEn;
    this.allowanceNameAr = data.allowanceNameAr;
    this.allowanceNameUnd = data.allowanceNameUnd;
    this.allowanceDescriptionCurrent = data.allowanceDescriptionCurrent;
    this.allowanceDescriptionEn = data.allowanceDescriptionEn;
    this.allowanceDescriptionAr = data.allowanceDescriptionAr;
    this.allowanceDescriptionUnd = data.allowanceDescriptionUnd;
    this.allowanceNotes = data.allowanceNotes;
    this.allowanceArchiveStatus = data.allowanceArchiveStatus;
  }

  async getAllAllowances(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/Allowances/GetAllAllowances?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getAllowanceDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Allowances/GetAllowanceDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&allowanceToken=${this.allowanceToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfAllowances(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Allowances/GetDialogOfAllowances?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateAllowance(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      allowanceToken: this.allowanceToken,
      allowanceNameEn: this.allowanceNameEn,
      allowanceNameAr: this.allowanceNameAr,
      allowanceNameUnd: this.allowanceNameUnd,
      allowanceDescriptionEn: this.allowanceDescriptionEn,
      allowanceDescriptionAr: this.allowanceDescriptionAr,
      allowanceDescriptionUnd: this.allowanceDescriptionUnd,
      allowanceNotes: this.allowanceNotes,
    };

    try {
      let response = "";
      if (this.allowanceToken == "" || this.allowanceToken == undefined) {
        response = await axios.post(`/Allowances/AddAllowance`, data);
      } else {
        response = await axios.post(`/Allowances/UpdateAllowance`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveAllowance(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      allowanceToken: this.allowanceToken,
    };

    try {
      let response = await axios.post(`/Allowances/ArchiveAllowance`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
