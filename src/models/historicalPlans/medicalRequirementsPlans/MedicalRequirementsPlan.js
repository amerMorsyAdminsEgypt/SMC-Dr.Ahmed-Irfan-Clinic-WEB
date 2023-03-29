import { PAGE_SIZE, STATUS } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";
import MainReservationData from "@/models/historicalPlans/MainReservationData";
import MedicalRequirementsPlansDetailsData from "@/models/historicalPlans/medicalRequirementsPlans/MedicalRequirementsPlansDetailsData";

export default class MedicalRequirementsPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicalRequirementsPlanToken = "";
    this.medicalRequirementsPlanCode = "";
    this.reservationToken = "";
    this.clientToken = "";
    this.employeeTokenInReport = "";
    this.employeeNameCurrentInReport = "";
    this.employeeJobTokenInReport = "";
    this.employeeJobNameCurrentInReport = "";
    this.employeeScientificDegreeTokenInReport = "";
    this.employeeScientificDegreeNameCurrentInReport = "";
    this.requirementTypeToken = "";
    this.requirementTypeNameCurrent = "";
    this.requirementTypeNameAr = "";
    this.requirementTypeNameEn = "";
    this.requirementTypeNameUnd = "";
    this.medicalRequirementsPlanDateTime = "";
    this.medicalRequirementsPlanDate = "";
    this.medicalRequirementsPlanTime = "";
    // this.notes = "";
    this.medicalRequirementsPlanArchiveStatus = "";
    this.mainReservationData = new MainReservationData();
    this.medicalRequirementsPlansDetailsData = [
      new MedicalRequirementsPlansDetailsData(),
    ];
    this.paginationData = new PaginationData();
    this.dateFrom = "";
    this.dateTo = "";
    this.textSearch = "";
    this.sendTo = "";
  }
  fillData(data) {
    this.medicalRequirementsPlanToken = data.medicalRequirementsPlanToken;
    this.medicalRequirementsPlanCode = data.medicalRequirementsPlanCode;
    this.reservationToken = data.reservationToken;
    this.clientToken = data.clientToken;
    this.employeeTokenInReport = data.employeeTokenInReport;
    this.employeeNameCurrentInReport = data.employeeNameCurrentInReport;
    this.employeeJobTokenInReport = data.employeeJobTokenInReport;
    this.employeeJobNameCurrentInReport = data.employeeJobNameCurrentInReport;
    this.employeeScientificDegreeTokenInReport =
      data.employeeScientificDegreeTokenInReport;
    this.employeeScientificDegreeNameCurrentInReport =
      data.employeeScientificDegreeNameCurrentInReport;
    this.requirementTypeToken = data.requirementTypeToken;
    this.requirementTypeNameCurrent = data.requirementTypeNameCurrent;
    this.requirementTypeNameAr = data.requirementTypeNameAr;
    this.requirementTypeNameEn = data.requirementTypeNameEn;
    this.requirementTypeNameUnd = data.requirementTypeNameUnd;
    this.medicalRequirementsPlanDateTime = data.medicalRequirementsPlanDateTime;
    this.medicalRequirementsPlanDate = data.medicalRequirementsPlanDate;
    this.medicalRequirementsPlanTime = data.medicalRequirementsPlanTime;
    // this.notes = data.notes;
    this.medicalRequirementsPlanArchiveStatus =
      data.medicalRequirementsPlanArchiveStatus;
    this.medicalRequirementsPlansDetailsData =
      data.medicalRequirementsPlansDetailsData;
  }

  async getMedicalRequirementsPlans(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MedicalRequirementsPlan/GetMedicalRequirementsPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&clientToken=${this.clientToken}&employeeTokenInReport=${this.employeeTokenInReport}&requirementTypeToken=${this.requirementTypeToken}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages:
          response.data.medicalRequirementsPlansDataPagination.totalPages,
        totalItems:
          response.data.medicalRequirementsPlansDataPagination.totalItems,
        countItemsInPage:
          response.data.medicalRequirementsPlansDataPagination.countItemsInPage,
        selfPage: response.data.medicalRequirementsPlansDataPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMedicalRequirementsPlanDetalis(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MedicalRequirementsPlan/GetMedicalRequirementsPlanDetalis?language=${language}&userAuthorizeToken=${userAuthorizeToken}&medicalRequirementsPlanToken=${this.medicalRequirementsPlanToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async downloadMedicalRequirementsPlan(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MedicalRequirementsPlan/GetMedicalRequirementsPlanReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&medicalRequirementsPlanToken=${this.medicalRequirementsPlanToken}&sendTo=${this.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPathMedicine);
      }
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMedicalRequirementsPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      medicalRequirementsPlanToken: this.medicalRequirementsPlanToken,
      reservationToken: this.reservationToken,
      requirementTypeToken: this.requirementTypeToken,
      employeeTokenInReport: this.employeeTokenInReport,
      // notes: this.notes,
      medicalRequirementsPlansDetailsData:
        this.medicalRequirementsPlansDetailsData,
    };

    try {
      let response = "";
      if (
        this.medicalRequirementsPlanToken == "" ||
        this.medicalRequirementsPlanToken == undefined
      ) {
        response = await axios.post(
          `/MedicalRequirementsPlan/AddMedicalRequirementsPlan`,
          data
        );
      } else {
        response = await axios.post(
          `/MedicalRequirementsPlan/UpdateMedicalRequirementsPlan`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveMedicalRequirementsPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      medicalRequirementsPlanToken: this.medicalRequirementsPlanToken,
    };

    try {
      let response = await axios.post(
        `/MedicalRequirementsPlan/ArchiveMedicalRequirementsPlan`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
