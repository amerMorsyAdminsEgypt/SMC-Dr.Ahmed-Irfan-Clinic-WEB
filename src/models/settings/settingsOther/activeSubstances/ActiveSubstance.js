import { STATUS, PAGE_SIZE, BASE_URL } from "@/utils/constants";
import axios from "axios";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";

export default class ActiveSubstance {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.activeSubstanceToken = "";
    this.activeSubstanceNameCurrent = "";
    this.activeSubstanceNameEn = "";
    this.activeSubstanceNameAr = "";
    this.activeSubstanceNameUnd = "";
    this.activeSubstanceDescriptionCurrent = "";
    this.activeSubstanceDescriptionEn = "";
    this.activeSubstanceDescriptionAr = "";
    this.activeSubstanceDescriptionUnd = "";
    this.activeSubstanceNotes = "";
    this.activeSubstanceArchiveStatus = "";
  }
  fillData(data) {
    this.activeSubstanceToken = data.activeSubstanceToken;
    this.activeSubstanceNameCurrent = data.activeSubstanceNameCurrent;
    this.activeSubstanceNameEn = data.activeSubstanceNameEn;
    this.activeSubstanceNameAr = data.activeSubstanceNameAr;
    this.activeSubstanceNameUnd = data.activeSubstanceNameUnd;
    this.activeSubstanceDescriptionCurrent =
      data.activeSubstanceDescriptionCurrent;
    this.activeSubstanceDescriptionEn = data.activeSubstanceDescriptionEn;
    this.activeSubstanceDescriptionAr = data.activeSubstanceDescriptionAr;
    this.activeSubstanceDescriptionUnd = data.activeSubstanceDescriptionUnd;
    this.activeSubstanceNotes = data.activeSubstanceNotes;
    this.activeSubstanceArchiveStatus = data.activeSubstanceArchiveStatus;
  }

  async getAllActiveSubstances(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/ActiveSubstances/GetAllActiveSubstances/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getActiveSubstanceDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ActiveSubstances/GetActiveSubstanceDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&activeSubstanceToken=${this.activeSubstanceToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfActiveSubstances(language, userAuthorizeToken) {
    let options = [];
    try {
      let response = await axios.get(
        `/ActiveSubstances/GetDialogOfActiveSubstances?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
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

  async addOrUpdateActiveSubstance(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      activeSubstanceToken: this.activeSubstanceToken,
      activeSubstanceNameEn: this.activeSubstanceNameEn,
      activeSubstanceNameAr: this.activeSubstanceNameAr,
      activeSubstanceNameUnd: this.activeSubstanceNameUnd,
      activeSubstanceDescriptionEn: this.activeSubstanceDescriptionEn,
      activeSubstanceDescriptionAr: this.activeSubstanceDescriptionAr,
      activeSubstanceDescriptionUnd: this.activeSubstanceDescriptionUnd,
      activeSubstanceNotes: this.activeSubstanceNotes,
    };

    try {
      let response = "";
      if (
        this.activeSubstanceToken == "" ||
        this.activeSubstanceToken == undefined
      ) {
        response = await axios.post(
          `/ActiveSubstances/AddActiveSubstance`,
          data
        );
      } else {
        response = await axios.post(
          `/ActiveSubstances/UpdateActiveSubstance`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveActiveSubstance(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      activeSubstanceToken: this.activeSubstanceToken,
    };

    try {
      let response = await axios.post(
        `/ActiveSubstances/ArchiveActiveSubstance`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
