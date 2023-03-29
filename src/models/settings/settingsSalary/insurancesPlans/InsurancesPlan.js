import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import InsurancesPlansSlideDetails from "@/models/settings/settingsSalary/insurancesPlans/InsurancesPlansSlideDetails";

export default class InsurancesPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.insurancesPlansToken = "";
    this.insurancesPlansCode = "";
    this.insurancesPlansNameCurrent = "";
    this.insurancesPlansNameAr = "";
    this.insurancesPlansNameEn = "";
    this.insurancesPlansNameUnd = "";
    this.insurancesPlansNote = "";
    this.planActivationStatus = "";
    this.dateTimeActionAdd = "";
    this.dateActionAdd = "";
    this.TimeActionAdd = "";
    this.insurancesPlansArchiveStatus = "";
    this.insurancesPlansSlidesDetailsData = [new InsurancesPlansSlideDetails()];
  }
  fillData(data) {
    this.insurancesPlansToken = data.insurancesPlansToken;
    this.insurancesPlansCode = data.insurancesPlansCode;
    this.insurancesPlansNameCurrent = data.insurancesPlansNameCurrent;
    this.insurancesPlansNameAr = data.insurancesPlansNameAr;
    this.insurancesPlansNameEn = data.insurancesPlansNameEn;
    this.insurancesPlansNameUnd = data.insurancesPlansNameUnd;
    this.insurancesPlansNote = data.insurancesPlansNote;
    this.planActivationStatus = data.planActivationStatus;
    this.dateTimeActionAdd = data.dateTimeActionAdd;
    this.dateActionAdd = data.dateActionAdd;
    this.TimeActionAdd = data.TimeActionAdd;
    this.insurancesPlansArchiveStatus = data.insurancesPlansArchiveStatus;
    this.insurancesPlansSlidesDetailsData =
      data.insurancesPlansSlidesDetailsData;
  }

  async getInsurancesPlanses(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/InsurancesPlans/GetInsurancesPlanses?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getInsurancesPlanDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/InsurancesPlans/GetInsurancesPlansDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&insurancesPlansToken=${this.insurancesPlansToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfInsurancesPlans(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/InsurancesPlans/GetDialogOfInsurancesPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateInsurancesPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      insurancesPlansToken: this.insurancesPlansToken,
      insurancesPlansCode: this.insurancesPlansCode,
      insurancesPlansNameAr: this.insurancesPlansNameAr,
      insurancesPlansNameEn: this.insurancesPlansNameEn,
      insurancesPlansNameUnd: this.insurancesPlansNameUnd,
      planActivationStatus: this.planActivationStatus,
      insurancesPlansNote: this.insurancesPlansNote,
      insurancesPlansSlidesDetailsData: this.insurancesPlansSlidesDetailsData,
    };

    try {
      let response = "";
      if (
        this.insurancesPlansToken == "" ||
        this.insurancesPlansToken == undefined
      ) {
        response = await axios.post(
          `/InsurancesPlans//AddInsurancesPlans`,
          data
        );
      } else {
        response = await axios.post(
          `/InsurancesPlans//UpdateInsurancesPlans`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveInsurancesPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      insurancesPlansToken: this.insurancesPlansToken,
    };

    try {
      let response = await axios.post(
        `/InsurancesPlans//ArchiveInsurancesPlans`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
