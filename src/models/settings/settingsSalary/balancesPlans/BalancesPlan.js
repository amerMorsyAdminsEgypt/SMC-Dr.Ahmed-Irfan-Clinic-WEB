import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import BalancesPlansSlideDetails from "@/models/settings/settingsSalary/balancesPlans/BalancesPlansSlideDetails";

export default class BalancesPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.balancesPlansToken = "";
    this.balancesPlansCode = "";
    this.balancesPlansNameCurrent = "";
    this.balancesPlansNameAr = "";
    this.balancesPlansNameEn = "";
    this.balancesPlansNameUnd = "";
    this.balancesPlansNote = "";
    this.dateTimeActionAdd = "";
    this.dateActionAdd = "";
    this.TimeActionAdd = "";
    this.balancesPlansArchiveStatus = "";
    this.balancesPlansSlidesDetailsData = [new BalancesPlansSlideDetails()];
  }
  fillData(data) {
    this.balancesPlansToken = data.balancesPlansToken;
    this.balancesPlansCode = data.balancesPlansCode;
    this.balancesPlansNameCurrent = data.balancesPlansNameCurrent;
    this.balancesPlansNameAr = data.balancesPlansNameAr;
    this.balancesPlansNameEn = data.balancesPlansNameEn;
    this.balancesPlansNameUnd = data.balancesPlansNameUnd;
    this.balancesPlansNote = data.balancesPlansNote;
    this.dateTimeActionAdd = data.dateTimeActionAdd;
    this.dateActionAdd = data.dateActionAdd;
    this.TimeActionAdd = data.TimeActionAdd;
    this.balancesPlansArchiveStatus = data.balancesPlansArchiveStatus;
    this.balancesPlansSlidesDetailsData = data.balancesPlansSlidesDetailsData;
  }

  async getBalancesPlanses(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/BalancesPlans/GetBalancesPlanses?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getBalancesPlanDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/BalancesPlans/GetBalancesPlansDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&balancesPlansToken=${this.balancesPlansToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfBalancesPlans(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/BalancesPlans/GetDialogOfBalancesPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateBalancesPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      balancesPlansToken: this.balancesPlansToken,
      balancesPlansCode: this.balancesPlansCode,
      balancesPlansNameAr: this.balancesPlansNameAr,
      balancesPlansNameEn: this.balancesPlansNameEn,
      balancesPlansNameUnd: this.balancesPlansNameUnd,
      balancesPlansNote: this.balancesPlansNote,
      balancesPlansSlidesDetailsData: this.balancesPlansSlidesDetailsData,
    };

    try {
      let response = "";
      if (
        this.balancesPlansToken == "" ||
        this.balancesPlansToken == undefined
      ) {
        response = await axios.post(`/BalancesPlans//AddBalancesPlans`, data);
      } else {
        response = await axios.post(
          `/BalancesPlans//UpdateBalancesPlans`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveBalancesPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      balancesPlansToken: this.balancesPlansToken,
    };

    try {
      let response = await axios.post(
        `/BalancesPlans//ArchiveBalancesPlans`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
