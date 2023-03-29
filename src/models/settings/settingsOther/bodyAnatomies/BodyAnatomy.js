import { STATUS, PAGE_SIZE, BASE_URL } from "@/utils/constants";
import axios from "axios";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";

export default class BodyAnatomy {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.bodyAnatomyToken = "";
    this.bodyAnatomyTypeToken = "";
    this.bodyAnatomyTypeNameCurrent = "";
    this.specialSpecialtyToken = "";
    this.specialSpecialtyNameCurrent = "";
    this.generalSpecialtyToken = "";
    this.generalSpecialtyNameCurrent = "";
    this.bodyAnatomyNameCurrent = "";
    this.bodyAnatomyNameCollecation = "";
    this.bodyAnatomyNameEn = "";
    this.bodyAnatomyNameAr = "";
    this.bodyAnatomyNameUnd = "";
    this.bodyAnatomyDescriptionCurrent = "";
    this.bodyAnatomyDescriptionEn = "";
    this.bodyAnatomyDescriptionAr = "";
    this.bodyAnatomyDescriptionUnd = "";
    this.bodyAnatomyImagePath = "";
    this.bodyAnatomyNotes = "";
    this.bodyAnatomyArchiveStatus = "";
    this.filter = {
      bodyAnatomyToken: "",
      bodyAnatomyTypeToken: "",
      specialSpecialtyToken: "",
      generalSpecialtyToken: "",
    };
  }
  fillData(data) {
    this.bodyAnatomyToken = data.bodyAnatomyToken;
    this.bodyAnatomyTypeToken = data.bodyAnatomyTypeToken;
    this.bodyAnatomyTypeNameCurrent = data.bodyAnatomyTypeNameCurrent;
    this.specialSpecialtyToken = data.specialSpecialtyToken;
    this.specialSpecialtyNameCurrent = data.specialSpecialtyNameCurrent;
    this.generalSpecialtyToken = data.generalSpecialtyToken;
    this.generalSpecialtyNameCurrent = data.generalSpecialtyNameCurrent;
    this.bodyAnatomyNameCurrent = data.bodyAnatomyNameCurrent;
    this.bodyAnatomyNameCollecation = data.bodyAnatomyNameCollecation;
    this.bodyAnatomyNameEn = data.bodyAnatomyNameEn;
    this.bodyAnatomyNameAr = data.bodyAnatomyNameAr;
    this.bodyAnatomyNameUnd = data.bodyAnatomyNameUnd;
    this.bodyAnatomyDescriptionCurrent = data.bodyAnatomyDescriptionCurrent;
    this.bodyAnatomyDescriptionEn = data.bodyAnatomyDescriptionEn;
    this.bodyAnatomyDescriptionAr = data.bodyAnatomyDescriptionAr;
    this.bodyAnatomyDescriptionUnd = data.bodyAnatomyDescriptionUnd;
    this.bodyAnatomyImagePath = data.bodyAnatomyImagePath;
    this.bodyAnatomyNotes = data.bodyAnatomyNotes;
    this.bodyAnatomyArchiveStatus = data.bodyAnatomyArchiveStatus;
  }

  async getAllBodyAnatomies(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/BodyAnatomy/GetAllBodyAnatomy/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&bodyAnatomyTypeToken=${this.filter.bodyAnatomyTypeToken}&specialSpecialtyToken=${this.filter.specialSpecialtyToken}&generalSpecialtyToken=${this.filter.generalSpecialtyToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getBodyAnatomyDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/BodyAnatomy/GetBodyAnatomyDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&bodyAnatomyToken=${this.bodyAnatomyToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfBodyAnatomies(language, userAuthorizeToken) {
    let options = [];
    try {
      let response = await axios.get(
        `/BodyAnatomy/GetDialogOfBodyAnatomy?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&bodyAnatomyTypeToken=${this.bodyAnatomyTypeToken}&specialSpecialtyToken=${this.specialSpecialtyToken}&generalSpecialtyToken=${this.generalSpecialtyToken}`
      );
      const itemsData = response.data.itemsData;
      if (response.data.status == STATUS.SUCCESS) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["itemToken"],
            text: itemsData[item]["itemName"],
            image: itemsData[item]["itemImagePath"]
              ? BASE_URL + itemsData[item]["itemImagePath"]
              : "",
          });
        }
      } else if (response.data.status == STATUS.INVALID_TOKEN) {
        store.dispatch("updateUserData", null);
        router.push("/").catch(() => {});
      } else {
        options.push({
          value: "",
          text: response.data.msg,
          image: "",
        });
      }
    } catch (error) {
      options.push({
        value: "",
        text: i18n.t("errorCatch"),
        image: "",
      });
    }
    return options;
  }

  async addOrUpdateBodyAnatomy(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      image: this.image,
      bodyAnatomyToken: this.bodyAnatomyToken,
      bodyAnatomyTypeToken: this.bodyAnatomyTypeToken,
      specialSpecialtyToken: this.specialSpecialtyToken,
      bodyAnatomyNameEn: this.bodyAnatomyNameEn,
      bodyAnatomyNameAr: this.bodyAnatomyNameAr,
      bodyAnatomyNameUnd: this.bodyAnatomyNameUnd,
      bodyAnatomyDescriptionEn: this.bodyAnatomyDescriptionEn,
      bodyAnatomyDescriptionAr: this.bodyAnatomyDescriptionAr,
      bodyAnatomyDescriptionUnd: this.bodyAnatomyDescriptionUnd,
      bodyAnatomyNotes: this.bodyAnatomyNotes,
    };

    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (this.bodyAnatomyToken == "" || this.bodyAnatomyToken == undefined) {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/BodyAnatomy/AddBodyAnatomyWithMedia`,
            formData
          );
        } else {
          response = await axios.post(`/BodyAnatomy/AddBodyAnatomy`, data);
        }
      } else {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/BodyAnatomy/UpdateBodyAnatomyWithMedia`,
            formData
          );
        } else {
          response = await axios.post(`/BodyAnatomy/UpdateBodyAnatomy`, data);
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveBodyAnatomy(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      bodyAnatomyToken: this.bodyAnatomyToken,
    };

    try {
      let response = await axios.post(`/BodyAnatomy/ArchiveBodyAnatomy`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
