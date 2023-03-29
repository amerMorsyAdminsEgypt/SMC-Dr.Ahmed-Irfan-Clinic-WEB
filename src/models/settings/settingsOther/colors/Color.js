import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";

export default class Color {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.colorToken = "";
    this.colorNameCurrent = "";
    this.colorNameAr = "";
    this.colorNameEn = "";
    this.colorNameUnd = "";
    this.colorHexFromat = "";
    this.colorNotes = "";
  }
  fillData(data) {
    if (data) {
      this.colorToken = data.colorToken ?? "";
      this.colorNameCurrent = data.colorNameCurrent ?? "";
      this.colorNameAr = data.colorNameAr ?? "";
      this.colorNameEn = data.colorNameEn ?? "";
      this.colorNameUnd = data.colorNameUnd ?? "";
      this.colorHexFromat = data.colorHexFromat ?? "";
      this.colorNotes = data.colorNotes ?? "";
    } else {
      this.setInitialValue();
    }
  }

  async getAllColors(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/Colors/GetAllColors?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getColorDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Colors/GetColorDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&colorToken=${this.colorToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfColors(language, userAuthorizeToken) {
    let options = [];
    try {
      let response = await axios.get(
        `/Colors/GetDialogOfColors?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      const itemsData = response.data.itemsData;
      if (response.data.status == STATUS.SUCCESS) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["itemToken"],
            text: itemsData[item]["itemName"],
            image: "",
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

  async addOrUpdateColor(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      colorToken: this.colorToken,
      colorNameAr: this.colorNameAr,
      colorNameEn: this.colorNameEn,
      colorHexFromat: this.colorHexFromat,
      colorNotes: this.colorNotes,
    };

    try {
      let response = "";
      if (this.colorToken == "" || this.colorToken == undefined) {
        response = await axios.post(`/Colors/AddColor`, data);
      } else {
        response = await axios.post(`/Colors/UpdateColor`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveColor(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      colorToken: this.colorToken,
    };

    try {
      let response = await axios.post(`/Colors/ArchiveColor`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
