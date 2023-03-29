import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class BranchTime {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.branchTimeToken = "";
    this.branchToken = "";
    this.branchNameEn = "";
    this.branchNameAr = "";
    this.branchNameUnd = "";
    this.timeNameAr = "";
    this.timeNameEn = "";
    this.branchOpenTime = "";
    this.branchCloseTime = "";
    this.dayToken = "";
    this.dayNameAr = "";
    this.dayNameEn = "";
    this.branchTimeNotes = "";
    this.branchTimeArchiveStatus = "";
  }
  fillData(data) {
    this.branchTimeToken = data.branchTimeToken;
    this.branchToken = data.branchToken;
    this.branchNameEn = data.branchNameEn;
    this.branchNameAr = data.branchNameAr;
    this.branchNameUnd = data.branchNameUnd;
    this.timeNameAr = data.timeNameAr;
    this.timeNameEn = data.timeNameEn;
    this.branchOpenTime = data.branchOpenTime;
    this.branchCloseTime = data.branchCloseTime;
    this.dayToken = data.dayToken;
    this.dayNameAr = data.dayNameAr;
    this.dayNameEn = data.dayNameEn;
    this.branchTimeNotes = data.branchTimeNotes;
    this.branchTimeArchiveStatus = data.branchTimeArchiveStatus;
  }

  async getAllBranchesTimes(
    language,
    userAuthorizeToken,
    selfPage,
    dayToken,
    branchToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/BranchesTimes/GetAllBranchesTimes?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&dayToken=${dayToken}&branchToken=${branchToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getBranchTimeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/BranchesTimes/GetBranchTimeDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&branchTimeToken=${this.branchTimeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  // async addBranch(language, userAuthorizeToken) {
  //   var data = {
  //     language: language,
  //     userAuthorizeToken: userAuthorizeToken,
  //     branchToken: this.branchToken,
  //     dayToken: this.dayToken,
  //     branchOpenTime: this.branchOpenTime,
  //     branchCloseTime: this.branchCloseTime,
  //     branchTimeNotes: this.branchTimeNotes,
  //   };

  //   try {
  //     let response = await axios.post(`/BranchesTimes/AddBranchTime`, data);
  //     return response;
  //   } catch (e) {
  //     return this.$t("errorCatch");
  //   }
  // }

  async addOrUpdateBranchTime(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      branchTimeToken: this.branchTimeToken,
      branchToken: this.branchToken,
      dayToken: this.dayToken,
      branchOpenTime: this.branchOpenTime,
      branchCloseTime: this.branchCloseTime,
      branchTimeNotes: this.branchTimeNotes,
    };

    try {
      let response = "";
      if (this.branchTimeToken == "" || this.branchTimeToken == undefined) {
        response = await axios.post(`/BranchesTimes/AddBranchTime`, data);
      } else {
        response = await axios.post(`/BranchesTimes/UpdateBranchTime`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveBranchTime(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      branchTimeToken: this.branchTimeToken,
    };

    try {
      let response = await axios.post(`/BranchesTimes/ArchiveBranchTime`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
