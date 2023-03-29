import { PAGE_SIZE, STATUS } from "@/utils/constants";
import { date2slash, viewFileFromServer } from "@/utils/functions";
import axios from "axios";

export default class TreasuryTransaction {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.transactionToken = "";
    this.transactionCode = "";
    this.treasuryToken = "";
    this.treasuryNameCurrent = "";
    this.branchToken = "";
    this.branchNameCurrent = "";
    this.userToken = "";
    this.userNameCurrent = "";
    this.transactionDate = "";
    this.transactionMoney = "";
    this.transactionSerialNumber = "";
    this.transactionNote = "";
    this.transactionTypeToken = "";
    this.transactionTypeNameCurrent = "";
    this.transactionTypeNameAr = "";
    this.transactionTypeNameEn = "";
    this.transactionTypeNameUnd = "";
    this.actionDateTime = "";
    this.actionDate = "";
    this.actionTime = "";
    this.expensesToken = "";
    this.revenuesToken = "";
    this.subscriptionClientToken = "";
    this.installmentToken = "";
    this.transactionArchiveStatus = "";
    // filterData
    this.dateFrom = "";
    this.dateTo = "";
    this.textSearch = "";
    this.sendTo = "";
  }
  fillData(data) {
    this.transactionToken = data.transactionToken;
    this.transactionCode = data.transactionCode;
    this.treasuryToken = data.treasuryToken;
    this.treasuryNameCurrent = data.treasuryNameCurrent;
    this.branchToken = data.branchToken;
    this.branchNameCurrent = data.branchNameCurrent;
    this.userToken = data.userToken;
    this.userNameCurrent = data.userNameCurrent;
    this.transactionDate = data.transactionDate;
    this.transactionMoney = data.transactionMoney;
    this.transactionSerialNumber = data.transactionSerialNumber;
    this.transactionNote = data.transactionNote;
    this.transactionTypeToken = data.transactionTypeToken;
    this.transactionTypeNameCurrent = data.transactionTypeNameCurrent;
    this.transactionTypeNameAr = data.transactionTypeNameAr;
    this.transactionTypeNameEn = data.transactionTypeNameEn;
    this.transactionTypeNameUnd = data.transactionTypeNameUnd;
    this.actionDateTime = data.actionDateTime;
    this.actionDate = data.actionDate;
    this.actionTime = data.actionTime;
    this.expensesToken = data.expensesToken;
    this.revenuesToken = data.revenuesToken;
    this.subscriptionClientToken = data.subscriptionClientToken;
    this.installmentToken = data.installmentToken;
    this.transactionArchiveStatus = data.transactionArchiveStatus;
  }

  async getTreasuriesTransactions(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch,
    treasuryToken,
    transactionTypeToken
  ) {
    try {
      let response = await axios.get(
        `/TreasuriesTransactions/GetTreasuriesTransactions?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&treasuryToken=${treasuryToken}&transactionTypeToken=${transactionTypeToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getTreasuryTransactionDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/TreasuriesTransactions/GetTreasuriesTransactionDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&transactionToken=${this.transactionToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addTreasuryProcess(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      treasuryToken: this.treasuryToken,
      transactionCode: this.transactionCode,
      transactionMoney: this.transactionMoney,
      transactionDate: date2slash(this.transactionDate),
      transactionTypeToken: this.transactionTypeToken,
      transactionSerialNumber: this.transactionSerialNumber,
      transactionNote: this.transactionNote,
    };

    try {
      let response = await axios.post(
        `/TreasuriesTransactions/AddTreasuryProcess`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async getTreasuriesTransactionsReport(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/TreasuriesTransactions/GetTreasuriesTransactionsReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&treasuryToken=${this.treasuryToken}&transactionTypeToken=${this.transactionTypeToken}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&textSearch=${this.textSearch}&sendTo=${this.sendTo}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        viewFileFromServer(response.data.reportPath);
      }
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getTreasuryTransactionReport(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/TreasuriesTransactions/GetTreasuryTransactionReport?language=${language}&userAuthorizeToken=${userAuthorizeToken}&transactionToken=${this.transactionToken}&sendTo=${this.sendTo}`
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
