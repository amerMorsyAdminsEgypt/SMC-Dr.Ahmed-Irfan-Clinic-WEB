import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class Country {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.countryToken = "";
    this.countryNameCurrent = "";
    this.countryNameAr = "";
    this.countryNameEn = "";
    this.countryNameUnd = "";
    this.nationalityAr = "";
    this.nationalityEn = "";
    this.nationalityUnd = "";
    this.alpha2Code = "";
    this.alpha3Code = "";
    this.countryArchiveStatus = "";
  }
  fillData(data) {
    this.countryToken = data.countryToken;
    this.countryNameCurrent = data.countryNameCurrent;
    this.countryNameAr = data.countryNameAr;
    this.countryNameEn = data.countryNameEn;
    this.countryNameUnd = data.countryNameUnd;
    this.nationalityAr = data.nationalityAr;
    this.nationalityEn = data.nationalityEn;
    this.nationalityUnd = data.nationalityUnd;
    this.alpha2Code = data.alpha2Code;
    this.alpha3Code = data.alpha3Code;
    this.countryArchiveStatus = data.countryArchiveStatus;
  }

  async getAllCountries(
    language,
    userAuthorizeToken,
    selfPage,
    filterStatus = "",
    textSearch = ""
  ) {
    try {
      let response = await axios.get(
        `/Countries/GetAllCountries?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=&pageSize=${PAGE_SIZE}&filterStatus=${filterStatus}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getCountryDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Countries/GetCountryDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&countryToken=${this.countryToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfCountries(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Countries/GetDialogOfCountries?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateCountry(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      countryToken: this.countryToken,
      countryNameEn: this.countryNameEn,
      countryNameAr: this.countryNameAr,
      countryNameUnd: this.countryNameUnd,
      nationalityAr: this.nationalityAr,
      nationalityEn: this.nationalityEn,
      nationalityUnd: this.nationalityUnd,
      countryNotes: this.countryNotes,
    };

    try {
      let response = "";
      if (this.countryToken == "" || this.countryToken == undefined) {
        response = await axios.post(`/Countries/AddCountry`, data);
      } else {
        response = await axios.post(`/Countries/UpdateCountry`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveCountry(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      countryToken: this.countryToken,
    };

    try {
      let response = await axios.post(`/Countries/ArchiveCountry`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
