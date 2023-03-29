import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class StoreTime {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.storeTimeToken = "";
    this.storeToken = "";
    this.storeNameEn = "";
    this.storeNameAr = "";
    this.storeNameUnd = "";
    this.timeNameAr = "";
    this.timeNameEn = "";
    this.storeOpenTime = "";
    this.storeCloseTime = "";
    this.dayToken = "";
    this.dayNameAr = "";
    this.dayNameEn = "";
    this.storeTimeNotes = "";
    this.storeTimeArchiveStatus = "";
  }
  fillData(data) {
    this.storeTimeToken = data.storeTimeToken;
    this.storeToken = data.storeToken;
    this.storeNameEn = data.storeNameEn;
    this.storeNameAr = data.storeNameAr;
    this.storeNameUnd = data.storeNameUnd;
    this.timeNameAr = data.timeNameAr;
    this.timeNameEn = data.timeNameEn;
    this.storeOpenTime = data.storeOpenTime;
    this.storeCloseTime = data.storeCloseTime;
    this.dayToken = data.dayToken;
    this.dayNameAr = data.dayNameAr;
    this.dayNameEn = data.dayNameEn;
    this.storeTimeNotes = data.storeTimeNotes;
    this.storeTimeArchiveStatus = data.storeTimeArchiveStatus;
  }

  async getAllStoresTimes(
    language,
    userAuthorizeToken,
    selfPage,
    dayToken,
    storeToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/StoresTimes/GetAllStoresTimes?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&dayToken=${dayToken}&storeToken=${storeToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getStoreTimeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/StoreesTimes/GetStoreTimeDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&storeTimeToken=${this.storeTimeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateStoreTime(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      storeTimeToken: this.storeTimeToken,
      storeToken: this.storeToken,
      dayToken: this.dayToken,
      storeOpenTime: this.storeOpenTime,
      storeCloseTime: this.storeCloseTime,
      storeTimeNotes: this.storeTimeNotes,
    };

    try {
      let response = "";
      if (this.storeTimeToken == "" || this.storeTimeToken == undefined) {
        response = await axios.post(`/StoresTimes/AddStoreTime`, data);
      } else {
        response = await axios.post(`/StoresTimes/UpdateStoreTime`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveStoreTime(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      storeTimeToken: this.storeTimeToken,
    };

    try {
      let response = await axios.post(`/StoresTimes/ArchiveStoreTime`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
