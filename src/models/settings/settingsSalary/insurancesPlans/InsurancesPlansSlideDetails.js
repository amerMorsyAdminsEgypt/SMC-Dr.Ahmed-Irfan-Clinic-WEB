import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class InsurancesPlansSlideDetails {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.insurancesPlansSlidesDetailsToken = "";
    this.insurancesPlansToken = "";
    this.insurancesPlansNameCurrent = "";
    this.employeeBasicSalaryFrom = "";
    this.employeeBasicSalaryTo = "";
    this.employeeBasicSalaryPercentage = "";
    this.employeeBasicSalaryDeductionStatus = "";
    this.employeeVariableSalaryFrom = "";
    this.employeeVariableSalaryTo = "";
    this.employeeVariableSalaryPercentage = "";
    this.employeeVariableSalaryDeductionStatus = "";
    this.employeeTotalSalaryFrom = "";
    this.employeeTotalSalaryTo = "";
    this.employeeTotalSalaryPercentage = "";
    this.employeeTotalSalaryDeductionStatus = "";
    this.planTypeToken = "";
    this.planTypeNameEn = "";
    this.planTypeNameAr = "";
    this.planTypeNameUnd = "";
    this.planTypeNameCurrent = "";
    this.insurancesPlansSlidesDetailsNote = "";
    this.insurancesPlansSlidesDetailsArchiveStatus = "";
  }
  fillData(data) {
    this.insurancesPlansSlidesDetailsToken =
      data.insurancesPlansSlidesDetailsToken;
    this.insurancesPlansToken = data.insurancesPlansToken;
    this.insurancesPlansNameCurrent = data.insurancesPlansNameCurrent;
    this.employeeBasicSalaryFrom = data.employeeBasicSalaryFrom;
    this.employeeBasicSalaryTo = data.employeeBasicSalaryTo;
    this.employeeBasicSalaryPercentage = data.employeeBasicSalaryPercentage;
    this.employeeBasicSalaryDeductionStatus =
      data.employeeBasicSalaryDeductionStatus;
    this.employeeVariableSalaryFrom = data.employeeVariableSalaryFrom;
    this.employeeVariableSalaryTo = data.employeeVariableSalaryTo;
    this.employeeVariableSalaryPercentage =
      data.employeeVariableSalaryPercentage;
    this.employeeVariableSalaryDeductionStatus =
      data.employeeVariableSalaryDeductionStatus;
    this.employeeTotalSalaryFrom = data.employeeTotalSalaryFrom;
    this.employeeTotalSalaryTo = data.employeeTotalSalaryTo;
    this.employeeTotalSalaryPercentage = data.employeeTotalSalaryPercentage;
    this.employeeTotalSalaryDeductionStatus =
      data.employeeTotalSalaryDeductionStatus;
    this.planTypeToken = data.planTypeToken;
    this.planTypeNameEn = data.planTypeNameEn;
    this.planTypeNameAr = data.planTypeNameAr;
    this.planTypeNameUnd = data.planTypeNameUnd;
    this.planTypeNameCurrent = data.planTypeNameCurrent;
    this.insurancesPlansSlidesDetailsNote =
      data.insurancesPlansSlidesDetailsNote;
    this.insurancesPlansSlidesDetailsArchiveStatus =
      data.insurancesPlansSlidesDetailsArchiveStatus;
  }

  async getAllInsurancesPlansSlidesDetails(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/InsurancesPlansSlidesDetails/GetAllInsurancesPlansSlidesDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getInsurancesPlansSlidesDetailsDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/InsurancesPlansSlidesDetails/GetInsurancesPlansSlidesDetailsDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&insurancesPlansSlidesDetailsToken=${this.insurancesPlansSlidesDetailsToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateInsurancesPlansSlidesDetails(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      insurancesPlansSlidesDetailsToken: this.insurancesPlansSlidesDetailsToken,
      insurancesPlansToken: this.insurancesPlansToken,
      employeeBasicSalaryFrom: this.employeeBasicSalaryFrom,
      employeeBasicSalaryTo: this.employeeBasicSalaryTo,
      employeeBasicSalaryPercentage: this.employeeBasicSalaryPercentage,
      employeeBasicSalaryDeductionStatus:
        this.employeeBasicSalaryDeductionStatus,
      employeeVariableSalaryFrom: this.employeeVariableSalaryFrom,
      employeeVariableSalaryTo: this.employeeVariableSalaryTo,
      employeeVariableSalaryPercentage: this.employeeVariableSalaryPercentage,
      employeeVariableSalaryDeductionStatus:
        this.employeeVariableSalaryDeductionStatus,
      employeeTotalSalaryPercentage: this.employeeTotalSalaryPercentage,
      employeeTotalSalaryDeductionStatus:
        this.employeeTotalSalaryDeductionStatus,
      planTypeToken: this.planTypeToken,
      insurancesPlansSlidesDetailsNote: this.insurancesPlansSlidesDetailsNote,
    };

    try {
      let response = "";
      if (
        this.insurancesPlansSlidesDetailsToken == "" ||
        this.insurancesPlansSlidesDetailsToken == undefined
      ) {
        response = await axios.post(
          `/InsurancesPlansSlidesDetails//AddInsurancesPlansSlidesDetails`,
          data
        );
      } else {
        response = await axios.post(
          `/InsurancesPlansSlidesDetails//UpdatInsurancesPlansSlidesDetails`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveInsurancesPlansSlidesDetails(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      insurancesPlansSlidesDetailsToken: this.insurancesPlansSlidesDetailsToken,
    };

    try {
      let response = await axios.post(
        `/InsurancesPlansSlidesDetails//ArchiveInsurancesPlansSlidesDetails`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
