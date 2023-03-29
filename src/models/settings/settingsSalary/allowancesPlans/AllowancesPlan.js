import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import AllowancesPlansSlideDetails from "@/models/settings/settingsSalary/allowancesPlans/AllowancesPlansSlideDetails";

export default class AllowancesPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.allowancesPlansToken = "";
    this.allowancesPlansCode = "";
    this.allowancesPlansNameCurrent = "";
    this.allowancesPlansNameAr = "";
    this.allowancesPlansNameEn = "";
    this.allowancesPlansNameUnd = "";
    this.allowancesPlansNote = "";
    this.dateTimeActionAdd = "";
    this.dateActionAdd = "";
    this.TimeActionAdd = "";
    this.allowancesPlansArchiveStatus = "";
    this.allowancesPlansSlidesDetailsData = [new AllowancesPlansSlideDetails()];
  }
  fillData(data) {
    this.allowancesPlansToken = data.allowancesPlansToken;
    this.allowancesPlansCode = data.allowancesPlansCode;
    this.allowancesPlansNameCurrent = data.allowancesPlansNameCurrent;
    this.allowancesPlansNameAr = data.allowancesPlansNameAr;
    this.allowancesPlansNameEn = data.allowancesPlansNameEn;
    this.allowancesPlansNameUnd = data.allowancesPlansNameUnd;
    this.allowancesPlansNote = data.allowancesPlansNote;
    this.dateTimeActionAdd = data.dateTimeActionAdd;
    this.dateActionAdd = data.dateActionAdd;
    this.TimeActionAdd = data.TimeActionAdd;
    this.allowancesPlansArchiveStatus = data.allowancesPlansArchiveStatus;
    this.allowancesPlansSlidesDetailsData =
      data.allowancesPlansSlidesDetailsData;
  }

  async getAllowancesPlanses(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/AllowancesPlans/GetAllowancesPlanses?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getAllowancesPlanDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/AllowancesPlans/GetAllowancesPlansDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&allowancesPlansToken=${this.allowancesPlansToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfAllowancesPlans(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/AllowancesPlans/GetDialogOfAllowancesPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateAllowancesPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      allowancesPlansToken: this.allowancesPlansToken,
      allowancesPlansCode: this.allowancesPlansCode,
      allowancesPlansNameAr: this.allowancesPlansNameAr,
      allowancesPlansNameEn: this.allowancesPlansNameEn,
      allowancesPlansNameUnd: this.allowancesPlansNameUnd,
      allowancesPlansNote: this.allowancesPlansNote,
      allowancesPlansSlidesDetailsData: this.allowancesPlansSlidesDetailsData,
    };

    try {
      let response = "";
      if (
        this.allowancesPlansToken == "" ||
        this.allowancesPlansToken == undefined
      ) {
        response = await axios.post(
          `/AllowancesPlans//AddAllowancesPlans`,
          data
        );
      } else {
        response = await axios.post(
          `/AllowancesPlans//UpdateAllowancesPlans`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveAllowancesPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      allowancesPlansToken: this.allowancesPlansToken,
    };

    try {
      let response = await axios.post(
        `/AllowancesPlans//ArchiveAllowancesPlans`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
