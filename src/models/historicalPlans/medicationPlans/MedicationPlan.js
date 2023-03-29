import { PAGE_SIZE, STATUS } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";
import MainReservationData from "@/models/historicalPlans/MainReservationData";
import MedicationPlanDetalisData from "@/models/historicalPlans/medicationPlans/MedicationPlanDetalisData";

export default class MedicationPlan {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicationPlanToken = "";
    this.medicationPlanCode = "";
    this.reservationToken = "";
    this.clientToken = "";
    this.employeeTokenInReport = "";
    this.employeeNameCurrentInReport = "";
    this.employeeJobTokenInReport = "";
    this.employeeJobNameCurrentInReport = "";
    this.employeeScientificDegreeTokenInReport = "";
    this.employeeScientificDegreeNameCurrentInReport = "";
    this.medicationPlanDateTime = "";
    this.medicationPlanDate = "";
    this.medicationPlanTime = "";
    this.medicationPlanArchiveStatus = "";
    this.notes = "";
    this.mainReservationData = new MainReservationData();
    this.medicationPlanDetalisData = [new MedicationPlanDetalisData()];
    this.paginationData = new PaginationData();
    this.dateFrom = "";
    this.dateTo = "";
    this.textSearch = "";
    this.sendTo = "";
  }
  fillData(data) {
    this.medicationPlanToken = data.medicationPlanToken;
    this.medicationPlanCode = data.medicationPlanCode;
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
    this.medicationPlanDateTime = data.medicationPlanDateTime;
    this.medicationPlanDate = data.medicationPlanDate;
    this.medicationPlanTime = data.medicationPlanTime;
    this.medicationPlanArchiveStatus = data.medicationPlanArchiveStatus;
    this.notes = data.notes;
    this.medicationPlanDetalisData = data.medicationPlanDetalisData;
  }

  async getMedicationPlans(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MedicationPlan/GetMedicationPlans?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&clientToken=${this.clientToken}&reservationToken=${this.reservationToken}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages: response.data.medicationPlanDataPagination.totalPages,
        totalItems: response.data.medicationPlanDataPagination.totalItems,
        countItemsInPage:
          response.data.medicationPlanDataPagination.countItemsInPage,
        selfPage: response.data.medicationPlanDataPagination.selfPage,
      };
      // this.mainReservationData.fillData(
      //   response.data.medicationPlanDataPagination.medicationPlanData
      //     .mainReservationData
      // );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMedicationPlanDetalis(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MedicationPlan/GetMedicationPlanDetalis?language=${language}&userAuthorizeToken=${userAuthorizeToken}&medicationPlanToken=${this.medicationPlanToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
  async downloadMedicationPlan(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MedicationPlan/GetMedicationPlanReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&medicationPlanToken=${this.medicationPlanToken}&sendTo=${this.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPathMedicine);
      }
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMedicationPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      medicationPlanToken: this.medicationPlanToken,
      reservationToken: this.reservationToken,
      employeeTokenInReport: this.employeeTokenInReport,
      notes: this.notes,
      medicationPlanDetalisData: this.medicationPlanDetalisData,
    };

    try {
      let response = "";
      if (
        this.medicationPlanToken == "" ||
        this.medicationPlanToken == undefined
      ) {
        response = await axios.post(`/MedicationPlan/AddMedicationPlan`, data);
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

  async archiveMedicationPlan(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      medicationPlanToken: this.medicationPlanToken,
    };

    try {
      let response = await axios.post(
        `/MedicationPlan/ArchiveMedicationPlan`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
