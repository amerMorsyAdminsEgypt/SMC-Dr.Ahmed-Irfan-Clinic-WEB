import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";

export default class ServicesReservationCancel {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.cancelToken = "";
    this.cancelDateTime = "";
    this.cancelDate = "";
    this.cancelTime = "";
    this.reservationToken = "";
    this.cancelReasonCurrent = "";
    this.cancelReasonAr = "";
    this.cancelReasonEn = "";
    this.cancelReasonUnd = "";
    this.cancelNote = "";
    this.cancelEmployeeToken = "";
    this.cancelEmployeeNameCurrent = "";
    this.cancelClientToken = "";
    this.cancelClientNameCurrent = "";
    this.cancelApproverDateTime = "";
    this.cancelApproverDate = "";
    this.cancelApproverTime = "";
    this.cancelApproverEmployeeToken = "";
    this.cancelApproverEmployeeNameCurrent = "";
    this.cancelApproverNote = "";
    this.reservationStatusToken = "";
    this.reservationStatusNameCurrent = "";
    this.reservationStatusNameAr = "";
    this.reservationStatusNameEn = "";
    this.reservationStatusNameUnd = "";
    this.refundPercentageFromPaid = 0;
    this.refoundValue = 0;
    this.totalPaid = 0;
    this.totalPaidWithRefound = "";
    this.methodPaidToken = "";
    this.methodPaidNameCurrent = "";
    this.methodPaidNameAr = "";
    this.methodPaidNameEn = "";
    this.methodPaidNameUnd = "";
    this.treasuryToken = "";
    this.cancelArchiveStatus = "";
    this.paginationData = new PaginationData();
    this.dateFrom = ""; //
    this.dateTo = ""; //
    this.textSearch = ""; //
  }
  fillData(data) {
    this.cancelToken = data.cancelToken;
    this.cancelDateTime = data.cancelDateTime;
    this.cancelDate = data.cancelDate;
    this.cancelTime = data.cancelTime;
    this.reservationToken = data.reservationToken;
    this.cancelReasonCurrent = data.cancelReasonCurrent;
    this.cancelReasonAr = data.cancelReasonAr;
    this.cancelReasonEn = data.cancelReasonEn;
    this.cancelReasonUnd = data.cancelReasonUnd;
    this.cancelNote = data.cancelNote;
    this.cancelEmployeeToken = data.cancelEmployeeToken;
    this.cancelEmployeeNameCurrent = data.cancelEmployeeNameCurrent;
    this.cancelClientToken = data.cancelClientToken;
    this.cancelClientNameCurrent = data.cancelClientNameCurrent;
    this.cancelApproverDateTime = data.cancelApproverDateTime;
    this.cancelApproverDate = data.cancelApproverDate;
    this.cancelApproverTime = data.cancelApproverTime;
    this.cancelApproverEmployeeToken = data.cancelApproverEmployeeToken;
    this.cancelApproverEmployeeNameCurrent =
      data.cancelApproverEmployeeNameCurrent;
    this.cancelApproverNote = data.cancelApproverNote;
    this.reservationStatusToken = data.reservationStatusToken;
    this.reservationStatusNameCurrent = data.reservationStatusNameCurrent;
    this.reservationStatusNameAr = data.reservationStatusNameAr;
    this.reservationStatusNameEn = data.reservationStatusNameEn;
    this.reservationStatusNameUnd = data.reservationStatusNameUnd;
    this.refundPercentageFromPaid = data.refundPercentageFromPaid;
    this.refoundValue = data.refoundValue;
    this.totalPaid = data.totalPaid;
    this.totalPaidWithRefound = data.totalPaidWithRefound;
    this.methodPaidToken = data.methodPaidToken;
    this.methodPaidNameCurrent = data.methodPaidNameCurrent;
    this.methodPaidNameAr = data.methodPaidNameAr;
    this.methodPaidNameEn = data.methodPaidNameEn;
    this.methodPaidNameUnd = data.methodPaidNameUnd;
    this.treasuryToken = data.treasuryToken;
    this.cancelArchiveStatus = data.cancelArchiveStatus;
  }

  async getAllServicesReservationsCancels(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservationCancel/GetAllCancel?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&cancelClientToken=${this.cancelClientToken}&reservationToken=${this.reservationToken}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages:
          response.data.servicesReservationCancelPagination.totalPages,
        totalItems:
          response.data.servicesReservationCancelPagination.totalItems,
        countItemsInPage:
          response.data.servicesReservationCancelPagination.countItemsInPage,
        selfPage: response.data.servicesReservationCancelPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async cancelServicesReservation(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      reservationToken: this.reservationToken,
      cancelReasonAr: this.cancelReasonAr,
      cancelReasonEn: this.cancelReasonEn,
      cancelReasonUnd: this.cancelReasonUnd,
      cancelNote: this.cancelNote,
      methodPaidToken: this.methodPaidToken,
      treasuryToken: this.treasuryToken,
      refundPercentageFromPaid: this.refundPercentageFromPaid,
    };

    try {
      let response = await axios.post(
        `/ServicesReservationCancel/EmployeeCancelServicesReservation`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
  async approveCancelServicesReservation(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      reservationToken: this.reservationToken,
      methodPaidToken: this.methodPaidToken,
      treasuryToken: this.treasuryToken,
      refundPercentageFromPaid: this.refundPercentageFromPaid,
      cancelApproverNote: this.cancelApproverNote,
    };

    try {
      let response = await axios.post(
        `/ServicesReservationCancel/ApproveCancelServicesReservation`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
