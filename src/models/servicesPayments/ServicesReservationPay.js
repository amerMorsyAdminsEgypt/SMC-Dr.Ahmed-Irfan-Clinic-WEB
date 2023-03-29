import { PAGE_SIZE, STATUS } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";

export default class ServicesReservationPay {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.payToken = "";
    this.payCode = "";
    this.reservationToken = "";
    this.reservationAddedServicesToken = "";
    this.reservationCode = "";
    this.serviceNameCurrent = "";
    this.servesActualPrice = 0;
    this.treasuryToken = "";
    this.treasuryNameCurrent = "";
    this.clientToken = "";
    this.clientNameCurrent = "";
    this.clientCode = "";
    this.clientPhoneWithCC = "";
    this.payEmployeeToken = "";
    this.payEmployeeNameCurrent = "";
    this.payTypeToken = "";
    this.payTypeNameCurrent = "";
    this.payTypeNameAr = "";
    this.payTypeNameEn = "";
    this.payTypeNameUnd = "";
    this.methodPaidToken = "";
    this.methodPaidNameCurrent = "";
    this.methodPaidValue = 0;
    this.walletValue = 0;
    this.pointsValue = 0;
    this.onePointEqualValue = 0;
    this.paidActual = 0;
    this.payDateTime = "";
    this.payDate = "";
    this.payTime = "";
    this.payNote = "";
    this.refundStatus = false;
    this.refundDateTime = "";
    this.refundDate = "";
    this.refundTime = "";
    this.refundEmployeeToken = "";
    this.refundEmployeeNameCurrent = "";
    this.refundReasonCurrent = "";
    this.refundReasonAr = "";
    this.refundReasonEn = "";
    this.refundReasonUnd = "";
    this.refundNotes = "";
    this.payArchiveStatus = false;
    this.paginationData = new PaginationData();
    // filterData
    this.dateFrom = "";
    this.dateTo = "";
    this.textSearch = "";
    this.sendTo = "";
  }
  fillData(data) {
    this.payToken = data.payToken;
    this.payCode = data.payCode;
    this.reservationToken = data.reservationToken;
    this.reservationAddedServicesToken = data.reservationAddedServicesToken;
    this.reservationCode = data.reservationCode;
    this.serviceNameCurrent = data.serviceNameCurrent;
    this.servesActualPrice = data.servesActualPrice;
    this.treasuryToken = data.treasuryToken;
    this.treasuryNameCurrent = data.treasuryNameCurrent;
    this.clientToken = data.clientToken;
    this.clientNameCurrent = data.clientNameCurrent;
    this.clientCode = data.clientCode;
    this.clientPhoneWithCC = data.clientPhoneWithCC;
    this.payEmployeeToken = data.payEmployeeToken;
    this.payEmployeeNameCurrent = data.payEmployeeNameCurrent;
    this.payTypeToken = data.payTypeToken;
    this.payTypeNameCurrent = data.payTypeNameCurrent;
    this.payTypeNameAr = data.payTypeNameAr;
    this.payTypeNameEn = data.payTypeNameEn;
    this.payTypeNameUnd = data.payTypeNameUnd;
    this.methodPaidToken = data.methodPaidToken;
    this.methodPaidNameCurrent = data.methodPaidNameCurrent;
    this.methodPaidValue = data.methodPaidValue;
    this.walletValue = data.walletValue;
    this.pointsValue = data.pointsValue;
    this.onePointEqualValue = data.onePointEqualValue;
    this.paidActual = data.paidActual;
    this.payDateTime = data.payDateTime;
    this.payDate = data.payDate;
    this.payTime = data.payTime;
    this.payNote = data.payNote;
    this.refundStatus = data.refundStatus;
    this.refundDateTime = data.refundDateTime;
    this.refundDate = data.refundDate;
    this.refundTime = data.refundTime;
    this.refundEmployeeToken = data.refundEmployeeToken;
    this.refundEmployeeNameCurrent = data.refundEmployeeNameCurrent;
    this.refundReasonCurrent = data.refundReasonCurrent;
    this.refundReasonAr = data.refundReasonAr;
    this.refundReasonEn = data.refundReasonEn;
    this.refundReasonUnd = data.refundReasonUnd;
    this.refundNotes = data.refundNotes;
    this.payArchiveStatus = data.payArchiveStatus;
  }

  async getAllPayments(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservationPay/GetAllPayment?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&payEmployeeToken=${this.payEmployeeToken}&reservationToken=${this.reservationToken}&clientToken=${this.clientToken}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages: response.data.servicesReservationPayPagination.totalPages,
        totalItems: response.data.servicesReservationPayPagination.totalItems,
        countItemsInPage:
          response.data.servicesReservationPayPagination.countItemsInPage,
        selfPage: response.data.servicesReservationPayPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getPaymentDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservationPay/GetPaymentDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&payToken=${this.payToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async newPayment(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      payTypeToken: this.payTypeToken,
      treasuryToken: this.treasuryToken,
      reservationToken: this.reservationToken,
      reservationAddedServicesToken: this.reservationAddedServicesToken,
      methodPaidToken: this.methodPaidToken,
      methodPaidValue: this.methodPaidValue,
      walletValue: this.walletValue,
      pointsValue: this.pointsValue,
      onePointEqualValue: this.onePointEqualValue,
      payNote: this.payNote,
    };

    try {
      let response = await axios.post(
        `/ServicesReservationPay/NewPayment`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
  async refundPayment(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      payToken: this.payToken,
      refundReasonAr: this.refundReasonAr,
      refundReasonEn: this.refundReasonEn,
      refundReasonUnd: this.refundReasonUnd,
      refundNotes: this.refundNotes,
    };

    try {
      let response = await axios.post(
        `/ServicesReservationPay/RefundPayment`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async getAllPaymentReport(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservationPay/GetAllPaymentReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&payEmployeeToken=${this.payEmployeeToken}&reservationToken=${this.reservationToken}&clientToken=${this.clientToken}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&textSearch=${this.textSearch}&sendTo=${this.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPath);
      }
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
  async getPaymentReport(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservationPay/GetPaymentReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&payToken=${this.payToken}&sendTo=${this.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPath);
      }
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
}
