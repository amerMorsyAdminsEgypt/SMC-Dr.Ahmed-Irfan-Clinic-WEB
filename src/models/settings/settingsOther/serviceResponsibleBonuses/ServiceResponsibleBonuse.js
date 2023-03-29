import ServiceResponsibleBonusesDetailsData from "./ServiceResponsibleBonusesDetailsData";
import axios from "axios";
import { PAGE_SIZE } from "@/utils/constants";

export default class ServiceResponsibleBonuse {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.serviceResponsibleBonuseToken = "";
    this.serviceResponsibleBonuseCode = "";
    this.employeeToken = "";
    this.insuranceCompanyNameCurrent = "";
    this.serviceResponsibleBonuseNote = "";
    this.dateTimeActionAdd = "";
    this.dateActionAdd = "";
    this.TimeActionAdd = "";
    this.serviceResponsibleBonuseArchiveStatus = "";
    this.serviceResponsibleBonusesDetailsData = [
      new ServiceResponsibleBonusesDetailsData(),
    ];
  }
  fillData(data) {
    if (data) {
      this.serviceResponsibleBonuseToken =
        data.serviceResponsibleBonuseToken ?? "";
      this.serviceResponsibleBonuseCode =
        data.serviceResponsibleBonuseCode ?? "";
      this.employeeToken = data.employeeToken ?? "";
      this.insuranceCompanyNameCurrent = data.insuranceCompanyNameCurrent ?? "";
      this.serviceResponsibleBonuseNote =
        data.serviceResponsibleBonuseNote ?? "";
      this.dateTimeActionAdd = data.dateTimeActionAdd ?? "";
      this.dateActionAdd = data.dateActionAdd ?? "";
      this.TimeActionAdd = data.TimeActionAdd ?? "";
      this.serviceResponsibleBonuseArchiveStatus =
        data.serviceResponsibleBonuseArchiveStatus ?? "";
      this.serviceResponsibleBonusesDetailsData =
        data.serviceResponsibleBonusesDetailsData ?? [
          new ServiceResponsibleBonusesDetailsData(),
        ];
    } else {
      this.setInitialValue();
    }
  }

  async getAllServiceResponsibleBonuses(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch,
    employeeToken
  ) {
    try {
      let response = await axios.get(
        `/ServiceResponsibleBonuses/GetServiceResponsibleBonuses?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}&employeeToken=${employeeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getServiceResponsibleBonuseDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServiceResponsibleBonuses/GetServiceResponsibleBonusesDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&employeeToken=${this.employeeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async updateServiceResponsibleBonuse(language, userAuthorizeToken) {
    if (!this.serviceResponsibleBonusesDetailsData.length) {
      this.serviceResponsibleBonuseCode = "";
    }
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      employeeToken: this.employeeToken,
      serviceResponsibleBonuseCode: this.serviceResponsibleBonuseCode,
      serviceResponsibleBonuseNote: this.serviceResponsibleBonuseNote,
      serviceResponsibleBonusesDetailsData:
        this.serviceResponsibleBonusesDetailsData,
    };

    try {
      let response = await axios.post(
        `/ServiceResponsibleBonuses//UpdateServiceResponsibleBonuses`,
        data
      );

      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
