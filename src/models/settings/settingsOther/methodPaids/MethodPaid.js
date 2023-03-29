import axios from "axios";
import { PAGE_SIZE } from "@/utils/constants";

export default class MethodPaid {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.methodPaidToken = "";
    this.methodPaidNameCurrent = "";
    this.methodPaidNameAr = "";
    this.methodPaidNameEn = "";
    this.methodPaidNameUnd = "";
    this.methodPaidNotes = "";
    this.methodPaidArchiveStatus = "";
  }
  fillData(data) {
    this.methodPaidToken = data.methodPaidToken;
    this.methodPaidNameCurrent = data.methodPaidNameCurrent;
    this.methodPaidNameAr = data.methodPaidNameAr;
    this.methodPaidNameEn = data.methodPaidNameEn;
    this.methodPaidNameUnd = data.methodPaidNameUnd;
    this.methodPaidNotes = data.methodPaidNotes;
    this.methodPaidArchiveStatus = data.methodPaidArchiveStatus;
  }

  async getAllMethodPaid(
    language,
    userAuthorizeToken,
    selfPage,
    clientTypeToken,
    clientSuperToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/MethodPaids/GetAllMethodPaid?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&clientTypeToken=${clientTypeToken}&clientSuperToken=${clientSuperToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
  async getPaidDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MethodPaids/GetMethodPaidDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&methodPaidToken=${this.methodPaidToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
  async getDialogOfMethodPaid(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MethodPaids/GetDialogOfMethodPaid?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMethodPaid(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      methodPaidToken: this.methodPaidToken,
      methodPaidNameEn: this.methodPaidNameEn,
      methodPaidNameAr: this.methodPaidNameAr,
      methodPaidNameUnd: this.methodPaidNameUnd,
      methodPaidNotes: this.methodPaidNotes,
    };

    try {
      let response = "";
      if (this.methodPaidToken == "" || this.methodPaidToken == undefined) {
        response = await axios.post(`/MethodPaids/AddMethodPaid`, data);
      } else {
        response = await axios.post(`/MethodPaids/UpdateMethodPaid`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveMethodPaid(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      methodPaidToken: this.methodPaidToken,
    };

    try {
      let response = await axios.post(`/MethodPaids/ArchiveMethodPaid`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
