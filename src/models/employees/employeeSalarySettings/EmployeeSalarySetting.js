import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class EmployeeSalarySetting {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.employeeSalarySettingToken = "";
    this.employeeToken = "";
    this.employeeNameCurrent = "";
    this.employeeSalarySettingNameCurrent = "";
    this.employeeSalarySettingNameEn = "";
    this.employeeSalarySettingNameAr = "";
    this.employeeSalarySettingNameUnd = "";
    this.employeeSalarySettingDescriptionCurrent = "";
    this.employeeSalarySettingDescriptionEn = "";
    this.employeeSalarySettingDescriptionAr = "";
    this.employeeSalarySettingDescriptionUnd = "";
    this.employeeSalarySettingNotes = "";
    this.employeeSalarySettingActivationStatus = "";

    this.employeeBasicSalary = "";
    this.employeeVariableSalary = "";
    this.employeeTotalSalary = "";

    this.employeeWorkDaysNumberPerMonth = "";
    this.employeeWorkHoursNumberPerDay = "";
    this.employeeWorkHourPrice = "";

    this.employeeMaximumAllowedAttendLateInDayByHours24 = "";
    this.employeeMaximumAllowedAttendLateInDayStatus = "";

    this.employeeMaximumAllowedAttendLateInMonthByHours24 = "";
    this.employeeMaximumAllowedAttendLateInMonthByDays = "";
    this.employeeMaximumAllowedAttendLateInMonthStatus = "";

    this.employeeMaximumAllowedEarlyDepartureInDayByHours24 = "";
    this.employeeMaximumAllowedEarlyDepartureInDayStatus = "";

    this.employeeMaximumAllowedEarlyDepartureInMonthByHours24 = "";
    this.employeeMaximumAllowedEarlyDepartureInMonthByDays = "";
    this.employeeMaximumAllowedEarlyDepartureInMonthStatus = "";

    this.employeeMaximumAllowedOverTimeInDayByHours24 = "";
    this.employeeMaximumAllowedOverTimeInDayStatus = "";

    this.employeeMaximumAllowedOverTimeInMonthByHours24 = "";
    this.employeeMaximumAllowedOverTimeInMonthByDays = "";
    this.employeeMaximumAllowedOverTimeInMonthStatus = "";

    this.employeeMaximumAllowedShiftAbsenceUntillSalaryStop = "";
    this.employeeMaximumAllowedShiftAbsenceUntillSalaryStopStatus = "";

    this.employeeOverTimeStartInDayByHours24 = "";
    this.employeeOverTimeStartInDayStatus = "";

    this.employeeDeductionFactorValueCaseLate = "";
    this.employeeDeductionPriceCaseLateStatus = "";

    this.employeeDeductionFactorValueCaseEarlyDeparture = "";
    this.employeeDeductionFactorValueCaseEarlyDepartureStatus = "";

    this.employeeBalancePlanToken = "";
    this.employeeBalancePlanNameCurrent = "";

    this.employeeAllowancePlanToken = "";
    this.employeeAllowancePlanNameCurrent = "";

    this.employeeAbsencePlanToken = "";
    this.employeeAbsencePlanNameCurrent = "";

    this.employeeOverTimePlanToken = "";
    this.employeeOverTimePlanNameCurrent = "";

    this.employeeMonthAllowancesPlanToken = "";
    this.employeeMonthAllowancesPlanNameCurrent = "";

    this.actionDateTime = "";
    this.actionDate = "";
    this.actionTime = "";
    this.employeeSalarySettingArchiveStatus = "";

    this.employeeTokenList = [];
  }
  fillData(data) {
    this.employeeSalarySettingToken = data.employeeSalarySettingToken;
    this.employeeToken = data.employeeToken;
    this.employeeNameCurrent = data.employeeNameCurrent;
    this.employeeSalarySettingNameCurrent =
      data.employeeSalarySettingNameCurrent;
    this.employeeSalarySettingNameEn = data.employeeSalarySettingNameEn;
    this.employeeSalarySettingNameAr = data.employeeSalarySettingNameAr;
    this.employeeSalarySettingNameUnd = data.employeeSalarySettingNameUnd;
    this.employeeSalarySettingDescriptionCurrent =
      data.employeeSalarySettingDescriptionCurrent;
    this.employeeSalarySettingDescriptionEn =
      data.employeeSalarySettingDescriptionEn;
    this.employeeSalarySettingDescriptionAr =
      data.employeeSalarySettingDescriptionAr;
    this.employeeSalarySettingDescriptionUnd =
      data.employeeSalarySettingDescriptionUnd;
    this.employeeSalarySettingNotes = data.employeeSalarySettingNotes;
    this.employeeSalarySettingActivationStatus =
      data.employeeSalarySettingActivationStatus;

    this.employeeBasicSalary = data.employeeBasicSalary;
    this.employeeVariableSalary = data.employeeVariableSalary;
    this.employeeTotalSalary = data.employeeTotalSalary;

    this.employeeWorkDaysNumberPerMonth = data.employeeWorkDaysNumberPerMonth;
    this.employeeWorkHoursNumberPerDay = data.employeeWorkHoursNumberPerDay;
    this.employeeWorkHourPrice = data.employeeWorkHourPrice;

    this.employeeMaximumAllowedAttendLateInDayByHours24 =
      data.employeeMaximumAllowedAttendLateInDayByHours24;
    this.employeeMaximumAllowedAttendLateInDayStatus =
      data.employeeMaximumAllowedAttendLateInDayStatus;

    this.employeeMaximumAllowedAttendLateInMonthByHours24 =
      data.employeeMaximumAllowedAttendLateInMonthByHours24;
    this.employeeMaximumAllowedAttendLateInMonthByDays =
      data.employeeMaximumAllowedAttendLateInMonthByDays;
    this.employeeMaximumAllowedAttendLateInMonthStatus =
      data.employeeMaximumAllowedAttendLateInMonthStatus;

    this.employeeMaximumAllowedEarlyDepartureInDayByHours24 =
      data.employeeMaximumAllowedEarlyDepartureInDayByHours24;
    this.employeeMaximumAllowedEarlyDepartureInDayStatus =
      data.employeeMaximumAllowedEarlyDepartureInDayStatus;

    this.employeeMaximumAllowedEarlyDepartureInMonthByHours24 =
      data.employeeMaximumAllowedEarlyDepartureInMonthByHours24;
    this.employeeMaximumAllowedEarlyDepartureInMonthByDays =
      data.employeeMaximumAllowedEarlyDepartureInMonthByDays;
    this.employeeMaximumAllowedEarlyDepartureInMonthStatus =
      data.employeeMaximumAllowedEarlyDepartureInMonthStatus;

    this.employeeMaximumAllowedOverTimeInDayByHours24 =
      data.employeeMaximumAllowedOverTimeInDayByHours24;
    this.employeeMaximumAllowedOverTimeInDayStatus =
      data.employeeMaximumAllowedOverTimeInDayStatus;

    this.employeeMaximumAllowedOverTimeInMonthByHours24 =
      data.employeeMaximumAllowedOverTimeInMonthByHours24;
    this.employeeMaximumAllowedOverTimeInMonthByDays =
      data.employeeMaximumAllowedOverTimeInMonthByDays;
    this.employeeMaximumAllowedOverTimeInMonthStatus =
      data.employeeMaximumAllowedOverTimeInMonthStatus;

    this.employeeMaximumAllowedShiftAbsenceUntillSalaryStop =
      data.employeeMaximumAllowedShiftAbsenceUntillSalaryStop;
    this.employeeMaximumAllowedShiftAbsenceUntillSalaryStopStatus =
      data.employeeMaximumAllowedShiftAbsenceUntillSalaryStopStatus;

    this.employeeOverTimeStartInDayByHours24 =
      data.employeeOverTimeStartInDayByHours24;
    this.employeeOverTimeStartInDayStatus =
      data.employeeOverTimeStartInDayStatus;

    this.employeeDeductionFactorValueCaseLate =
      data.employeeDeductionFactorValueCaseLate;
    this.employeeDeductionPriceCaseLateStatus =
      data.employeeDeductionPriceCaseLateStatus;

    this.employeeDeductionFactorValueCaseEarlyDeparture =
      data.employeeDeductionFactorValueCaseEarlyDeparture;
    this.employeeDeductionFactorValueCaseEarlyDepartureStatus =
      data.employeeDeductionFactorValueCaseEarlyDepartureStatus;

    this.employeeBalancePlanToken = data.employeeBalancePlanToken;
    this.employeeBalancePlanNameCurrent = data.employeeBalancePlanNameCurrent;

    this.employeeAllowancePlanToken = data.employeeAllowancePlanToken;
    this.employeeAllowancePlanNameCurrent =
      data.employeeAllowancePlanNameCurrent;

    this.employeeAbsencePlanToken = data.employeeAbsencePlanToken;
    this.employeeAbsencePlanNameCurrent = data.employeeAbsencePlanNameCurrent;

    this.employeeOverTimePlanToken = data.employeeOverTimePlanToken;
    this.employeeOverTimePlanNameCurrent = data.employeeOverTimePlanNameCurrent;

    this.employeeMonthAllowancesPlanToken =
      data.employeeMonthAllowancesPlanToken;
    this.employeeMonthAllowancesPlanNameCurrent =
      data.employeeMonthAllowancesPlanNameCurrent;

    this.actionDateTime = data.actionDateTime;
    this.actionDate = data.actionDate;
    this.actionTime = data.actionTime;
    this.employeeSalarySettingArchiveStatus =
      data.employeeSalarySettingArchiveStatus;

    this.employeeTokenList = data.employeeTokenList;
  }

  async getAllEmployeeSalarySettings(
    language,
    userAuthorizeToken,
    selfPage,
    employeeToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/EmployeeSalarySetting/GetAllEmployeeSalarySetting?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&employeeToken=${employeeToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getEmployeeSalarySettingDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/EmployeeSalarySetting/GetEmployeeSalarySettingDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&employeeSalarySettingToken=${this.employeeSalarySettingToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateEmployeeSalarySetting(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      employeeSalarySettingToken: this.employeeSalarySettingToken,
      employeeToken: this.employeeToken,
      //salarySettingData
      employeeSalarySettingDescriptionEn:
        this.employeeSalarySettingDescriptionEn,
      employeeSalarySettingDescriptionAr:
        this.employeeSalarySettingDescriptionAr,
      employeeSalarySettingDescriptionUnd:
        this.employeeSalarySettingDescriptionUnd,
      employeeSalarySettingNotes: this.employeeSalarySettingNotes,
      employeeSalarySettingActivationStatus:
        this.employeeSalarySettingActivationStatus,
      //employeeSalary
      employeeBasicSalary: this.employeeBasicSalary,
      employeeVariableSalary: this.employeeVariableSalary,
      employeeWorkDaysNumberPerMonth: this.employeeWorkDaysNumberPerMonth,
      employeeWorkHoursNumberPerDay: this.employeeWorkHoursNumberPerDay,
      //employeeMaximumAllowedAttendLateIn
      employeeMaximumAllowedAttendLateInDayByHours24:
        this.employeeMaximumAllowedAttendLateInDayByHours24,
      employeeMaximumAllowedAttendLateInDayStatus:
        this.employeeMaximumAllowedAttendLateInDayStatus,
      employeeMaximumAllowedAttendLateInMonthByHours24:
        this.employeeMaximumAllowedAttendLateInMonthByHours24,
      employeeMaximumAllowedAttendLateInMonthByDays:
        this.employeeMaximumAllowedAttendLateInMonthByDays,
      employeeMaximumAllowedAttendLateInMonthStatus:
        this.employeeMaximumAllowedAttendLateInMonthStatus,
      //employeeMaximumAllowedEarlyDepartureIn
      employeeMaximumAllowedEarlyDepartureInDayByHours24:
        this.employeeMaximumAllowedEarlyDepartureInDayByHours24,
      employeeMaximumAllowedEarlyDepartureInDayStatus:
        this.employeeMaximumAllowedEarlyDepartureInDayStatus,
      employeeMaximumAllowedEarlyDepartureInMonthByHours24:
        this.employeeMaximumAllowedEarlyDepartureInMonthByHours24,
      employeeMaximumAllowedEarlyDepartureInMonthByDays:
        this.employeeMaximumAllowedEarlyDepartureInMonthByDays,
      employeeMaximumAllowedEarlyDepartureInMonthStatus:
        this.employeeMaximumAllowedEarlyDepartureInMonthStatus,
      //employeeMaximumAllowedOverTimeIn
      employeeMaximumAllowedOverTimeInDayByHours24:
        this.employeeMaximumAllowedOverTimeInDayByHours24,
      employeeMaximumAllowedOverTimeInDayStatus:
        this.employeeMaximumAllowedOverTimeInDayStatus,
      employeeMaximumAllowedOverTimeInMonthByHours24:
        this.employeeMaximumAllowedOverTimeInMonthByHours24,
      employeeMaximumAllowedOverTimeInMonthByDays:
        this.employeeMaximumAllowedOverTimeInMonthByDays,
      employeeMaximumAllowedOverTimeInMonthStatus:
        this.employeeMaximumAllowedOverTimeInMonthStatus,
      //employeeMaximumAllowedAbsenceUntillSalary
      employeeMaximumAllowedShiftAbsenceUntillSalaryStop:
        this.employeeMaximumAllowedShiftAbsenceUntillSalaryStop,
      employeeMaximumAllowedShiftAbsenceUntillSalaryStopStatus:
        this.employeeMaximumAllowedShiftAbsenceUntillSalaryStopStatus,
      //OverTimeStartInDay
      employeeOverTimeStartInDayByHours24:
        this.employeeOverTimeStartInDayByHours24,
      employeeOverTimeStartInDayStatus: this.employeeOverTimeStartInDayStatus,
      //comeLate
      employeeDeductionFactorValueCaseLate:
        this.employeeDeductionFactorValueCaseLate,
      employeeDeductionPriceCaseLateStatus:
        this.employeeDeductionPriceCaseLateStatus,
      //goHomeEarly
      employeeDeductionFactorValueCaseEarlyDeparture:
        this.employeeDeductionFactorValueCaseEarlyDeparture,
      employeeDeductionFactorValueCaseEarlyDepartureStatus:
        this.employeeDeductionFactorValueCaseEarlyDepartureStatus,
      //plansTokens
      employeeBalancePlanToken: this.employeeBalancePlanToken,
      employeeAllowancePlanToken: this.employeeAllowancePlanToken,
      employeeAbsencePlanToken: this.employeeAbsencePlanToken,
      employeeOverTimePlanToken: this.employeeOverTimePlanToken,
      employeeMonthAllowancesPlanToken: this.employeeMonthAllowancesPlanToken,
      //employeesList
      employeeTokenList: this.employeeTokenList,
    };

    try {
      let response = "";
      if (this.employeeToken == "" || this.employeeToken == undefined) {
        response = await axios.post(
          `/EmployeeSalarySetting/AddEmployeeSalarySetting`,
          data
        );
      } else {
        response = await axios.post(
          `/EmployeeSalarySetting/UpdateEmployeeSalarySetting`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveEmployeeSalarySetting(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      employeeSalarySettingToken: this.employeeSalarySettingToken,
    };

    try {
      let response = await axios.post(
        `/EmployeeSalarySetting/ArchiveEmployeeSalarySetting`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
