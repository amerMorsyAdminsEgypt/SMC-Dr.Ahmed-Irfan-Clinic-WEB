import { BASE_URL } from "@/utils/constants";
import { date2slash } from "@/utils/functions";
import axios from "axios";

export default class Revenue {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.revenuesToken = "";
    this.userToken = "";
    this.userNameCurrent = "";
    this.revenuesCode = "";
    this.treasuryToken = "";
    this.treasuryNameCurrent = "";
    this.branchToken = "";
    this.branchNameCurrent = "";
    this.revenuesTypeToken = "";
    this.revenuesTypeNameCurrent = "";
    this.revenuesDatePayed = "";
    this.revenuesDateTimeAction = "";
    this.revenuesDateAction = "";
    this.revenuesTimeAction = "";
    this.revenuesMoneyValue = "";
    this.revenuesImagePath = "";
    this.imageSrc = BASE_URL + this.revenuesImagePath;
    this.revenuesNotes = "";
    this.userTokenReturned = "";
    this.userNameCurrentReturned = "";
    this.revenuesReturnedDateTime = "";
    this.revenuesReturnedDate = "";
    this.revenuesReturnedTime = "";
    this.revenuesReturnedNote = "";
    this.revenuesReturnedStatus = "";
    this.revenuesArchiveStatus = "";
    this.dateFrom = "";
    this.dateTo = "";
  }
  fillData(revenueData) {
    this.image = revenueData.image;
    this.revenuesToken = revenueData.revenuesToken;
    this.userToken = revenueData.userToken;
    this.userNameCurrent = revenueData.userNameCurrent;
    this.revenuesCode = revenueData.revenuesCode;
    this.treasuryToken = revenueData.treasuryToken;
    this.treasuryNameCurrent = revenueData.treasuryNameCurrent;
    this.branchToken = revenueData.branchToken;
    this.branchNameCurrent = revenueData.branchNameCurrent;
    this.revenuesTypeToken = revenueData.revenuesTypeToken;
    this.revenuesTypeNameCurrent = revenueData.revenuesTypeNameCurrent;
    this.revenuesDatePayed = revenueData.revenuesDatePayed;
    this.revenuesDateTimeAction = revenueData.revenuesDateTimeAction;
    this.revenuesDateAction = revenueData.revenuesDateAction;
    this.revenuesTimeAction = revenueData.revenuesTimeAction;
    this.revenuesMoneyValue = revenueData.revenuesMoneyValue;
    this.revenuesImagePath = revenueData.revenuesImagePath;
    this.imageSrc = BASE_URL + revenueData.revenuesImagePath;
    this.revenuesNotes = revenueData.revenuesNotes;
    this.userTokenReturned = revenueData.userTokenReturned;
    this.userNameCurrentReturned = revenueData.userNameCurrentReturned;
    this.revenuesReturnedDateTime = revenueData.revenuesReturnedDateTime;
    this.revenuesReturnedDate = revenueData.revenuesReturnedDate;
    this.revenuesReturnedTime = revenueData.revenuesReturnedTime;
    this.revenuesReturnedNote = revenueData.revenuesReturnedNote;
    this.revenuesReturnedStatus = revenueData.revenuesReturnedStatus;
    this.revenuesArchiveStatus = revenueData.revenuesArchiveStatus;
    this.dateFrom = revenueData.dateFrom;
    this.dateTo = revenueData.dateTo;
  }

  async getRevenueDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Revenues/GetRevenuesDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&revenuesToken=${this.revenuesToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addRevenue(language, userAuthorizeToken) {
    var data = {
      image: this.image,
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      revenuesTypeToken: this.revenuesTypeToken,
      treasuryToken: this.treasuryToken,
      branchToken: this.branchToken,
      revenuesDatePayed: date2slash(this.revenuesDatePayed),
      revenuesMoneyValue: this.revenuesMoneyValue,
      revenuesNotes: this.revenuesNotes,
    };
    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (this.image != "" && this.image != undefined) {
        response = await axios.post(`/Revenues/AddRevenuesWithImage`, formData);
      } else {
        response = await axios.post(`/Revenues/AddRevenuesWithoutImage`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async refundRevenue(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      revenuesToken: this.revenuesToken,
    };

    try {
      let response = await axios.post(`/Revenues/RefundRevenues`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
