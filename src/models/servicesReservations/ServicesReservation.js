import { PAGE_SIZE, STATUS, TAX_VALUE } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";
import ServicesReservationPay from "@/models/servicesPayments/ServicesReservationPay";

export default class ServicesReservation {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    // #region filter
    this.IncludeServicesReservationMeasurementRoomData = false;
    this.IncludeServicesReservationRequestData = true;
    this.IncludeServicesReservationApproverData = true;
    this.IncludeServicesReservationPayData = false;
    this.IncludeServicesReservationAttendanceData = true;
    this.IncludeServicesReservationFinishData = true;
    this.IncludeServicesReservationEntreeData = true;
    this.IncludeServicesReservationWaitAndWillComeBackData = true;
    this.calendarSearchType = "CST-5"; // set by me
    this.calendarYear = "";
    this.calendarMonth = "";
    this.calendarWeek = "";
    this.calendarDay = "";
    this.dateTimeStartSearch = "";
    this.dateTimeEndSearch = "";
    // #endregion filter

    this.reservationToken = "";
    this.reservationNameCurrent = "";
    this.reservationCode = "";
    this.clientToken = "";
    this.clientNameCurrent = "";
    this.clientCode = "";
    this.clientPhone = "";
    this.clientCountryCode = "";
    this.clientPhoneWithCC = "";
    this.clientImagePath = "";
    this.insuranceCompanyToken = "";
    this.insuranceCompanyNameCurrent = "";
    this.branchToken = "";
    this.branchNameCurrent = "";
    this.buildingToken = "";
    this.buildingNameCurrent = "";
    this.chamberToken = "";
    this.chamberNameCurrent = "";
    this.floorToken = "";
    this.floorNameCurrent = "";
    this.officeTimeToken = "";
    this.officeToken = "";
    this.officeNameCurrent = "";
    this.employeeToken = "";
    this.employeeNameCurrent = "";
    this.employeeImagePath = "";
    this.employeeCode = "";
    this.jobToken = "";
    this.jobNameCurrent = "";
    this.timeNameCurrent = "";
    this.timeNameEn = "";
    this.timeNameAr = "";
    this.timeNameUnd = "";
    this.officeOpenTime = "";
    this.officeCloseTime = "";
    this.dayToken = "";
    this.dayNameCurrent = "";
    this.dayNameEn = "";
    this.dayNameAr = "";
    this.dayNameUnd = "";
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
    this.serviceFinalPrice = "";
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
    this.numberInReservationServes = "";
    this.numberInArrive = "";
    this.numberRealToEntry = "";
    this.estimatedDateTimeArrival = "";
    this.estimatedDateTimeEnter = "";
    this.reservationStatusToken = "";
    this.reservationStatusNameCurrent = "";
    this.reservationStatusNameAr = "";
    this.reservationStatusNameEn = "";
    this.reservationStatusNameUnd = "";
    this.reservationRequestNotes = "";
    this.reservationDate = "";
    this.feesTypeToken = "";
    this.feesTypeNameCurrent = "";
    this.feesTypeNameAr = "";
    this.feesTypeNameEn = "";
    this.feesTypeNameUnd = "";
    this.feesTypeValue = 0;
    this.totalPaid = "";
    this.remainingAmount = "";
    this.refoundValue = "";
    this.totalPaidWithRefound = "";
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
    this.actionDateTime = "";
    this.offerMediaPath = "";
    this.approvalStatus = "";
    this.cancelStatus = "";
    this.paymentStatus = "";
    this.finishStatus = "";
    this.measurementRoomStatus = "";
    this.reservationArchiveStatus = "";
    this.reservationArchiveStatus = "";
    this.followToreseRvationToken = "";
    this.reservationCountFollowing = "";
    this.reservationCountAddedServices = "";
    this.reservationTypeToken = "";
    this.reservationTypeNameCurrnet = "";
    this.reservationTypeNameAr = "";
    this.reservationTypeNameEn = "";
    this.reservationTypeNameUnd = "";
    this.servicesReservationPayData = new ServicesReservationPay();
    this.timeFrom = "";
    this.timeTo = "";
    this.dateFrom = "";
    this.dateTo = "";
    this.note = "";
    this.servicesReservationRequestData = {};
    this.servicesReservationApproverData = {};
    this.servicesReservationAttendanceData = {};
    this.servicesReservationMeasurementRoomData = {};
    this.servicesReservationFinishData = {};
    this.servicesReservationPayDataHistory = [];
    this.servicesReservationEntreeData = [];
    this.servicesReservationWaitAndWillComeBackData = [];
    this.cancelServicesReservationsData = [];
    this.paginationData = new PaginationData();
    this.textSearch = "";
    this.sendTo = "";
    this.addInsuranceCompanyDiscountPercentageStatus = false;
    this.calculateTaxesStatus = false;
    this.addTaxForOnlyServicePriceStatus = false;
    this.serviceTaxValue = TAX_VALUE;
    this.approverNote = "";
  }
  fillData(data) {
    this.IncludeServicesReservationMeasurementRoomData =
      data.IncludeServicesReservationMeasurementRoomData;
    this.IncludeServicesReservationRequestData =
      data.IncludeServicesReservationRequestData;
    this.IncludeServicesReservationApproverData =
      data.IncludeServicesReservationApproverData;
    this.IncludeServicesReservationPayData =
      data.IncludeServicesReservationPayData;
    this.IncludeServicesReservationAttendanceData =
      data.IncludeServicesReservationAttendanceData;
    this.IncludeServicesReservationFinishData =
      data.IncludeServicesReservationFinishData;
    this.IncludeServicesReservationEntreeData =
      data.IncludeServicesReservationEntreeData;
    this.IncludeServicesReservationWaitAndWillComeBackData =
      data.IncludeServicesReservationWaitAndWillComeBackData;
    this.reservationToken = data.reservationToken;
    this.reservationNameCurrent = data.reservationNameCurrent;
    this.reservationCode = data.reservationCode;
    this.clientToken = data.clientToken;
    this.clientNameCurrent = data.clientNameCurrent;
    this.clientCode = data.clientCode;
    this.clientPhone = data.clientPhone;
    this.clientCountryCode = data.clientCountryCode;
    this.clientPhoneWithCC = data.clientPhoneWithCC;
    this.clientImagePath = data.clientImagePath;
    this.insuranceCompanyToken = data.insuranceCompanyToken;
    this.insuranceCompanyNameCurrent = data.insuranceCompanyNameCurrent;
    this.branchToken = data.branchToken;
    this.branchNameCurrent = data.branchNameCurrent;
    this.buildingToken = data.buildingToken;
    this.buildingNameCurrent = data.buildingNameCurrent;
    this.chamberToken = data.chamberToken;
    this.chamberNameCurrent = data.chamberNameCurrent;
    this.floorToken = data.floorToken;
    this.floorNameCurrent = data.floorNameCurrent;
    this.officeTimeToken = data.officeTimeToken;
    this.officeToken = data.officeToken;
    this.officeNameCurrent = data.officeNameCurrent;
    this.employeeToken = data.employeeToken;
    this.employeeNameCurrent = data.employeeNameCurrent;
    this.employeeImagePath = data.employeeImagePath;
    this.employeeCode = data.employeeCode;
    this.jobToken = data.jobToken;
    this.jobNameCurrent = data.jobNameCurrent;
    this.timeNameCurrent = data.timeNameCurrent;
    this.timeNameEn = data.timeNameEn;
    this.timeNameAr = data.timeNameAr;
    this.timeNameUnd = data.timeNameUnd;
    this.officeOpenTime = data.officeOpenTime;
    this.officeCloseTime = data.officeCloseTime;
    this.dayToken = data.dayToken;
    this.dayNameCurrent = data.dayNameCurrent;
    this.dayNameEn = data.dayNameEn;
    this.dayNameAr = data.dayNameAr;
    this.dayNameUnd = data.dayNameUnd;
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
    this.serviceFinalPrice = data.serviceFinalPrice ?? "";
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
    this.numberInReservationServes = data.numberInReservationServes;
    this.numberInArrive = data.numberInArrive;
    this.numberRealToEntry = data.numberRealToEntry;
    this.estimatedDateTimeArrival = data.estimatedDateTimeArrival;
    this.estimatedDateTimeEnter = data.estimatedDateTimeEnter;
    this.reservationStatusToken = data.reservationStatusToken;
    this.reservationStatusNameCurrent = data.reservationStatusNameCurrent;
    this.reservationStatusNameAr = data.reservationStatusNameAr;
    this.reservationStatusNameEn = data.reservationStatusNameEn;
    this.reservationStatusNameUnd = data.reservationStatusNameUnd;
    this.reservationRequestNotes = data.reservationRequestNotes;
    this.reservationDate = data.reservationDate;
    this.feesTypeToken = data.feesTypeToken;
    this.feesTypeNameCurrent = data.feesTypeNameCurrent;
    this.feesTypeNameAr = data.feesTypeNameAr;
    this.feesTypeNameEn = data.feesTypeNameEn;
    this.feesTypeNameUnd = data.feesTypeNameUnd;
    this.feesTypeValue = data.feesTypeValue ?? 0;
    this.totalPaid = data.totalPaid;
    this.remainingAmount = data.remainingAmount;
    this.refoundValue = data.refoundValue;
    this.totalPaidWithRefound = data.totalPaidWithRefound;
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
    this.actionDateTime = data.actionDateTime;
    this.offerMediaPath = data.offerMediaPath;
    this.approvalStatus = data.approvalStatus;
    this.cancelStatus = data.cancelStatus;
    this.paymentStatus = data.paymentStatus;
    this.finishStatus = data.finishStatus;
    this.measurementRoomStatus = data.measurementRoomStatus;
    this.reservationArchiveStatus = data.reservationArchiveStatus;
    this.followToreseRvationToken = data.followToreseRvationToken;
    this.reservationCountFollowing = data.reservationCountFollowing;
    this.reservationCountAddedServices = data.reservationCountAddedServices;
    this.reservationTypeToken = data.reservationTypeToken;
    this.reservationTypeNameCurrnet = data.reservationTypeNameCurrnet;
    this.reservationTypeNameAr = data.reservationTypeNameAr;
    this.reservationTypeNameEn = data.reservationTypeNameEn;
    this.reservationTypeNameUnd = data.reservationTypeNameUnd;
    this.servicesReservationRequestData = data.servicesReservationRequestData;
    this.servicesReservationApproverData = data.servicesReservationApproverData;
    this.servicesReservationAttendanceData =
      data.servicesReservationAttendanceData;
    this.servicesReservationMeasurementRoomData =
      data.servicesReservationMeasurementRoomData;
    this.servicesReservationFinishData = data.servicesReservationFinishData;
    this.servicesReservationPayDataHistory =
      data.servicesReservationPayDataHistory;
    this.servicesReservationEntreeData = data.servicesReservationEntreeData;
    this.servicesReservationWaitAndWillComeBackData =
      data.servicesReservationWaitAndWillComeBackData;
    this.cancelServicesReservationsData = data.cancelServicesReservationsData;
    this.addInsuranceCompanyDiscountPercentageStatus =
      data.addInsuranceCompanyDiscountPercentageStatus ?? false;
    this.calculateTaxesStatus = data.calculateTaxesStatus ?? false;
    this.addTaxForOnlyServicePriceStatus =
      data.addTaxForOnlyServicePriceStatus ?? false;
    this.serviceTaxValue = data.serviceTaxValue ?? TAX_VALUE;
    this.approverNote = data.approverNote ?? "";
  }

  async getAllServicesReservations(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservations/GetAllServicesReservations?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&IncludeServicesReservationMeasurementRoomData=${this.IncludeServicesReservationMeasurementRoomData}&IncludeServicesReservationRequestData=${this.IncludeServicesReservationRequestData}&IncludeServicesReservationApproverData=${this.IncludeServicesReservationApproverData}&IncludeServicesReservationPayData=${this.IncludeServicesReservationPayData}&IncludeServicesReservationAttendanceData=${this.IncludeServicesReservationAttendanceData}&IncludeServicesReservationFinishData=${this.IncludeServicesReservationFinishData}&IncludeServicesReservationEntreeData=${this.IncludeServicesReservationEntreeData}&IncludeServicesReservationWaitAndWillComeBackData=${this.IncludeServicesReservationWaitAndWillComeBackData}&clientToken=${this.clientToken}&serviceTypeToken=${this.serviceTypeToken}&serviceToken=${this.serviceToken}&reservationStatusToken=${this.reservationStatusToken}&employeeToken=${this.employeeToken}&officeToken=${this.officeToken}&dayToken=${this.dayToken}&generalSpecialtyToken=${this.generalSpecialtyToken}&specialSpecialtyToken=${this.specialSpecialtyToken}&timeFrom=${this.timeFrom}&timeTo=${this.timeTo}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&reservationTypeToken=${this.reservationTypeToken}&followToreseRvationToken=${this.followToreseRvationToken}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages: response.data.servicesReservationPagination.totalPages,
        totalItems: response.data.servicesReservationPagination.totalItems,
        countItemsInPage:
          response.data.servicesReservationPagination.countItemsInPage,
        selfPage: response.data.servicesReservationPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
  async getAllServicesReservationsCalendar(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservations/GetAllServicesReservationsInCalender?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&clientToken=${this.clientToken}&serviceTypeToken=${this.serviceTypeToken}&serviceToken=${this.serviceToken}&reservationStatusToken=${this.reservationStatusToken}&employeeToken=${this.employeeToken}&officeToken=${this.officeToken}&dayToken=${this.dayToken}&generalSpecialtyToken=${this.generalSpecialtyToken}&specialSpecialtyToken=${this.specialSpecialtyToken}&calendarSearchType=${this.calendarSearchType}&calendarYear=${this.calendarYear}&calendarMonth=${this.calendarMonth}&calendarWeek=${this.calendarWeek}&calendarDay=${this.calendarDay}&dateTimeStartSearch=${this.dateTimeStartSearch}&dateTimeEndSearch=${this.dateTimeEndSearch}&textSearch=${this.textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getServicesReservationDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservations/GetServicesReservationDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&IncludeServicesReservationMeasurementRoomData=${this.IncludeServicesReservationMeasurementRoomData}&IncludeServicesReservationRequestData=${this.IncludeServicesReservationRequestData}&IncludeServicesReservationApproverData=${this.IncludeServicesReservationApproverData}&IncludeServicesReservationPayData=${this.IncludeServicesReservationPayData}&IncludeServicesReservationAttendanceData=${this.IncludeServicesReservationAttendanceData}&IncludeServicesReservationFinishData=${this.IncludeServicesReservationFinishData}&IncludeServicesReservationEntreeData=${this.IncludeServicesReservationEntreeData}&IncludeServicesReservationWaitAndWillComeBackData=${this.IncludeServicesReservationWaitAndWillComeBackData}&reservationToken=${this.reservationToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfServicesReservations(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservations/GetDialogOfServicesReservations?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&clientToken=${this.clientToken}&reservationTypeToken=${this.reservationTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addRequestServicesReservation(language, userAuthorizeToken) {
    if (!this.calculateTaxesStatus) {
      this.addTaxForOnlyServicePriceStatus = false;
      this.serviceTaxValue = 0;
    }
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      followToreseRvationToken: this.followToreseRvationToken,
      officeTimeToken: this.officeTimeToken,
      serviceToken: this.serviceToken,
      offerCode: this.offerCode,
      reservationDate: this.reservationDate,
      clientToken: this.clientToken,
      feesTypeToken: this.feesTypeToken,
      feesTypeValue: this.feesTypeValue,
      reservationRequestNotes: this.reservationRequestNotes,
      servicesReservationPayData: this.servicesReservationPayData,
      addInsuranceCompanyDiscountPercentageStatus:
        this.addInsuranceCompanyDiscountPercentageStatus,
      calculateTaxesStatus: this.calculateTaxesStatus,
      addTaxForOnlyServicePriceStatus: this.addTaxForOnlyServicePriceStatus,
      serviceTaxValue: this.serviceTaxValue,
    };

    try {
      let response = await axios.post(
        `/ServicesReservations/AddRequestServicesReservation`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async approveOnServicesReservation(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      reservationToken: this.reservationToken,
      approverNote: this.approverNote,
      feesTypeToken: this.feesTypeToken,
      feesTypeValue: this.feesTypeValue,
      calculateTaxesStatus: this.calculateTaxesStatus,
      addTaxForOnlyServicePriceStatus: this.addTaxForOnlyServicePriceStatus,
      addInsuranceCompanyDiscountPercentageStatus:
        this.addInsuranceCompanyDiscountPercentageStatus,
      serviceTaxValue: this.serviceTaxValue,
      servicesReservationPayData: this.servicesReservationPayData,
    };

    try {
      let response = await axios.post(
        `/ServicesReservations/ApproverOneServicesReservation`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
  async attendServicesReservation(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      reservationListData: [
        {
          reservationToken: this.reservationToken,
          note: this.note,
        },
      ],
    };

    try {
      let response = await axios.post(
        `/ServicesReservations/AttendanceServicesReservation`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
  async enterServicesReservation(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      reservationListData: [
        {
          reservationToken: this.reservationToken,
          note: this.note,
        },
      ],
    };

    try {
      let response = await axios.post(
        `/ServicesReservations/EntreeServicesReservation`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
  async waitForComeBackServicesReservation(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      reservationListData: [
        {
          reservationToken: this.reservationToken,
          note: this.note,
        },
      ],
    };

    try {
      let response = await axios.post(
        `/ServicesReservations/WaitAndWillComeBackServicesReservation`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
  async finishServicesReservation(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      reservationToken: this.reservationToken,
      finishNote: this.note,
    };

    try {
      let response = await axios.post(
        `/ServicesReservationFinish/AddServicesReservationFinish`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
  async getDialogOfReservationStatus(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservations/GetStatisticsServicesReservations?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&clientToken=${this.clientToken}&reservationStatusToken=${this.reservationStatusToken}&serviceTypeToken=${this.serviceTypeToken}&serviceToken=${this.serviceToken}&reservationStatusToken=${this.reservationStatusToken}&employeeToken=${this.employeeToken}&officeToken=${this.officeToken}&dayToken=${this.dayToken}&generalSpecialtyToken=${this.generalSpecialtyToken}&specialSpecialtyToken=${this.specialSpecialtyToken}&timeFrom=${this.timeFrom}&timeTo=${this.timeTo}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&reservationTypeToken=${this.reservationTypeToken}&followToreseRvationToken=${this.followToreseRvationToken}&textSearch=${this.textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getAllServicesReservationsReport(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservations/GetAllServicesReservationsReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&clientToken=${this.clientToken}&serviceToken=${this.serviceToken}&reservationStatusToken=${this.reservationStatusToken}&branchToken=${this.branchToken}&buildingToken=${this.buildingToken}&chamberToken=${this.chamberToken}&floorToken=${this.floorToken}&officeToken=${this.officeToken}&officeTimeToken=${this.officeTimeToken}&dayToken=${this.dayToken}&specialSpecialtyToken=${this.specialSpecialtyToken}&generalSpecialtyToken=${this.generalSpecialtyToken}&feesTypeToken=${this.feesTypeToken}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&textSearch=${this.textSearch}&sendTo=${this.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPath);
      }
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
  async getServicesReservationsReport(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservations/GetServicesReservationsReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&reservationToken=${this.reservationToken}&sendTo=${this.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPath);
      }
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
  async getServicesReservationsReportWithTax(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservations/GetServicesReservationsWithTaxReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&reservationToken=${this.reservationToken}&sendTo=${this.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPath);
      }
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getAllReservationCancel(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservationCancel/GetAllCancel?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&cancelArchiveStatus=false&reservationToken=${this.reservationToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
}
