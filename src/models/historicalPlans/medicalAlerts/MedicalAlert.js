import { PAGE_SIZE, STATUS } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";
import MainReservationData from "@/models/historicalPlans/MainReservationData";
import MedicalAlertsActiveSubstancesData from "@/models/historicalPlans/medicalAlerts/MedicalAlertsActiveSubstancesData";
import MedicalAlertsMealsData from "@/models/historicalPlans/medicalAlerts/MedicalAlertsMealsData";

export default class MedicalAlerts {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicalAlertToken = "";
    this.medicalAlertCode = "";
    this.reservationToken = "";
    this.clientToken = "";
    this.employeeTokenInReport = "";
    this.employeeNameCurrentInReport = "";
    this.employeeJobTokenInReport = "";
    this.employeeJobNameCurrentInReport = "";
    this.employeeScientificDegreeTokenInReport = "";
    this.employeeScientificDegreeNameCurrentInReport = "";
    this.medicalAlertNameCurrent = "";
    this.medicalAlertNameEn = "";
    this.medicalAlertNameAr = "";
    this.medicalAlertNameUnd = "";
    this.medicalAlertDescriptionCurrent = "";
    this.medicalAlertDescriptionEn = "";
    this.medicalAlertDescriptionAr = "";
    this.medicalAlertDescriptionUnd = "";
    this.medicalAlertNotes = "";
    this.medicalAlertDateTime = "";
    this.medicalAlertDate = "";
    this.medicalAlertDayName = "";
    this.medicalAlertTime = "";
    this.employeeTokenAdded = "";
    this.employeeTokenUpdate = "";
    this.medicalAlertArchiveStatus = "";
    this.mainReservationData = new MainReservationData();
    this.medicalAlertsActiveSubstancesData = [
      new MedicalAlertsActiveSubstancesData(),
    ];
    this.medicalAlertsMealsData = [new MedicalAlertsMealsData()];
    this.paginationData = new PaginationData();
    this.medicalAlertTypeToken = "";
    this.mealToken = "";
    this.activeSubstanceToken = "";
    this.textSearch = "";
    this.sendTo = "";
  }
  fillData(data) {
    this.medicalAlertToken = data.medicalAlertToken;
    this.medicalAlertCode = data.medicalAlertCode;
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
    this.medicalAlertNameCurrent = data.medicalAlertNameCurrent;
    this.medicalAlertNameEn = data.medicalAlertNameEn;
    this.medicalAlertNameAr = data.medicalAlertNameAr;
    this.medicalAlertNameUnd = data.medicalAlertNameUnd;
    this.medicalAlertDescriptionCurrent = data.medicalAlertDescriptionCurrent;
    this.medicalAlertDescriptionEn = data.medicalAlertDescriptionEn;
    this.medicalAlertDescriptionAr = data.medicalAlertDescriptionAr;
    this.medicalAlertDescriptionUnd = data.medicalAlertDescriptionUnd;
    this.medicalAlertNotes = data.medicalAlertNotes;
    this.medicalAlertDateTime = data.medicalAlertDateTime;
    this.medicalAlertDate = data.medicalAlertDate;
    this.medicalAlertDayName = data.medicalAlertDayName;
    this.medicalAlertTime = data.medicalAlertTime;
    this.employeeTokenAdded = data.employeeTokenAdded;
    this.employeeTokenUpdate = data.employeeTokenUpdate;
    this.medicalAlertArchiveStatus = data.medicalAlertArchiveStatus;
    this.medicalAlertsActiveSubstancesData =
      data.medicalAlertsActiveSubstancesData;
    this.medicalAlertsMealsData = data.medicalAlertsMealsData;
  }

  async getMedicalAlerts(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MedicalAlerts/GetAllMedicalAlerts?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&clientToken=${this.clientToken}&reservationToken=${this.reservationToken}&medicalAlertTypeToken=${this.medicalAlertTypeToken}&mealToken=${this.mealToken}&activeSubstanceToken=${this.activeSubstanceToken}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages: response.data.medicalAlertsPagination.totalPages,
        totalItems: response.data.medicalAlertsPagination.totalItems,
        countItemsInPage:
          response.data.medicalAlertsPagination.countItemsInPage,
        selfPage: response.data.medicalAlertsPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMedicalAlertDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MedicalAlerts/GetMedicalAlertDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&medicalAlertToken=${this.medicalAlertToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
  async downloadMedicalAlert(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MedicalAlerts/GetMedicalAlertReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&medicalAlertToken=${this.medicalAlertToken}&sendTo=${this.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPathMedicine);
      }
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMedicalAlert(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      medicalAlertToken: this.medicalAlertToken,
      reservationToken: this.reservationToken,
      employeeTokenInReport: this.employeeTokenInReport,
      medicalAlertNameAr: this.medicalAlertNameAr,
      medicalAlertNameEn: this.medicalAlertNameEn,
      medicalAlertNameUnd: this.medicalAlertNameUnd,
      medicalAlertDescriptionAr: this.medicalAlertDescriptionAr,
      medicalAlertDescriptionEn: this.medicalAlertDescriptionEn,
      medicalAlertDescriptionUnd: this.medicalAlertDescriptionUnd,
      medicalAlertNotes: this.medicalAlertNotes,
      medicalAlertsActiveSubstancesData: this.medicalAlertsActiveSubstancesData,
      medicalAlertsMealsData: this.medicalAlertsMealsData,
    };

    try {
      let response = "";
      if (this.medicalAlertToken == "" || this.medicalAlertToken == undefined) {
        response = await axios.post(`/MedicalAlerts/AddMedicalAlert`, data);
      } else {
        response = await axios.post(
          `/MedicationPlan/UpdateMedicationPlan`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveMedicalAlert(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      medicalAlertToken: this.medicalAlertToken,
    };

    try {
      let response = await axios.post(
        `/MedicalAlerts/ArchiveMedicalAlert`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
