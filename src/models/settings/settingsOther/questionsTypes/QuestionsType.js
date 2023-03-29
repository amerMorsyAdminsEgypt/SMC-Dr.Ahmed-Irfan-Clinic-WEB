import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class QuestionsType {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.questionsTypeToken = "";
    this.questionsTypeNameCurrent = "";
    this.questionsTypeNameAr = "";
    this.questionsTypeNameEn = "";
    this.questionsTypeNameUnd = "";
    this.questionsTypeImagePath = "";
    this.questionsTypeNotes = "";
    this.questionsTypeArchiveStatus = "";
  }
  fillData(data) {
    this.questionsTypeToken = data.questionsTypeToken;
    this.questionsTypeNameCurrent = data.questionsTypeNameCurrent;
    this.questionsTypeNameAr = data.questionsTypeNameAr;
    this.questionsTypeNameEn = data.questionsTypeNameEn;
    this.questionsTypeNameUnd = data.questionsTypeNameUnd;
    this.questionsTypeImagePath = data.questionsTypeImagePath;
    this.questionsTypeNotes = data.questionsTypeNotes;
    this.questionsTypeArchiveStatus = data.questionsTypeArchiveStatus;
  }

  async getAllQuestionsTypes(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/QuestionsTypes/GetAllQuestionsTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getQuestionsTypeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/QuestionsTypes/GetQuestionsTypeDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&questionsTypeToken=${this.questionsTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfQuestionsTypes(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/QuestionsTypes/GetDialogOfQuestionsTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateQuestionsType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      image: this.image,
      questionsTypeToken: this.questionsTypeToken,
      questionsTypeNameEN: this.questionsTypeNameEN,
      questionsTypeNameAr: this.questionsTypeNameAr,
      questionsTypeNameUnd: this.questionsTypeNameUnd,
      questionsTypeNotes: this.questionsTypeNotes,
    };

    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }
    try {
      let response = "";
      if (
        this.questionsTypeToken == "" ||
        this.questionsTypeToken == undefined
      ) {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/QuestionsTypes/AddQuestionsTypeWithImage`,
            formData
          );
        } else {
          response = await axios.post(`/QuestionsTypes/AddQuestionsType`, data);
        }
      } else {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/QuestionsTypes/UpdateQuestionsTypeWithMedia`,
            formData
          );
        } else {
          response = await axios.post(
            `/QuestionsTypes/UpdateQuestionsType`,
            data
          );
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveQuestionsType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      questionsTypeToken: this.questionsTypeToken,
    };

    try {
      let response = await axios.post(
        `/QuestionsTypes/ArchiveQuestionsType`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
