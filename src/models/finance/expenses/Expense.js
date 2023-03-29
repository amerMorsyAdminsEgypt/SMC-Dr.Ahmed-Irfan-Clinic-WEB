import { BASE_URL } from "@/utils/constants";
import { date2slash } from "@/utils/functions";
import axios from "axios";

export default class Expense {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.expensesToken = "";
    this.userToken = "";
    this.userNameCurrent = "";
    this.expensesCode = "";
    this.treasuryToken = "";
    this.treasuryNameCurrent = "";
    this.branchToken = "";
    this.branchNameCurrent = "";
    this.expensesTypeToken = "";
    this.expensesTypeNameCurrent = "";
    this.expensesDatePayed = "";
    this.expensesDateTimeAction = "";
    this.expensesDateAction = "";
    this.expensesTimeAction = "";
    this.expensesMoneyValue = "";
    this.expensesImagePath = "";
    this.imageSrc = BASE_URL + this.expensesImagePath;
    this.expensesNotes = "";
    this.userTokenReturned = "";
    this.userNameCurrentReturned = "";
    this.expensesReturnedDateTime = "";
    this.expensesReturnedDate = "";
    this.expensesReturnedTime = "";
    this.expensesReturnedNote = "";
    this.expensesReturnedStatus = "";
    this.expensesArchiveStatus = "";
    this.dateFrom = "";
    this.dateTo = "";
  }
  fillData(expenseData) {
    this.image = expenseData.image;
    this.expensesToken = expenseData.expensesToken;
    this.userToken = expenseData.userToken;
    this.userNameCurrent = expenseData.userNameCurrent;
    this.expensesCode = expenseData.expensesCode;
    this.treasuryToken = expenseData.treasuryToken;
    this.treasuryNameCurrent = expenseData.treasuryNameCurrent;
    this.branchToken = expenseData.branchToken;
    this.branchNameCurrent = expenseData.branchNameCurrent;
    this.expensesTypeToken = expenseData.expensesTypeToken;
    this.expensesTypeNameCurrent = expenseData.expensesTypeNameCurrent;
    this.expensesDatePayed = expenseData.expensesDatePayed;
    this.expensesDateTimeAction = expenseData.expensesDateTimeAction;
    this.expensesDateAction = expenseData.expensesDateAction;
    this.expensesTimeAction = expenseData.expensesTimeAction;
    this.expensesMoneyValue = expenseData.expensesMoneyValue;
    this.expensesImagePath = expenseData.expensesImagePath;
    this.imageSrc = BASE_URL + expenseData.expensesImagePath;
    this.expensesNotes = expenseData.expensesNotes;
    this.userTokenReturned = expenseData.userTokenReturned;
    this.userNameCurrentReturned = expenseData.userNameCurrentReturned;
    this.expensesReturnedDateTime = expenseData.expensesReturnedDateTime;
    this.expensesReturnedDate = expenseData.expensesReturnedDate;
    this.expensesReturnedTime = expenseData.expensesReturnedTime;
    this.expensesReturnedNote = expenseData.expensesReturnedNote;
    this.expensesReturnedStatus = expenseData.expensesReturnedStatus;
    this.expensesArchiveStatus = expenseData.expensesArchiveStatus;
    this.dateFrom = expenseData.dateFrom;
    this.dateTo = expenseData.dateTo;
  }

  async getExpenseDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Expenses/GetExpensesDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&expensesToken=${this.expensesToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addExpense(language, userAuthorizeToken) {
    var data = {
      image: this.image,
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      expensesTypeToken: this.expensesTypeToken,
      treasuryToken: this.treasuryToken,
      branchToken: this.branchToken,
      expensesDatePayed: date2slash(this.expensesDatePayed),
      expensesMoneyValue: this.expensesMoneyValue,
      expensesNotes: this.expensesNotes,
    };
    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (this.image != "" && this.image != undefined) {
        response = await axios.post(`/Expenses/AddExpensesWithImage`, formData);
      } else {
        response = await axios.post(`/Expenses/AddExpensesWithoutImage`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async refundExpense(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      expensesToken: this.expensesToken,
    };

    try {
      let response = await axios.post(`/Expenses/RefundExpenses`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
