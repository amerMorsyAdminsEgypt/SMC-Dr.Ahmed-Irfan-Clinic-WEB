import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class BloodType {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.bloodTypeToken = "";
    this.bloodTypeNameCurrent = "";
    this.bloodTypeNameEn = "";
    this.bloodTypeNameAr = "";
    this.bloodTypeNameUnd = "";
    this.bloodTypeDescriptionCurrent = "";
    this.bloodTypeDescriptionEn = "";
    this.bloodTypeDescriptionAr = "";
    this.bloodTypeDescriptionUnd = "";
    this.bloodTypeNotes = "";
    this.bloodTypeArchiveStatus = "";
  }
  fillData(data) {
    this.bloodTypeToken = data.bloodTypeToken;
    this.bloodTypeNameCurrent = data.bloodTypeNameCurrent;
    this.bloodTypeNameEn = data.bloodTypeNameEn;
    this.bloodTypeNameAr = data.bloodTypeNameAr;
    this.bloodTypeNameUnd = data.bloodTypeNameUnd;
    this.bloodTypeDescriptionCurrent = data.bloodTypeDescriptionCurrent;
    this.bloodTypeDescriptionEn = data.bloodTypeDescriptionEn;
    this.bloodTypeDescriptionAr = data.bloodTypeDescriptionAr;
    this.bloodTypeDescriptionUnd = data.bloodTypeDescriptionUnd;
    this.bloodTypeNotes = data.bloodTypeNotes;
    this.bloodTypeArchiveStatus = data.bloodTypeArchiveStatus;
  }

  async getAllBloodTypes(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/BloodTypes/GetAllBloodTypes/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getBloodTypeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/BloodTypes/GetBloodTypeDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&bloodTypeToken=${this.bloodTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfBloodTypes(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/BloodTypes/GetDialogOfBloodTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateBloodType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      bloodTypeToken: this.bloodTypeToken,
      bloodTypeNameEn: this.bloodTypeNameEn,
      bloodTypeNameAr: this.bloodTypeNameAr,
      bloodTypeNameUnd: this.bloodTypeNameUnd,
      bloodTypeDescriptionEn: this.bloodTypeDescriptionEn,
      bloodTypeDescriptionAr: this.bloodTypeDescriptionAr,
      bloodTypeDescriptionUnd: this.bloodTypeDescriptionUnd,
      bloodTypeNotes: this.bloodTypeNotes,
    };

    try {
      let response = "";
      if (this.bloodTypeToken == "" || this.bloodTypeToken == undefined) {
        response = await axios.post(`/BloodTypes/AddBloodType`, data);
      } else {
        response = await axios.post(`/BloodTypes/UpdateBloodType`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveBloodType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      bloodTypeToken: this.bloodTypeToken,
    };

    try {
      let response = await axios.post(`/BloodTypes/ArchiveBloodType`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
