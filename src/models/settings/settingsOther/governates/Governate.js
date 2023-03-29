import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class Governate {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.governateToken = "";
    this.countryToken = "";
    this.countryNameCurrent = "";
    this.governateNameCollection = "";
    this.governateNameCurrent = "";
    this.governateNameAr = "";
    this.governateNameEn = "";
    this.governateNameUnd = "";
    this.governateArchiveStatus = "";
  }
  fillData(data) {
    this.governateToken = data.governateToken;
    this.countryToken = data.countryToken;
    this.countryNameCurrent = data.countryNameCurrent;
    this.governateNameCollection = data.governateNameCollection;
    this.governateNameCurrent = data.governateNameCurrent;
    this.governateNameAr = data.governateNameAr;
    this.governateNameEn = data.governateNameEn;
    this.governateNameUnd = data.governateNameUnd;
    this.governateArchiveStatus = data.governateArchiveStatus;
  }

  async getAllGovernates(
    language,
    userAuthorizeToken,
    selfPage,
    filterStatus = "",
    textSearch,
    countryToken = ""
  ) {
    try {
      let response = await axios.get(
        `/Governates/GetAllGovernates?language=${language}&userAuthorizeToken=${userAuthorizeToken}&governorateArchiveStatus=false&page=${selfPage}&paginationStatus=&pageSize=${PAGE_SIZE}&filterStatus=${filterStatus}&textSearch=${textSearch}&sortToken=&countryToken=${countryToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getGovernateDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `Governates/GetGovernateDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&governateToken=${this.governateToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfGovernates(
    language,
    userAuthorizeToken,
    filterStatus = "",
    countryToken = ""
  ) {
    try {
      let response = await axios.get(
        `/Governates/GetDialogOfGovernates?language=${language}&userAuthorizeToken=${userAuthorizeToken}&paginationStatus=&pageSize=${PAGE_SIZE}&filterStatus=${filterStatus}&countryToken=${countryToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateGovernate(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      governateToken: this.governateToken,
      countryToken: this.countryToken,
      governateNameEn: this.governateNameEn,
      governateNameAr: this.governateNameAr,
      governateNameUnd: this.governateNameUnd,
    };

    try {
      let response = "";
      if (this.governateToken == "" || this.governateToken == undefined) {
        response = await axios.post(`/Governates/AddGovernate`, data);
      } else {
        response = await axios.post(`/Governates/UpdateGovernate`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveGovernate(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      governateToken: this.governateToken,
    };

    try {
      let response = await axios.post(`/Governates/ArchiveGovernate`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
