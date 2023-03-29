import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class AddictiveStuff {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.addictiveStuffToken = "";
    this.addictiveStuffTypeToken = "";
    this.addictiveStuffTypeNameCurrent = "";
    this.addictiveStuffTypeNameAr = "";
    this.addictiveStuffTypeNameEn = "";
    this.addictiveStuffTypeNameUnd = "";
    this.addictiveStuffNameCurrent = "";
    this.addictiveStuffNameAr = "";
    this.addictiveStuffNameEn = "";
    this.addictiveStuffNameUnd = "";
    this.addictiveStuffDetailsCurrnet = "";
    this.addictiveStuffDetailsAr = "";
    this.addictiveStuffDetailsEn = "";
    this.addictiveStuffDetailsUnd = "";
    this.addictiveStuffNotes = "";
    this.addictiveStuffArchiveStatus = "";
  }
  fillData(data) {
    this.addictiveStuffToken = data.addictiveStuffToken;
    this.addictiveStuffTypeToken = data.addictiveStuffTypeToken;
    this.addictiveStuffTypeNameCurrent = data.addictiveStuffTypeNameCurrent;
    this.addictiveStuffTypeNameAr = data.addictiveStuffTypeNameAr;
    this.addictiveStuffTypeNameEn = data.addictiveStuffTypeNameEn;
    this.addictiveStuffTypeNameUnd = data.addictiveStuffTypeNameUnd;
    this.addictiveStuffNameCurrent = data.addictiveStuffNameCurrent;
    this.addictiveStuffNameAr = data.addictiveStuffNameAr;
    this.addictiveStuffNameEn = data.addictiveStuffNameEn;
    this.addictiveStuffNameUnd = data.addictiveStuffNameUnd;
    this.addictiveStuffDetailsCurrnet = data.addictiveStuffDetailsCurrnet;
    this.addictiveStuffDetailsAr = data.addictiveStuffDetailsAr;
    this.addictiveStuffDetailsEn = data.addictiveStuffDetailsEn;
    this.addictiveStuffDetailsUnd = data.addictiveStuffDetailsUnd;
    this.addictiveStuffNotes = data.addictiveStuffNotes;
    this.addictiveStuffArchiveStatus = data.addictiveStuffArchiveStatus;
  }

  async getAllAddictiveStuffs(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/AddictiveStuff/GetAllAddictiveStuff?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}&addictiveStuffTypeToken=${this.addictiveStuffTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getAddictiveStuffDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/AddictiveStuff/GetAddictiveStuffDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&addictiveStuffToken=${this.addictiveStuffToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfAddictiveStuffs(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/AddictiveStuff/GetDialogOfAddictiveStuff?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&addictiveStuffTypeToken=${this.addictiveStuffTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateAddictiveStuff(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      addictiveStuffToken: this.addictiveStuffToken,
      addictiveStuffTypeToken: this.addictiveStuffTypeToken,
      addictiveStuffNameAr: this.addictiveStuffNameAr,
      addictiveStuffNameEn: this.addictiveStuffNameEn,
      addictiveStuffNameUnd: this.addictiveStuffNameUnd,
      addictiveStuffDetailsAr: this.addictiveStuffDetailsAr,
      addictiveStuffDetailsEn: this.addictiveStuffDetailsEn,
      addictiveStuffDetailsUnd: this.addictiveStuffDetailsUnd,
      addictiveStuffNotes: this.addictiveStuffNotes,
    };

    try {
      let response = "";
      if (
        this.addictiveStuffToken == "" ||
        this.addictiveStuffToken == undefined
      ) {
        response = await axios.post(`/AddictiveStuff/AddAddictiveStuff`, data);
      } else {
        response = await axios.post(
          `/AddictiveStuff/UpdateAddictiveStuff`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveAddictiveStuff(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      addictiveStuffToken: this.addictiveStuffToken,
    };

    try {
      let response = await axios.post(
        `/AddictiveStuff/ArchiveAddictiveStuff`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
