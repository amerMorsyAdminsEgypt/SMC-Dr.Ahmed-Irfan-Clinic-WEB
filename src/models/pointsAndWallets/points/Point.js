import { PAGE_SIZE } from "@/utils/constants";
import { USER_ROLE_TOKEN, USER_POINT_TYPE_TOKEN } from "@/utils/constantLists";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";

export default class Point {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.transactionPointsHistoryToken = "";
    this.transactionPointsHistoryCode = "";
    this.userPointsTypeToken = USER_POINT_TYPE_TOKEN.client;
    this.userPointsTypeNameEn = "";
    this.userPointsTypeNameAr = "";
    this.userPointsTypeNameUnd = "";
    this.treasuryToken = "";
    this.treasuryNameCurrent = "";
    this.clientToken = "";
    this.clientNameCurrent = "";
    this.employeeToken = "";
    this.employeeNameCurrent = "";
    this.contractorToken = "";
    this.contractorNameCurrent = "";
    this.transactionPointsReasonEn = "";
    this.transactionPointsReasonAr = "";
    this.transactionPointsReasonUnd = "";
    this.transactionPointsTypeToken = "";
    this.transactionPointsTypeNameEn = "";
    this.transactionPointsTypeNameAr = "";
    this.transactionPointsTypeNameUnd = "";
    this.transactionPointsValue = "";
    this.transactionPointsOldValue = "";
    this.transactionPointsNewValue = "";
    this.userMakeActionToken = "";
    this.userMakeActionNameCurrent = "";
    this.notes = "";
    this.actionDateTime = "";
    this.actionDate = "";
    this.actionTime = "";
    this.transactionPointsHistoryArchiveStatus = "";
    this.paginationData = new PaginationData();
    // filterData
    this.textSearch = "";
    this.userRoleToken = USER_ROLE_TOKEN.client;
  }
  fillData(data) {
    this.transactionPointsHistoryToken = data.transactionPointsHistoryToken;
    this.transactionPointsHistoryCode = data.transactionPointsHistoryCode;
    this.userPointsTypeToken = data.userPointsTypeToken;
    this.userPointsTypeNameEn = data.userPointsTypeNameEn;
    this.userPointsTypeNameAr = data.userPointsTypeNameAr;
    this.userPointsTypeNameUnd = data.userPointsTypeNameUnd;
    this.treasuryToken = data.treasuryToken;
    this.treasuryNameCurrent = data.treasuryNameCurrent;
    this.clientToken = data.clientToken;
    this.clientNameCurrent = data.clientNameCurrent;
    this.employeeToken = data.employeeToken;
    this.employeeNameCurrent = data.employeeNameCurrent;
    this.contractorToken = data.contractorToken;
    this.contractorNameCurrent = data.contractorNameCurrent;
    this.transactionPointsReasonEn = data.transactionPointsReasonEn;
    this.transactionPointsReasonAr = data.transactionPointsReasonAr;
    this.transactionPointsReasonUnd = data.transactionPointsReasonUnd;
    this.transactionPointsTypeToken = data.transactionPointsTypeToken;
    this.transactionPointsTypeNameEn = data.transactionPointsTypeNameEn;
    this.transactionPointsTypeNameAr = data.transactionPointsTypeNameAr;
    this.transactionPointsTypeNameUnd = data.transactionPointsTypeNameUnd;
    this.transactionPointsValue = data.transactionPointsValue;
    this.transactionPointsOldValue = data.transactionPointsOldValue;
    this.transactionPointsNewValue = data.transactionPointsNewValue;
    this.userMakeActionToken = data.userMakeActionToken;
    this.userMakeActionNameCurrent = data.userMakeActionNameCurrent;
    this.notes = data.notes;
    this.actionDateTime = data.actionDateTime;
    this.actionDate = data.actionDate;
    this.actionTime = data.actionTime;
    this.transactionPointsHistoryArchiveStatus =
      data.transactionPointsHistoryArchiveStatus;
  }

  async getAllTransactionPointsHistory(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/TransactionPointsHistory/GetAllTransactionPointsHistory?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&userRoleToken${this.userRoleToken}&contractorArchiveStatus=pageSize=${PAGE_SIZE}&filterStatus=true&clientToken=${this.clientToken}&employeeToken=${this.employeeToken}&contractorToken=${this.contractorToken}&userPointsTypeToken=${this.userPointsTypeToken}&transactionPointsTypeToken=${this.transactionPointsTypeToken}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages:
          response.data.transactionPointsHistorysPagination.totalPages,
        totalItems:
          response.data.transactionPointsHistorysPagination.totalItems,
        countItemsInPage:
          response.data.transactionPointsHistorysPagination.countItemsInPage,
        selfPage: response.data.transactionPointsHistorysPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getTransactionPointsHistoryDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/TransactionPointsHistory/GetTransactionPointsHistoryDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&transactionPointsHistoryToken=${this.transactionPointsHistoryToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async updateTransactionPointsHistory(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      transactionPointsHistoryCode: this.transactionPointsHistoryCode,
      userPointsTypeToken: this.userPointsTypeToken,
      clientToken: this.clientToken,
      employeeToken: this.employeeToken,
      contractorToken: this.contractorToken,
      transactionPointsReasonEn: this.transactionPointsReasonEn,
      transactionPointsReasonAr: this.transactionPointsReasonAr,
      transactionPointsReasonUnd: this.transactionPointsReasonUnd,
      transactionPointsTypeToken: this.transactionPointsTypeToken,
      transactionPointsValue: this.transactionPointsValue,
      notes: this.notes,
    };

    try {
      let response = await axios.post(
        `/TransactionPointsHistory/AddTransactionPointsHistory`,
        data
      );
      console.log(data);
      return response;
    } catch (e) {
      console.log(e);
      return this.$t("errorCatch");
    }
  }
}
