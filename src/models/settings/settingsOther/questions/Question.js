import { STATUS, PAGE_SIZE, BASE_URL } from "@/utils/constants";
import axios from "axios";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";

export default class Question {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.questionToken = "";
    this.questionsTypeToken = "";
    this.questionsTypeNameCurrent = "";
    this.specialSpecialtyToken = "";
    this.specialSpecialtyNameCurrent = "";
    this.generalSpecialtyToken = "";
    this.generalSpecialtyNameCurrent = "";
    this.questionNameCollecation = "";
    this.questionNameCurrent = "";
    this.questionNameAr = "";
    this.questionNameEn = "";
    this.questionNameUnd = "";
    this.questionImagePath = "";
    this.questionNotes = "";
    this.questionArchiveStatus = "";
    this.filter = {
      questionsTypeToken: "",
      generalSpecialtyToken: "",
      specialSpecialtyToken: "",
    };
  }
  fillData(data) {
    this.questionToken = data.questionToken;
    this.questionsTypeToken = data.questionsTypeToken;
    this.questionsTypeNameCurrent = data.questionsTypeNameCurrent;
    this.specialSpecialtyToken = data.specialSpecialtyToken;
    this.specialSpecialtyNameCurrent = data.specialSpecialtyNameCurrent;
    this.generalSpecialtyToken = data.generalSpecialtyToken;
    this.generalSpecialtyNameCurrent = data.generalSpecialtyNameCurrent;
    this.questionNameCollecation = data.questionNameCollecation;
    this.questionNameCurrent = data.questionNameCurrent;
    this.questionNameAr = data.questionNameAr;
    this.questionNameEn = data.questionNameEn;
    this.questionNameUnd = data.questionNameUnd;
    this.questionImagePath = data.questionImagePath;
    this.questionNotes = data.questionNotes;
    this.questionArchiveStatus = data.questionArchiveStatus;
  }

  async getAllQuestions(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/Questions/GetAllQuestions?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&questionsTypeToken=${this.filter.questionsTypeToken}&generalSpecialtyToken=${this.filter.generalSpecialtyToken}&specialSpecialtyToken=${this.filter.specialSpecialtyToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getQuestionDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Questions/GetQuestionDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&questionToken=${this.questionToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfQuestions(language, userAuthorizeToken) {
    let options = [];
    try {
      let response = await axios.get(
        `/Questions/GetDialogOfQuestions?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&questionsTypeToken=${this.filter.questionsTypeToken}&generalSpecialtyToken=${this.filter.generalSpecialtyToken}&specialSpecialtyToken=${this.filter.specialSpecialtyToken}`
      );
      const itemsData = response.data.itemsData;
      if (response.data.status == STATUS.SUCCESS) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["itemToken"],
            text: itemsData[item]["itemName"],
            image: BASE_URL + itemsData[item]["itemImagePath"],
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
      return options;
    } catch (error) {
      options.push({
        value: "",
        text: i18n.t("errorCatch"),
        image: "",
      });
      return options;
    }
  }

  async addOrUpdateQuestion(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      image: this.image,
      questionToken: this.questionToken,
      questionsTypeToken: this.questionsTypeToken,
      specialSpecialtyToken: this.specialSpecialtyToken,
      questionNameAr: this.questionNameAr,
      questionNameEn: this.questionNameEn,
      questionNameUnd: this.questionNameUnd,
      questionNotes: this.questionNotes,
    };

    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (this.questionToken == "" || this.questionToken == undefined) {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/Questions/AddQuestionWithMedia`,
            formData
          );
        } else {
          response = await axios.post(`/Questions/AddQuestion`, data);
        }
      } else {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/Questions/UpdateQuestionWithMedia`,
            formData
          );
        } else {
          response = await axios.post(`/Questions/UpdateQuestion`, data);
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveQuestion(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      questionToken: this.questionToken,
    };

    try {
      let response = await axios.post(`/Questions/ArchiveQuestion`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
