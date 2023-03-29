import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class City {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.cityToken = "";
    this.countryToken = "";
    this.countryNameCurrent = "";
    this.governateToken = "";
    this.governateNameCurrent = "";
    this.cityNameCollection = "";
    this.cityNameCurrent = "";
    this.cityNameAr = "";
    this.cityNameEn = "";
    this.cityNameUnd = "";
    this.cityArchiveStatus = "";
  }
  fillData(data) {
    this.cityToken = data.cityToken;
    this.countryToken = data.countryToken;
    this.countryNameCurrent = data.countryNameCurrent;
    this.governateToken = data.governateToken;
    this.governateNameCurrent = data.governateNameCurrent;
    this.cityNameCollection = data.cityNameCollection;
    this.cityNameCurrent = data.cityNameCurrent;
    this.cityNameAr = data.cityNameAr;
    this.cityNameEn = data.cityNameEn;
    this.cityNameUnd = data.cityNameUnd;
    this.cityArchiveStatus = data.cityArchiveStatus;
  }

  async getAllCities(
    language,
    userAuthorizeToken,
    selfPage,
    filterStatus = "",
    textSearch,
    governateToken = ""
  ) {
    try {
      let response = await axios.get(
        `/Cities/GetAllCities?language=${language}&userAuthorizeToken=${userAuthorizeToken}&cityArchiveStatus=false&page=${selfPage}&paginationStatus=&pageSize=${PAGE_SIZE}&filterStatus=${filterStatus}&textSearch=${textSearch}&sortToken=&governateToken=${governateToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getCityDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Cities/GetCityDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&cityToken=${this.cityToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfCities(
    language,
    userAuthorizeToken,
    filterStatus = "",
    governateToken = ""
  ) {
    try {
      let response = await axios.get(
        `/Cities/GetDialogOfCities?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=${filterStatus}&governateToken=${governateToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateCity(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      governateToken: this.governateToken,
      cityToken: this.cityToken,
      cityNameEn: this.cityNameEn,
      cityNameAr: this.cityNameAr,
      cityNameUnd: this.cityNameUnd,
    };

    try {
      let response = "";
      if (this.cityToken == "" || this.cityToken == undefined) {
        response = await axios.post(`/Cities/AddCity`, data);
      } else {
        response = await axios.post(`/Cities/UpdateCity`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveCity(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      cityToken: this.cityToken,
    };

    try {
      let response = await axios.post(`/Cities/ArchiveCity`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
