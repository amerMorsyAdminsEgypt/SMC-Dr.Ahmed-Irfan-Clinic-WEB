import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class MealsType {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.mealsTypeToken = "";
    this.mealsTypeNameCurrent = "";
    this.mealsTypeNameAr = "";
    this.mealsTypeNameEn = "";
    this.mealsTypeNameUnd = "";
    this.mealsTypeImagePath = "";
    this.mealsTypeNotes = "";
    this.mealsTypeArchiveStatus = "";
  }
  fillData(data) {
    this.mealsTypeToken = data.mealsTypeToken;
    this.mealsTypeNameCurrent = data.mealsTypeNameCurrent;
    this.mealsTypeNameAr = data.mealsTypeNameAr;
    this.mealsTypeNameEn = data.mealsTypeNameEn;
    this.mealsTypeNameUnd = data.mealsTypeNameUnd;
    this.mealsTypeImagePath = data.mealsTypeImagePath;
    this.mealsTypeNotes = data.mealsTypeNotes;
    this.mealsTypeArchiveStatus = data.mealsTypeArchiveStatus;
  }

  async getAllMealsTypes(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/MealsTypes/GetAllMealsTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMealsTypeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MealsTypes/GetMealsTypeDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&mealsTypeToken=${this.mealsTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfMealsTypes(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MealsTypes/GetDialogOfMealsTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMealsType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      image: this.image,
      mealsTypeToken: this.mealsTypeToken,
      mealsTypeNameCurrent: this.mealsTypeNameCurrent,
      mealsTypeNameAr: this.mealsTypeNameAr,
      mealsTypeNameEn: this.mealsTypeNameEn,
      mealsTypeNameUnd: this.mealsTypeNameUnd,
      mealsTypeImagePath: this.mealsTypeImagePath,
      mealsTypeNotes: this.mealsTypeNotes,
      mealsTypeArchiveStatus: this.mealsTypeArchiveStatus,
    };

    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }
    try {
      let response = "";
      if (this.mealsTypeToken == "" || this.mealsTypeToken == undefined) {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/MealsTypes/AddMealsTypeWithImage`,
            formData
          );
        } else {
          response = await axios.post(`/MealsTypes/AddMealsType`, data);
        }
      } else {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/MealsTypes/UpdateMealsTypeWithMedia`,
            formData
          );
        } else {
          response = await axios.post(`/MealsTypes/UpdateMealsType`, data);
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveMealsType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      mealsTypeToken: this.mealsTypeToken,
    };

    try {
      let response = await axios.post(`/MealsTypes/ArchiveMealsType`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
