import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class RevenueType {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.revenuesTypeToken = "";
    this.revenuesTypeNameCurrent = "";
    this.revenuesTypeNameEn = "";
    this.revenuesTypeNameAr = "";
    this.revenuesTypeNameUnd = "";
    this.revenuesTypeNotes = "";
    this.revenuesTypeArchiveStatus = "";
  }
  fillData(data) {
    this.revenuesTypeToken = data.revenuesTypeToken;
    this.revenuesTypeNameCurrent = data.revenuesTypeNameCurrent;
    this.revenuesTypeNameEn = data.revenuesTypeNameEn;
    this.revenuesTypeNameAr = data.revenuesTypeNameAr;
    this.revenuesTypeNameUnd = data.revenuesTypeNameUnd;
    this.revenuesTypeNotes = data.revenuesTypeNotes;
    this.revenuesTypeArchiveStatus = data.revenuesTypeArchiveStatus;
  }

  async getAllRevenuesTypes(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/RevenuesTypes/GetAllRevenuesTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getRevenueTypeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/RevenuesTypes/GetRevenuesTypesDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&revenuesTypeToken=${this.revenuesTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfRevenuesTypes(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/RevenuesTypes/GetDialogOfRevenuesTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateRevenueType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      revenuesTypeToken: this.revenuesTypeToken,
      revenuesTypeNameEn: this.revenuesTypeNameEn,
      revenuesTypeNameAr: this.revenuesTypeNameAr,
      revenuesTypeNameUnd: this.revenuesTypeNameUnd,
      revenuesTypeNotes: this.revenuesTypeNotes,
    };

    try {
      let response = "";
      if (this.revenuesTypeToken == "" || this.revenuesTypeToken == undefined) {
        response = await axios.post(`/RevenuesTypes/AddRevenuesTypes`, data);
      } else {
        response = await axios.post(`/RevenuesTypes/UpdateRevenuesTypes`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveRevenueType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      revenuesTypeToken: this.revenuesTypeToken,
    };

    try {
      let response = await axios.post(
        `/RevenuesTypes/ArchiveRevenuesTypes`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
