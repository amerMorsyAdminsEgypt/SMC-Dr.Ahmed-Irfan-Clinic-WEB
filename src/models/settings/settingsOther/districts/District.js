import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class District {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.districtToken = "";
    this.countryToken = "";
    this.countryNameCurrent = "";
    this.governateToken = "";
    this.governateNameCurrent = "";
    this.cityToken = "";
    this.cityNameCurrent = "";
    this.districtNameCollection = "";
    this.districtNameCurrent = "";
    this.districtNameAr = "";
    this.districtNameEn = "";
    this.districtNameUnd = "";
    this.districtArchiveStatus = "";
  }
  fillData(data) {
    this.districtToken = data.districtToken;
    this.countryToken = data.countryToken;
    this.countryNameCurrent = data.countryNameCurrent;
    this.governateToken = data.governateToken;
    this.governateNameCurrent = data.governateNameCurrent;
    this.cityToken = data.cityToken;
    this.cityNameCurrent = data.cityNameCurrent;
    this.districtNameCollection = data.districtNameCollection;
    this.districtNameCurrent = data.districtNameCurrent;
    this.districtNameAr = data.districtNameAr;
    this.districtNameEn = data.districtNameEn;
    this.districtNameUnd = data.districtNameUnd;
    this.districtArchiveStatus = data.districtArchiveStatus;
  }

  async getAllDistricts(
    language,
    userAuthorizeToken,
    selfPage,
    filterStatus = "",
    textSearch,
    cityToken = ""
  ) {
    try {
      let response = await axios.get(
        `/Districts/GetAllDistricts?language=${language}&userAuthorizeToken=${userAuthorizeToken}&cityArchiveStatus=false&page=${selfPage}&paginationStatus=&pageSize=${PAGE_SIZE}&filterStatus=${filterStatus}&textSearch=${textSearch}&sortToken=&cityToken=${cityToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDistrictDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Districts/GetDistrictDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&districtToken=${this.districtToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfDistricts(
    language,
    userAuthorizeToken,
    filterStatus = "",
    cityToken = ""
  ) {
    try {
      let response = await axios.get(
        `/Districts/GetDialogOfDistricts?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=${filterStatus}&cityToken=${cityToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateDistrict(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      districtToken: this.districtToken,
      cityToken: this.cityToken,
      districtNameEn: this.districtNameEn,
      districtNameAr: this.districtNameAr,
      districtNameUnd: this.districtNameUnd,
    };
    try {
      let response = "";
      if (this.districtToken == "" || this.districtToken == undefined) {
        response = await axios.post(`/Districts/AddDistrict`, data);
      } else {
        response = await axios.post(`/Districts/UpdateDistrict`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveDistrict(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      districtToken: this.districtToken,
    };

    try {
      let response = await axios.post(`/Districts/ArchiveDistrict`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
