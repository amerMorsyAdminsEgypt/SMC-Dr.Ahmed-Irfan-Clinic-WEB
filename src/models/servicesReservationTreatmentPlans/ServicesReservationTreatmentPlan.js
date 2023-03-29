import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";
import ServicesReservationMedicationPlan from "@/models/servicesReservationTreatmentPlans/ServicesReservationMedicationPlan";
// import ServicesReservationRequirementPlan from "@/models/servicesReservationTreatmentPlans/ServicesReservationRequirementPlan";

export default class ServicesReservationTreatmentPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.treatmentPlanToken = "";
    this.reservationToken = "";
    this.treatmentEmployeeToken = "";
    this.treatmentEmployeeNameCurrent = "";
    this.treatmentEmployeeNameAr = "";
    this.treatmentEmployeeNameEn = "";
    this.treatmentEmployeeNameUnd = "";
    this.treatmentPlanCode = "";
    this.clientToken = "";
    this.clientNameCurrent = "";
    this.clientNameAr = "";
    this.clientNameEn = "";
    this.clientNameUnd = "";
    this.clientAge = "";
    this.clientPhone = "";
    this.employeeTokenInReport = "";
    this.employeeNameInReportCurrent = "";
    this.employeeNameInReportAr = "";
    this.employeeNameInReportEn = "";
    this.employeeNameInReportUnd = "";
    this.employeeInReportJobNameCurrent = "";
    this.employeeInReportJobNameAr = "";
    this.employeeInReportJobNameEn = "";
    this.employeeInReportJobNameUnd = "";
    this.employeeInReportSpecialSpecialtyNameCurrent = "";
    this.employeeInReportSpecialSpecialtyNameAr = "";
    this.employeeInReportSpecialSpecialtyNameEn = "";
    this.employeeInReportSpecialSpecialtyNameUnd = "";
    this.branchAddressCurrent = "";
    this.branchAddressAr = "";
    this.branchAddressEn = "";
    this.branchAddressUnd = "";
    this.branchFirstPhoneWithCC = "";
    this.branchSecondPhoneWithCC = "";
    this.disease = "";
    this.diagnosis = "";
    this.treatmentPlanNotes = "";
    this.treatmentPlanDateTime = "";
    this.treatmentPlanDate = "";
    this.treatmentPlanTime = "";
    this.treatmentPlanArchiveStatus = "";
    this.servicesReservationMedicationPlanData = [
      new ServicesReservationMedicationPlan(),
    ];
    // this.servicesReservationRequirementPlanData = [
    //   new ServicesReservationRequirementPlan(),
    // ];
    this.paginationData = new PaginationData();
    this.dateFrom = "";
    this.dateTo = "";
    this.textSearch = "";
  }
  fillData(data) {
    this.treatmentPlanToken = data.treatmentPlanToken;
    this.reservationToken = data.reservationToken;
    this.treatmentEmployeeToken = data.treatmentEmployeeToken;
    this.treatmentEmployeeNameCurrent = data.treatmentEmployeeNameCurrent;
    this.treatmentEmployeeNameAr = data.treatmentEmployeeNameAr;
    this.treatmentEmployeeNameEn = data.treatmentEmployeeNameEn;
    this.treatmentEmployeeNameUnd = data.treatmentEmployeeNameUnd;
    this.treatmentPlanCode = data.treatmentPlanCode;
    this.clientToken = data.clientToken;
    this.clientNameCurrent = data.clientNameCurrent;
    this.clientNameAr = data.clientNameAr;
    this.clientNameEn = data.clientNameEn;
    this.clientNameUnd = data.clientNameUnd;
    this.clientAge = data.clientAge;
    this.clientPhone = data.clientPhone;
    this.employeeTokenInReport = data.employeeTokenInReport;
    this.employeeNameInReportCurrent = data.employeeNameInReportCurrent;
    this.employeeNameInReportAr = data.employeeNameInReportAr;
    this.employeeNameInReportEn = data.employeeNameInReportEn;
    this.employeeNameInReportUnd = data.employeeNameInReportUnd;
    this.employeeInReportJobNameCurrent = data.employeeInReportJobNameCurrent;
    this.employeeInReportJobNameAr = data.employeeInReportJobNameAr;
    this.employeeInReportJobNameEn = data.employeeInReportJobNameEn;
    this.employeeInReportJobNameUnd = data.employeeInReportJobNameUnd;
    this.employeeInReportSpecialSpecialtyNameCurrent =
      data.employeeInReportSpecialSpecialtyNameCurrent;
    this.employeeInReportSpecialSpecialtyNameAr =
      data.employeeInReportSpecialSpecialtyNameAr;
    this.employeeInReportSpecialSpecialtyNameEn =
      data.employeeInReportSpecialSpecialtyNameEn;
    this.employeeInReportSpecialSpecialtyNameUnd =
      data.employeeInReportSpecialSpecialtyNameUnd;
    this.branchAddressCurrent = data.branchAddressCurrent;
    this.branchAddressAr = data.branchAddressAr;
    this.branchAddressEn = data.branchAddressEn;
    this.branchAddressUnd = data.branchAddressUnd;
    this.branchFirstPhoneWithCC = data.branchFirstPhoneWithCC;
    this.branchSecondPhoneWithCC = data.branchSecondPhoneWithCC;
    this.disease = data.disease;
    this.diagnosis = data.diagnosis;
    this.treatmentPlanNotes = data.treatmentPlanNotes;
    this.treatmentPlanDateTime = data.treatmentPlanDateTime;
    this.treatmentPlanDate = data.treatmentPlanDate;
    this.treatmentPlanTime = data.treatmentPlanTime;
    this.treatmentPlanArchiveStatus = data.treatmentPlanArchiveStatus;
    this.servicesReservationMedicationPlanData =
      data.servicesReservationMedicationPlanData;
    // this.servicesReservationRequirementPlanData =
    //   data.servicesReservationRequirementPlanData;
  }

  async getServicesReservationTreatmentPlans(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservationTreatmentPlan/GetServicesReservationTreatmentPlan?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&clientToken=${this.clientToken}&reservationToken=${this.reservationToken}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages:
          response.data.servicesReservationFinishPagination.totalPages,
        totalItems:
          response.data.servicesReservationFinishPagination.totalItems,
        countItemsInPage:
          response.data.servicesReservationFinishPagination.countItemsInPage,
        selfPage: response.data.servicesReservationFinishPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getServicesReservationTreatmentPlanDetalis(
    language,
    userAuthorizeToken
  ) {
    try {
      let response = await axios.get(
        `/ServicesReservationTreatmentPlan/GetServicesReservationTreatmentPlanDetalis?language=${language}&userAuthorizeToken=${userAuthorizeToken}&treatmentPlanToken=${this.treatmentPlanToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
  async getServicesReservationTreatmentPlanReport(
    language,
    userAuthorizeToken
  ) {
    try {
      let response = await axios.get(
        `/ServicesReservationTreatmentPlan/GetServicesReservationTreatmentPlanReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&treatmentPlanToken=${this.treatmentPlanToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateServicesReservationTreatmentPlan(
    language,
    userAuthorizeToken
  ) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      treatmentPlanToken: this.treatmentPlanToken,
      reservationToken: this.reservationToken,
      employeeTokenInReport: this.employeeTokenInReport,
      disease: this.disease,
      diagnosis: this.diagnosis,
      treatmentPlanNotes: this.treatmentPlanNotes,
      servicesReservationMedicationPlanData:
        this.servicesReservationMedicationPlanData,
      servicesReservationRequirementPlanData:
        this.servicesReservationRequirementPlanData,
    };

    try {
      let response = "";
      if (
        this.treatmentPlanToken == "" ||
        this.treatmentPlanToken == undefined
      ) {
        response = await axios.post(
          `/ServicesReservationTreatmentPlan/AddServicesReservationTreatmentPlan`,
          data
        );
      } else {
        response = await axios.post(
          `/ServicesReservationTreatmentPlan/UpdateServicesReservationTreatmentPlan`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveServicesReservationTreatmentPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      treatmentPlanToken: this.treatmentPlanToken,
    };

    try {
      let response = await axios.post(
        `/ServicesReservationTreatmentPlan//ArchiveServicesReservationTreatmentPlan`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
