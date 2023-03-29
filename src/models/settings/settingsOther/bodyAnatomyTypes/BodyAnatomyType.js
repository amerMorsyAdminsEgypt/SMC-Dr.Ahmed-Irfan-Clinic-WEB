import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class BodyAnatomyType {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.bodyAnatomyTypeToken = "";
    this.bodyAnatomyTypeNameCurrent = "";
    this.bodyAnatomyTypeNameEn = "";
    this.bodyAnatomyTypeNameAr = "";
    this.bodyAnatomyTypeNameUnd = "";
    this.bodyAnatomyTypeDescriptionCurrent = "";
    this.bodyAnatomyTypeDescriptionEn = "";
    this.bodyAnatomyTypeDescriptionAr = "";
    this.bodyAnatomyTypeDescriptionUnd = "";
    this.bodyAnatomyTypeImagePath = "";
    this.bodyAnatomyTypeNotes = "";
    this.bodyAnatomyTypeArchiveStatus = "";
    this.filter = {
      generalSpecialtyToken: "",
      specialSpecialtyToken: "",
    };
  }
  fillData(data) {
    this.bodyAnatomyTypeToken = data.bodyAnatomyTypeToken;
    this.bodyAnatomyTypeNameCurrent = data.bodyAnatomyTypeNameCurrent;
    this.bodyAnatomyTypeNameEn = data.bodyAnatomyTypeNameEn;
    this.bodyAnatomyTypeNameAr = data.bodyAnatomyTypeNameAr;
    this.bodyAnatomyTypeNameUnd = data.bodyAnatomyTypeNameUnd;
    this.bodyAnatomyTypeDescriptionCurrent =
      data.bodyAnatomyTypeDescriptionCurrent;
    this.bodyAnatomyTypeDescriptionEn = data.bodyAnatomyTypeDescriptionEn;
    this.bodyAnatomyTypeDescriptionAr = data.bodyAnatomyTypeDescriptionAr;
    this.bodyAnatomyTypeDescriptionUnd = data.bodyAnatomyTypeDescriptionUnd;
    this.bodyAnatomyTypeImagePath = data.bodyAnatomyTypeImagePath;
    this.bodyAnatomyTypeNotes = data.bodyAnatomyTypeNotes;
    this.bodyAnatomyTypeArchiveStatus = data.bodyAnatomyTypeArchiveStatus;
  }

  async getAllBodyAnatomyTypes(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/BodyAnatomyTypes/GetAllBodyAnatomyTypes/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&generalSpecialtyToken=${this.filter.generalSpecialtyToken}&specialSpecialtyToken=${this.filter.specialSpecialtyToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getBodyAnatomyTypeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/BodyAnatomyTypes/GetBodyAnatomyTypeDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&bodyAnatomyTypeToken=${this.bodyAnatomyTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfBodyAnatomyTypes(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/BodyAnatomyTypes/GetDialogOfBodyAnatomyTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateBodyAnatomyType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      image: this.image,
      bodyAnatomyTypeToken: this.bodyAnatomyTypeToken,
      bodyAnatomyTypeNameCurrent: this.bodyAnatomyTypeNameCurrent,
      bodyAnatomyTypeNameEn: this.bodyAnatomyTypeNameEn,
      bodyAnatomyTypeNameAr: this.bodyAnatomyTypeNameAr,
      bodyAnatomyTypeNameUnd: this.bodyAnatomyTypeNameUnd,
      bodyAnatomyTypeDescriptionCurrent: this.bodyAnatomyTypeDescriptionCurrent,
      bodyAnatomyTypeDescriptionEn: this.bodyAnatomyTypeDescriptionEn,
      bodyAnatomyTypeDescriptionAr: this.bodyAnatomyTypeDescriptionAr,
      bodyAnatomyTypeDescriptionUnd: this.bodyAnatomyTypeDescriptionUnd,
      bodyAnatomyTypeImagePath: this.bodyAnatomyTypeImagePath,
      bodyAnatomyTypeNotes: this.bodyAnatomyTypeNotes,
      bodyAnatomyTypeArchiveStatus: this.bodyAnatomyTypeArchiveStatus,
    };

    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (
        this.bodyAnatomyTypeToken == "" ||
        this.bodyAnatomyTypeToken == undefined
      ) {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/BodyAnatomyTypes/AddBodyAnatomyTypeWithImage`,
            formData
          );
        } else {
          response = await axios.post(
            `/BodyAnatomyTypes/AddBodyAnatomyType`,
            data
          );
        }
      } else {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/BodyAnatomyTypes/UpdateBodyAnatomyTypeWithMedia`,
            formData
          );
        } else {
          response = await axios.post(
            `/BodyAnatomyTypes/UpdateBodyAnatomyType`,
            data
          );
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveBodyAnatomyType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      bodyAnatomyTypeToken: this.bodyAnatomyTypeToken,
    };

    try {
      let response = await axios.post(
        `/BodyAnatomyTypes/ArchiveBodyAnatomyType`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
