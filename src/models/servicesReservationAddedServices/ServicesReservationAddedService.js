import { STATUS, PAGE_SIZE, BASE_URL, TAX_VALUE } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";
import axios from "axios";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";
import MainReservationData from "@/models/historicalPlans/MainReservationData";
import ServicesReservationPay from "@/models/servicesPayments/ServicesReservationPay";

export default class ServicesReservationAddedService {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.reservationAddedServicesToken = "";
    this.reservationAddedServicesNameCurrent = "";
    this.reservationAddedServicesCode = "";
    this.reservationToken = "";
    this.clientToken = "";
    this.serviceTypeToken = "";
    this.serviceTypeNameCurrent = "";
    this.serviceTypeNameEn = "";
    this.serviceTypeNameAr = "";
    this.serviceTypeNameUnd = "";
    this.serviceToken = "";
    this.serviceNameCurrent = "";
    this.serviceNameEn = "";
    this.serviceNameAr = "";
    this.serviceNameUnd = "";
    this.serviceProvideTypeToken = "";
    this.serviceProvideTypeNameCurrent = "";
    this.serviceProvideTypeNameAr = "";
    this.serviceProvideTypeNameEn = "";
    this.serviceProvideTypeNameUnd = "";
    this.servicePrice = "";
    this.serviceTimeWithMinutes = "";
    this.maxDiscountPercentage = "";
    this.generalSpecialtyToken = "";
    this.generalSpecialtyNameCurrent = "";
    this.generalSpecialtyNameEn = "";
    this.generalSpecialtyNameAr = "";
    this.generalSpecialtyNameUnd = "";
    this.specialSpecialtyToken = "";
    this.specialSpecialtyNameCurrent = "";
    this.specialSpecialtyNameEn = "";
    this.specialSpecialtyNameAr = "";
    this.specialSpecialtyNameUnd = "";
    this.feesTypeToken = "";
    this.feesTypeNameCurrent = "";
    this.feesTypeNameAr = "";
    this.feesTypeNameEn = "";
    this.feesTypeNameUnd = "";
    this.feesTypeValue = 0;
    this.totalPaid = "";
    this.remainingAmount = "";
    this.totalPaidWithRefound = "";
    this.refoundStatus = "";
    this.refundPercentageFromPaid = "";
    this.refoundValue = "";
    this.refoundMethodPaidToken = "";
    this.refoundMethodPaidNameCurrent = "";
    this.refoundEmployeeToken = "";
    this.refoundEmployeeNameCurrent = "";
    this.refoundTreasuryToken = "";
    this.refoundTreasuryNameCurrent = "";
    this.refoundDateTime = "";
    this.refoundDate = "";
    this.refoundTime = "";
    this.refoundReasonCurrent = "";
    this.refoundReasonAr = "";
    this.refoundReasonEn = "";
    this.refoundReasonUnd = "";
    this.offerToken = "";
    this.offerCode = "";
    this.offerMediaTypeToken = "";
    this.offerMediaTypeNameCurrent = "";
    this.offerMediaTypeNameAr = "";
    this.offerMediaTypeNameEn = "";
    this.offerMediaTypeNameUnd = "";
    this.offerTitleCurrent = "";
    this.offerTitleEn = "";
    this.offerTitleAr = "";
    this.offerTitleUnd = "";
    this.offerStartDate = "";
    this.offerEndDate = "";
    this.offerDuration = "";
    this.offerStatus = "";
    this.servicePriceInOffer = "";
    this.servesActivePrice = "";
    this.servesActualPrice = "";
    this.offerDescriptionCurrent = "";
    this.offerDescriptionEn = "";
    this.offerDescriptionAr = "";
    this.offerDescriptionUnd = "";
    this.offerNotes = "";
    this.offerMediaPath = "";
    this.paymentStatus = "";
    this.serviceDeliveryDate = "";
    this.reservationAddedServicesActionDateTime = "";
    this.reservationAddedServicesActionDate = "";
    this.reservationAddedServicesActionTime = "";
    this.reservationAddedUserToken = "";
    this.reservationAddedEmployeeToken = "";
    this.reservationAddedClientToken = "";
    this.reservationAddedUserNameAr = "";
    this.reservationAddedUserNameEn = "";
    this.reservationAddedUserNameUnd = "";
    this.reservationAddedServicesNotes = "";
    this.reservationAddedServicesArchiveStatus = "";
    this.mainReservationData = new MainReservationData();
    this.servicesReservationPayData = new ServicesReservationPay();
    this.addInsuranceCompanyDiscountPercentageStatus = false;
    this.calculateTaxesStatus = false;
    this.addTaxForOnlyServicePriceStatus = false;
    this.serviceTaxValue = TAX_VALUE;
  }
  fillData(data) {
    this.reservationAddedServicesToken = data.reservationAddedServicesToken;
    this.reservationAddedServicesNameCurrent =
      data.reservationAddedServicesNameCurrent;
    this.reservationAddedServicesCode = data.reservationAddedServicesCode;
    this.reservationToken = data.reservationToken;
    this.clientToken = data.clientToken;
    this.serviceTypeToken = data.serviceTypeToken;
    this.serviceTypeNameCurrent = data.serviceTypeNameCurrent;
    this.serviceTypeNameEn = data.serviceTypeNameEn;
    this.serviceTypeNameAr = data.serviceTypeNameAr;
    this.serviceTypeNameUnd = data.serviceTypeNameUnd;
    this.serviceToken = data.serviceToken;
    this.serviceNameCurrent = data.serviceNameCurrent;
    this.serviceNameEn = data.serviceNameEn;
    this.serviceNameAr = data.serviceNameAr;
    this.serviceNameUnd = data.serviceNameUnd;
    this.serviceProvideTypeToken = data.serviceProvideTypeToken;
    this.serviceProvideTypeNameCurrent = data.serviceProvideTypeNameCurrent;
    this.serviceProvideTypeNameAr = data.serviceProvideTypeNameAr;
    this.serviceProvideTypeNameEn = data.serviceProvideTypeNameEn;
    this.serviceProvideTypeNameUnd = data.serviceProvideTypeNameUnd;
    this.servicePrice = data.servicePrice;
    this.serviceTimeWithMinutes = data.serviceTimeWithMinutes;
    this.maxDiscountPercentage = data.maxDiscountPercentage;
    this.generalSpecialtyToken = data.generalSpecialtyToken;
    this.generalSpecialtyNameCurrent = data.generalSpecialtyNameCurrent;
    this.generalSpecialtyNameEn = data.generalSpecialtyNameEn;
    this.generalSpecialtyNameAr = data.generalSpecialtyNameAr;
    this.generalSpecialtyNameUnd = data.generalSpecialtyNameUnd;
    this.specialSpecialtyToken = data.specialSpecialtyToken;
    this.specialSpecialtyNameCurrent = data.specialSpecialtyNameCurrent;
    this.specialSpecialtyNameEn = data.specialSpecialtyNameEn;
    this.specialSpecialtyNameAr = data.specialSpecialtyNameAr;
    this.specialSpecialtyNameUnd = data.specialSpecialtyNameUnd;
    this.feesTypeToken = data.feesTypeToken;
    this.feesTypeNameCurrent = data.feesTypeNameCurrent;
    this.feesTypeNameAr = data.feesTypeNameAr;
    this.feesTypeNameEn = data.feesTypeNameEn;
    this.feesTypeNameUnd = data.feesTypeNameUnd;
    this.feesTypeValue = data.feesTypeValue;
    this.totalPaid = data.totalPaid;
    this.remainingAmount = data.remainingAmount;
    this.totalPaidWithRefound = data.totalPaidWithRefound;
    this.refoundStatus = data.refoundStatus;
    this.refundPercentageFromPaid = data.refundPercentageFromPaid;
    this.refoundValue = data.refoundValue;
    this.refoundMethodPaidToken = data.refoundMethodPaidToken;
    this.refoundMethodPaidNameCurrent = data.refoundMethodPaidNameCurrent;
    this.refoundEmployeeToken = data.refoundEmployeeToken;
    this.refoundEmployeeNameCurrent = data.refoundEmployeeNameCurrent;
    this.refoundTreasuryToken = data.refoundTreasuryToken;
    this.refoundTreasuryNameCurrent = data.refoundTreasuryNameCurrent;
    this.refoundDateTime = data.refoundDateTime;
    this.refoundDate = data.refoundDate;
    this.refoundTime = data.refoundTime;
    this.refoundReasonCurrent = data.refoundReasonCurrent;
    this.refoundReasonAr = data.refoundReasonAr;
    this.refoundReasonEn = data.refoundReasonEn;
    this.refoundReasonUnd = data.refoundReasonUnd;
    this.offerToken = data.offerToken;
    this.offerCode = data.offerCode;
    this.offerMediaTypeToken = data.offerMediaTypeToken;
    this.offerMediaTypeNameCurrent = data.offerMediaTypeNameCurrent;
    this.offerMediaTypeNameAr = data.offerMediaTypeNameAr;
    this.offerMediaTypeNameEn = data.offerMediaTypeNameEn;
    this.offerMediaTypeNameUnd = data.offerMediaTypeNameUnd;
    this.offerTitleCurrent = data.offerTitleCurrent;
    this.offerTitleEn = data.offerTitleEn;
    this.offerTitleAr = data.offerTitleAr;
    this.offerTitleUnd = data.offerTitleUnd;
    this.offerStartDate = data.offerStartDate;
    this.offerEndDate = data.offerEndDate;
    this.offerDuration = data.offerDuration;
    this.offerStatus = data.offerStatus;
    this.servicePriceInOffer = data.servicePriceInOffer;
    this.servesActivePrice = data.servesActivePrice;
    this.servesActualPrice = data.servesActualPrice;
    this.offerDescriptionCurrent = data.offerDescriptionCurrent;
    this.offerDescriptionEn = data.offerDescriptionEn;
    this.offerDescriptionAr = data.offerDescriptionAr;
    this.offerDescriptionUnd = data.offerDescriptionUnd;
    this.offerNotes = data.offerNotes;
    this.offerMediaPath = data.offerMediaPath;
    this.paymentStatus = data.paymentStatus;
    this.serviceDeliveryDate = data.serviceDeliveryDate;
    this.reservationAddedServicesActionDateTime =
      data.reservationAddedServicesActionDateTime;
    this.reservationAddedServicesActionDate =
      data.reservationAddedServicesActionDate;
    this.reservationAddedServicesActionTime =
      data.reservationAddedServicesActionTime;
    this.reservationAddedUserToken = data.reservationAddedUserToken;
    this.reservationAddedEmployeeToken = data.reservationAddedEmployeeToken;
    this.reservationAddedClientToken = data.reservationAddedClientToken;
    this.reservationAddedUserNameAr = data.reservationAddedUserNameAr;
    this.reservationAddedUserNameEn = data.reservationAddedUserNameEn;
    this.reservationAddedUserNameUnd = data.reservationAddedUserNameUnd;
    this.reservationAddedServicesNotes = data.reservationAddedServicesNotes;
    this.reservationAddedServicesArchiveStatus =
      data.reservationAddedServicesArchiveStatus;
    this.mainReservationData = data.mainReservationData;
    this.addInsuranceCompanyDiscountPercentageStatus =
      data.addInsuranceCompanyDiscountPercentageStatus ?? false;
    this.calculateTaxesStatus = data.calculateTaxesStatus ?? false;
    this.addTaxForOnlyServicePriceStatus =
      data.addTaxForOnlyServicePriceStatus ?? false;
    this.serviceTaxValue = data.serviceTaxValue ?? TAX_VALUE;
  }

  async getAllServicesReservationAddedServices(
    language,
    userAuthorizeToken,
    pagination,
    filterData
  ) {
    try {
      let response = await axios.get(
        `/ServicesReservationAddedServices/GetServicesReservationAddedServices?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${pagination.selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&paginationStatus=true&reservationToken=${filterData.reservationToken}&reservationAddedServicesToken=${filterData.reservationAddedServicesToken}&clientToken=${filterData.clientToken}&serviceToken=${filterData.serviceToken}&feesTypeToken=${filterData.feesTypeToken}&specialSpecialtyToken=${filterData.specialSpecialtyToken}&generalSpecialtyToken=${filterData.generalSpecialtyToken}&dateFrom=${filterData.dateFrom}&dateTo=${filterData.dateTo}&textSearch=${filterData.textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getServicesReservationAddedServicesDetalis(
    language,
    userAuthorizeToken
  ) {
    try {
      let response = await axios.get(
        `/ServicesReservationAddedServices/GetServicesReservationAddedServicesDetalis?language=${language}&userAuthorizeToken=${userAuthorizeToken}&reservationAddedServicesToken=${this.reservationAddedServicesToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfServicesReservationAddedServices(
    language,
    userAuthorizeToken
  ) {
    let options = [];
    try {
      let response = await axios.get(
        `/ServicesReservationAddedServices/GetDialogOfServicesReservationAddedServices?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&reservationToken=${this.reservationToken}&clientToken=${this.clientToken}&specialSpecialtyToken=${this.specialSpecialtyToken}&generalSpecialtyToken=${this.generalSpecialtyToken}`
      );
      const itemsData = response.data.itemsData;
      if (response.data.status == STATUS.SUCCESS) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["itemToken"],
            text: itemsData[item]["itemName"],
            image: itemsData[item]["itemImagePath"]
              ? BASE_URL + itemsData[item]["itemImagePath"]
              : "",
          });
        }
      } else if (response.data.status == STATUS.INVALID_TOKEN) {
        store.dispatch("updateUserData", null);
        router.push("/").catch(() => {});
      } else {
        options.push({
          value: "",
          text: response.data.msg,
          image: "",
        });
      }
    } catch (error) {
      options.push({
        value: "",
        text: i18n.t("errorCatch"),
        image: "",
      });
    }
    return options;
  }

  async addServicesReservationAddedService(language, userAuthorizeToken) {
    if (!this.calculateTaxesStatus) {
      this.addTaxForOnlyServicePriceStatus = false;
      this.serviceTaxValue = 0;
    }
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      reservationToken: this.reservationToken,
      serviceToken: this.serviceToken,
      offerCode: this.offerCode,
      serviceDeliveryDate: this.serviceDeliveryDate,
      feesTypeToken: this.feesTypeToken,
      feesTypeValue: this.feesTypeValue,
      reservationAddedServicesNotes: this.reservationAddedServicesNotes,
      servicesReservationPayData: this.servicesReservationPayData,
      addInsuranceCompanyDiscountPercentageStatus:
        this.addInsuranceCompanyDiscountPercentageStatus,
      calculateTaxesStatus: this.calculateTaxesStatus,
      addTaxForOnlyServicePriceStatus: this.addTaxForOnlyServicePriceStatus,
      serviceTaxValue: this.serviceTaxValue,
    };

    try {
      let response = await axios.post(
        `/ServicesReservationAddedServices/AddServicesReservationAddedServices`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async cancelServicesReservationAddedServices(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      reservationAddedServicesToken: this.reservationAddedServicesToken,
      refoundReasonAr: this.refoundReasonAr,
      refoundReasonEn: this.refoundReasonEn,
      refoundReasonUnd: this.refoundReasonUnd,
      refoundMethodPaidToken: this.refoundMethodPaidToken,
      refoundTreasuryToken: this.refoundTreasuryToken,
      refundPercentageFromPaid: this.refundPercentageFromPaid,
    };

    try {
      let response = await axios.post(
        `/ServicesReservationAddedServices/CancelServicesReservationAddedServices`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async getServicesReservationAddedServicesReport(
    language,
    userAuthorizeToken,
    filterData
  ) {
    try {
      let response = await axios.get(
        `/ServicesReservationAddedServices/GetServicesReservationAddedServicesReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&reservationAddedServicesToken=${this.reservationAddedServicesToken}&sendTo=${filterData.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPath);
      }
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
  async getServicesReservationAddedServicesReportWithTax(
    language,
    userAuthorizeToken,
    filterData
  ) {
    try {
      let response = await axios.get(
        `/ServicesReservationAddedServices/GetServicesReservationAddedServicesWithTaxReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&reservationAddedServicesToken=${this.reservationAddedServicesToken}&sendTo=${filterData.sendTo}`
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
