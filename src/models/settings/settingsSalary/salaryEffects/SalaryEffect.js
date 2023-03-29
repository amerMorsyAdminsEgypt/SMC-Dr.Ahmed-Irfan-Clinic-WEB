import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class SalaryEffect {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.employeeSalaryEffectToken = "";
    this.employeeSalaryEffectNameCurrent = "";
    this.employeeSalaryEffectNameEn = "";
    this.employeeSalaryEffectNameAr = "";
    this.employeeSalaryEffectNameUnd = "";
    this.employeeSalaryEffectTypeToken = "";
    this.employeeSalaryEffectTypeNameEn = "";
    this.employeeSalaryEffectTypeNameAr = "";
    this.employeeSalaryEffectTypeNameUnd = "";
    this.calculationMethodTypeToken = "";
    this.calculationMethodTypeNameEn = "";
    this.calculationMethodTypeNameAr = "";
    this.calculationMethodTypeNameUnd = "";
    this.defaultValue = "";
    this.employeeSalaryEffectFeeTypeToken = "";
    this.employeeSalaryEffectFeeTypeNameEn = "";
    this.employeeSalaryEffectFeeTypeNameAr = "";
    this.employeeSalaryEffectFeeTypeNameUnd = "";
    this.employeeSalaryEffectNotes = "";
    this.employeeSalaryEffectArchiveStatus = "";
    this.actionDateTime = "";
    this.actionDate = "";
    this.actionTime = "";
  }
  fillData(data) {
    this.employeeSalaryEffectToken = data.employeeSalaryEffectToken;
    this.employeeSalaryEffectNameCurrent = data.employeeSalaryEffectNameCurrent;
    this.employeeSalaryEffectNameEn = data.employeeSalaryEffectNameEn;
    this.employeeSalaryEffectNameAr = data.employeeSalaryEffectNameAr;
    this.employeeSalaryEffectNameUnd = data.employeeSalaryEffectNameUnd;
    this.employeeSalaryEffectTypeToken = data.employeeSalaryEffectTypeToken;
    this.employeeSalaryEffectTypeNameEn = data.employeeSalaryEffectTypeNameEn;
    this.employeeSalaryEffectTypeNameAr = data.employeeSalaryEffectTypeNameAr;
    this.employeeSalaryEffectTypeNameUnd = data.employeeSalaryEffectTypeNameUnd;
    this.calculationMethodTypeToken = data.calculationMethodTypeToken;
    this.calculationMethodTypeNameEn = data.calculationMethodTypeNameEn;
    this.calculationMethodTypeNameAr = data.calculationMethodTypeNameAr;
    this.calculationMethodTypeNameUnd = data.calculationMethodTypeNameUnd;
    this.defaultValue = data.defaultValue;
    this.employeeSalaryEffectFeeTypeToken =
      data.employeeSalaryEffectFeeTypeToken;
    this.employeeSalaryEffectFeeTypeNameEn =
      data.employeeSalaryEffectFeeTypeNameEn;
    this.employeeSalaryEffectFeeTypeNameAr =
      data.employeeSalaryEffectFeeTypeNameAr;
    this.employeeSalaryEffectFeeTypeNameUnd =
      data.employeeSalaryEffectFeeTypeNameUnd;
    this.employeeSalaryEffectNotes = data.employeeSalaryEffectNotes;
    this.employeeSalaryEffectArchiveStatus =
      data.employeeSalaryEffectArchiveStatus;
    this.actionDateTime = data.actionDateTime;
    this.actionDate = data.actionDate;
    this.actionTime = data.actionTime;
  }

  async getAllEmployeeSalaryEffects(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch,
    employeeSalaryEffectTypeToken,
    calculationMethodTypeToken,
    employeeSalaryEffectFeeTypeToken
  ) {
    try {
      let response = await axios.get(
        `/EmployeeSalaryEffect/GetAllEmployeeSalaryEffect?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&employeeSalaryEffectTypeToken=${employeeSalaryEffectTypeToken}&calculationMethodTypeToken=${calculationMethodTypeToken}&employeeSalaryEffectFeeTypeToken=${employeeSalaryEffectFeeTypeToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getEmployeeSalaryEffectDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/EmployeeSalaryEffect/GetEmployeeSalaryEffectDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&employeeSalaryEffectToken=${this.employeeSalaryEffectToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfEmployeeSalaryEffect(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/EmployeeSalaryEffect/GetDialogOfEmployeeSalaryEffect?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateEmployeeSalaryEffect(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      employeeSalaryEffectToken: this.employeeSalaryEffectToken,
      employeeSalaryEffectNameEn: this.employeeSalaryEffectNameEn,
      employeeSalaryEffectNameAr: this.employeeSalaryEffectNameAr,
      employeeSalaryEffectNameUnd: this.employeeSalaryEffectNameUnd,
      employeeSalaryEffectTypeToken: this.employeeSalaryEffectTypeToken,
      calculationMethodTypeToken: this.calculationMethodTypeToken,
      employeeSalaryEffectFeeTypeToken: this.employeeSalaryEffectFeeTypeToken,
      defaultValue: this.defaultValue,
      employeeSalaryEffectNotes: this.employeeSalaryEffectNotes,
    };

    try {
      let response = "";
      if (
        this.employeeSalaryEffectToken == "" ||
        this.employeeSalaryEffectToken == undefined
      ) {
        response = await axios.post(
          `/EmployeeSalaryEffect/AddEmployeeSalaryEffect`,
          data
        );
      } else {
        response = await axios.post(
          `/EmployeeSalaryEffect/UpdateEmployeeSalaryEffect`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveEmployeeSalaryEffect(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      employeeSalaryEffectToken: this.employeeSalaryEffectToken,
    };

    try {
      let response = await axios.post(
        `/EmployeeSalaryEffect/ArchiveEmployeeSalaryEffect`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
