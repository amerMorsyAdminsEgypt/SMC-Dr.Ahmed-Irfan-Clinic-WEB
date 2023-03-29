import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";

export default class Wallet {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.walletTransactionToken = "";
    this.walletTransactionCode = "";
    this.methodPaidToken = "";
    this.methodPaidNameCurrent = "";
    this.clientToken = "";
    this.clientNameCurrent = "";
    this.employeeToken = "";
    this.employeeNameCurrent = "";
    this.treasuryToken = "";
    this.treasuryNameCurrent = "";
    this.contractorToken = "";
    this.contractorNameCurrent = "";
    this.walletTransactionReasonEn = "";
    this.walletTransactionReasonAr = "";
    this.walletTransactionReasonUnd = "";
    this.walletTransactionTypeToken = "";
    this.walletTransactionTypeNameEn = "";
    this.walletTransactionTypeNameAr = "";
    this.walletTransactionTypeNameUnd = "";
    this.walletTransactionValue = "";
    this.walletTransactionOldValue = "";
    this.walletTransactionNewValue = "";
    this.userMakeActionToken = "";
    this.userMakeActionNameCurrent = "";
    this.payToken = "";
    this.notes = "";
    this.actionDateTime = "";
    this.actionDate = "";
    this.actionTime = "";
    this.walletTransactionArchiveStatus = "";
    this.paginationData = new PaginationData();
    // filterData
    this.textSearch = "";
  }
  fillData(data) {
    this.walletTransactionToken = data.walletTransactionToken;
    this.walletTransactionCode = data.walletTransactionCode;
    this.methodPaidToken = data.methodPaidToken;
    this.methodPaidNameCurrent = data.methodPaidNameCurrent;
    this.clientToken = data.clientToken;
    this.clientNameCurrent = data.clientNameCurrent;
    this.employeeToken = data.employeeToken;
    this.employeeNameCurrent = data.employeeNameCurrent;
    this.treasuryToken = data.treasuryToken;
    this.treasuryNameCurrent = data.treasuryNameCurrent;
    this.contractorToken = data.contractorToken;
    this.contractorNameCurrent = data.contractorNameCurrent;
    this.walletTransactionReasonEn = data.walletTransactionReasonEn;
    this.walletTransactionReasonAr = data.walletTransactionReasonAr;
    this.walletTransactionReasonUnd = data.walletTransactionReasonUnd;
    this.walletTransactionTypeToken = data.walletTransactionTypeToken;
    this.walletTransactionTypeNameEn = data.walletTransactionTypeNameEn;
    this.walletTransactionTypeNameAr = data.walletTransactionTypeNameAr;
    this.walletTransactionTypeNameUnd = data.walletTransactionTypeNameUnd;
    this.walletTransactionValue = data.walletTransactionValue;
    this.walletTransactionOldValue = data.walletTransactionOldValue;
    this.walletTransactionNewValue = data.walletTransactionNewValue;
    this.userMakeActionToken = data.userMakeActionToken;
    this.userMakeActionNameCurrent = data.userMakeActionNameCurrent;
    this.payToken = data.payToken;
    this.notes = data.notes;
    this.actionDateTime = data.actionDateTime;
    this.actionDate = data.actionDate;
    this.actionTime = data.actionTime;
    this.walletTransactionArchiveStatus = data.walletTransactionArchiveStatus;
  }

  async getAllWalletTransactions(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/WalletTransactions/GetAllWalletTransactions?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&clientToken=${this.clientToken}&employeeToken=${this.employeeToken}&contractorToken=${this.contractorToken}&walletTransactionTypeToken=${this.walletTransactionTypeToken}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages: response.data.walletTransactionssPagination.totalPages,
        totalItems: response.data.walletTransactionssPagination.totalItems,
        countItemsInPage:
          response.data.walletTransactionssPagination.countItemsInPage,
        selfPage: response.data.walletTransactionssPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getWalletTransactionsDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/WalletTransactions/GetWalletTransactionsDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&walletTransactionToken=${this.walletTransactionToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async updateWalletTransactions(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      walletTransactionCode: this.walletTransactionCode,
      clientToken: this.clientToken,
      walletTransactionReasonEn: this.walletTransactionReasonEn,
      walletTransactionReasonAr: this.walletTransactionReasonAr,
      walletTransactionReasonUnd: this.walletTransactionReasonUnd,
      walletTransactionTypeToken: this.walletTransactionTypeToken,
      walletTransactionValue: this.walletTransactionValue,
      methodPaidToken: this.methodPaidToken,
      treasuryToken: this.treasuryToken,
      notes: this.notes,
    };

    try {
      let response = await axios.post(
        `/WalletTransactions/AddWalletTransactions`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
