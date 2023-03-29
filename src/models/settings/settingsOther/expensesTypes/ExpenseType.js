import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class ExpenseType {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.expensesTypeToken = "";
    this.expensesTypeNameCurrent = "";
    this.expensesTypeNameEn = "";
    this.expensesTypeNameAr = "";
    this.expensesTypeNameUnd = "";
    this.expensesTypeNotes = "";
    this.expensesTypeArchiveStatus = "";
  }
  fillData(data) {
    this.expensesTypeToken = data.expensesTypeToken;
    this.expensesTypeNameCurrent = data.expensesTypeNameCurrent;
    this.expensesTypeNameEn = data.expensesTypeNameEn;
    this.expensesTypeNameAr = data.expensesTypeNameAr;
    this.expensesTypeNameUnd = data.expensesTypeNameUnd;
    this.expensesTypeNotes = data.expensesTypeNotes;
    this.expensesTypeArchiveStatus = data.expensesTypeArchiveStatus;
  }

  async getAllExpensesTypes(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/ExpensesTypes/GetAllExpensesTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getExpenseTypeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ExpensesTypes/GetExpensesTypesDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&expensesTypeToken=${this.expensesTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfExpensesTypes(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ExpensesTypes/GetDialogOfExpensesTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateExpenseType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      expensesTypeToken: this.expensesTypeToken,
      expensesTypeNameEn: this.expensesTypeNameEn,
      expensesTypeNameAr: this.expensesTypeNameAr,
      expensesTypeNameUnd: this.expensesTypeNameUnd,
      expensesTypeNotes: this.expensesTypeNotes,
    };

    try {
      let response = "";
      if (this.expensesTypeToken == "" || this.expensesTypeToken == undefined) {
        response = await axios.post(`/ExpensesTypes/AddExpensesTypes`, data);
      } else {
        response = await axios.post(`/ExpensesTypes/UpdateExpensesTypes`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveExpenseType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      expensesTypeToken: this.expensesTypeToken,
    };

    try {
      let response = await axios.post(
        `/ExpensesTypes/ArchiveExpensesTypes`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
