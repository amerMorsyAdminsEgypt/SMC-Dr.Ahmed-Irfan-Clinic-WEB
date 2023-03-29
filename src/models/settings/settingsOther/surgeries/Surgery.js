import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class Surgery {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.surgeryToken = "";
    this.surgeryNameCurrent = "";
    this.surgeryNameAr = "";
    this.surgeryNameEn = "";
    this.surgeryNameUnd = "";
    this.surgeryDescriptionCurrent = "";
    this.surgeryDescriptionAr = "";
    this.surgeryDescriptionEn = "";
    this.surgeryDescriptionUnd = "";
    this.surgeryNotes = "";
    this.surgeryArchiveStatus = "";
  }
  fillData(data) {
    this.surgeryToken = data.surgeryToken;
    this.surgeryNameCurrent = data.surgeryNameCurrent;
    this.surgeryNameAr = data.surgeryNameAr;
    this.surgeryNameEn = data.surgeryNameEn;
    this.surgeryNameUnd = data.surgeryNameUnd;
    this.surgeryDescriptionCurrent = data.surgeryDescriptionCurrent;
    this.surgeryDescriptionAr = data.surgeryDescriptionAr;
    this.surgeryDescriptionEn = data.surgeryDescriptionEn;
    this.surgeryDescriptionUnd = data.surgeryDescriptionUnd;
    this.surgeryNotes = data.surgeryNotes;
    this.surgeryArchiveStatus = data.surgeryArchiveStatus;
  }

  async getAllSurgeries(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/Surgries/GetAllSurgries/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getSurgeryDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Surgries/GetSurgeryDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&surgeryToken=${this.surgeryToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfSurgeries(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Surgries/GetDialogOfSurgries?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateSurgery(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      surgeryToken: this.surgeryToken,
      surgeryNameEn: this.surgeryNameEn,
      surgeryNameAr: this.surgeryNameAr,
      surgeryNameUnd: this.surgeryNameUnd,
      surgeryDescriptionEn: this.surgeryDescriptionEn,
      surgeryDescriptionAr: this.surgeryDescriptionAr,
      surgeryDescriptionUnd: this.surgeryDescriptionUnd,
      surgeryNotes: this.surgeryNotes,
    };

    try {
      let response = "";
      if (this.surgeryToken == "" || this.surgeryToken == undefined) {
        response = await axios.post(`/Surgries/AddSurgery`, data);
      } else {
        response = await axios.post(`/Surgries/UpdateSurgery`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveSurgery(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      surgeryToken: this.surgeryToken,
    };

    try {
      let response = await axios.post(`/Surgries/ArchiveSurgery`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
