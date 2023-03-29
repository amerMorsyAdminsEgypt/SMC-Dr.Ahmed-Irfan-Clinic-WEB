import InsuranceCompanyServicesDetailsData from "../insuranceCompanyServicesDetails/InsuranceCompanyServicesDetailsData";
import axios from "axios";
import { PAGE_SIZE } from "@/utils/constants";
// import { STATUS, PAGE_SIZE } from "@/utils/constants";
export default class InsuranceCompanyService {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.insuranceCompanyServiceToken = "";
    this.insuranceCompanyServiceCode = "";
    this.insuranceCompanyToken = "";
    this.insuranceCompanyNameCurrent = "";
    this.insuranceCompanyServiceNote = "";
    this.dateTimeActionAdd = "";
    this.dateActionAdd = "";
    this.TimeActionAdd = "";
    this.insuranceCompanyServiceArchiveStatus = "";
    this.insuranceCompanyServicesDetailsData = [
      new InsuranceCompanyServicesDetailsData(),
    ];
  }
  fillData(data) {
    if (data) {
      this.insuranceCompanyServiceToken =
        data.insuranceCompanyServiceToken ?? "";
      this.insuranceCompanyServiceCode = data.insuranceCompanyServiceCode ?? "";
      this.insuranceCompanyToken = data.insuranceCompanyToken ?? "";
      this.insuranceCompanyNameCurrent = data.insuranceCompanyNameCurrent ?? "";
      this.insuranceCompanyServiceNote = data.insuranceCompanyServiceNote ?? "";
      this.dateTimeActionAdd = data.dateTimeActionAdd ?? "";
      this.dateActionAdd = data.dateActionAdd ?? "";
      this.TimeActionAdd = data.TimeActionAdd ?? "";
      this.insuranceCompanyServiceArchiveStatus =
        data.insuranceCompanyServiceArchiveStatus ?? "";
      this.insuranceCompanyServicesDetailsData =
        data.insuranceCompanyServicesDetailsData ?? [
          new InsuranceCompanyServicesDetailsData(),
        ];
    } else {
      this.setInitialValue();
    }
  }

  async getAllInsuranceCompanyServices(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch,
    insuranceCompanyToken
  ) {
    try {
      let response = await axios.get(
        `/InsuranceCompanyServices/GetInsuranceCompanyServices?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}&insuranceCompanyToken=${insuranceCompanyToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getInsuranceCompanyServiceDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/InsuranceCompanyServices/GetInsuranceCompanyServicesDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&insuranceCompanyToken=${this.insuranceCompanyToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async updateInsuranceCompanyService(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      insuranceCompanyServiceToken: this.insuranceCompanyServiceToken,
      insuranceCompanyServiceCode: this.insuranceCompanyServiceCode,
      insuranceCompanyToken: this.insuranceCompanyToken,
      insuranceCompanyServiceNote: this.insuranceCompanyServiceNote,
      insuranceCompanyServicesDetailsData:
        this.insuranceCompanyServicesDetailsData,
    };

    try {
      let response = await axios.post(
        `/InsuranceCompanyServices//UpdateInsuranceCompanyServices`,
        data
      );

      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveInsuranceCompanyService(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      insuranceCompanyServiceToken: this.insuranceCompanyServiceToken,
    };

    try {
      let response = await axios.post(
        `/InsuranceCompanyServices//ArchiveInsuranceCompanyServices`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
