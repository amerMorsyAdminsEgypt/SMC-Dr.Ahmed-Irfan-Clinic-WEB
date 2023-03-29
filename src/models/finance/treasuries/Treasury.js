import { STATUS, PAGE_SIZE, BASE_URL } from "@/utils/constants";
import axios from "axios";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";

export default class Treasury {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.treasuryToken = "";
    this.treasuryCode = "";
    this.branchToken = "";
    this.branchNameCurrent = "";
    this.treasuryNameCurrent = "";
    this.treasuryNameEn = "";
    this.treasuryNameAr = "";
    this.treasuryNameUnd = "";
    this.treasuryMoney = "";
    this.treasuryNote = "";
    this.actionDateTime = "";
    this.actionDate = "";
    this.actionTime = "";
    this.treasuryArchiveStatus = "";
  }
  fillData(treasuryData) {
    this.treasuryToken = treasuryData.treasuryToken;
    this.treasuryCode = treasuryData.treasuryCode;
    this.branchToken = treasuryData.branchToken;
    this.branchNameCurrent = treasuryData.branchNameCurrent;
    this.treasuryNameCurrent = treasuryData.treasuryNameCurrent;
    this.treasuryNameEn = treasuryData.treasuryNameEn;
    this.treasuryNameAr = treasuryData.treasuryNameAr;
    this.treasuryNameUnd = treasuryData.treasuryNameUnd;
    this.treasuryMoney = treasuryData.treasuryMoney;
    this.treasuryNote = treasuryData.treasuryNote;
    this.actionDateTime = treasuryData.actionDateTime;
    this.actionDate = treasuryData.actionDate;
    this.actionTime = treasuryData.actionTime;
    this.treasuryArchiveStatus = treasuryData.treasuryArchiveStatus;
  }

  async getAllTreasuries(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/Treasuries/GetAllTreasuries?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getTreasuryDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Treasuries/GetTreasuryDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&treasuryToken=${this.treasuryToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfTreasuries(language, userAuthorizeToken) {
    let options = [];
    options.push({
      value: "",
      text: i18n.t("selectTreasury"),
      image: "",
    });
    try {
      let response = await axios.get(
        `/Treasuries/GetDialogOfTreasuries?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
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

  async addOrUpdateTreasury(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      treasuryToken: this.treasuryToken,
      branchToken: this.branchToken,
      treasuryCode: this.treasuryCode,
      treasuryNameEn: this.treasuryNameEn,
      treasuryNameAr: this.treasuryNameAr,
      treasuryNameUnd: this.treasuryNameUnd,
      treasuryNote: this.treasuryNote,
    };

    try {
      let response = "";
      if (this.treasuryToken == "" || this.treasuryToken == undefined) {
        response = await axios.post(`/Treasuries/AddTreasury`, data);
      } else {
        response = await axios.post(`/Treasuries/UpdateTreasury`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveTreasury(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      treasuryToken: this.treasuryToken,
    };

    try {
      let response = await axios.post(`/Treasuries/ArchiveTreasury`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
