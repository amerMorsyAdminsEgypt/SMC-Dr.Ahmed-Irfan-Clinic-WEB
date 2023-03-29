<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="expensesData">
      <ExpensesTable
        :expensesData="expensesData"
        :expenseData="expenseData"
        v-on:setExpenseData="expenseData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <ExpenseInfo :expenseData="expenseData" />
      <ExpenseRefund
        :expenseData="expenseData"
        v-on:refresh="getAllExpenses()"
      />
    </div>

    <ExpenseFloatBtns
      :textSearch="textSearch"
      :branchToken="branchToken"
      :treasuryToken="treasuryToken"
      :expensesTypeToken="expensesTypeToken"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import ExpensesTable from "@/components/finance/expenses/ExpensesTable.vue";
import ExpenseInfo from "@/components/finance/expenses/ExpenseInfo.vue";
import ExpenseRefund from "@/components/finance/expenses/ExpenseRefund.vue";
import ExpenseFloatBtns from "@/components/finance/expenses/ExpenseFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Expense from "@/models/finance/expenses/Expense";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Expenses",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ExpensesTable,
    ExpenseInfo,
    ExpenseRefund,
    ExpenseFloatBtns,
    Pagination,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      textSearch: "",
      branchToken: "",
      treasuryToken: "",
      expensesTypeToken: "",
      dateFrom: "",
      dateTo: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      expensesData: null,
      expenseData: new Expense(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllExpenses();
    },
    search(
      text,
      branchToken,
      treasuryToken,
      expensesTypeToken,
      dateFrom,
      dateTo
    ) {
      this.textSearch = text;
      this.branchToken = branchToken;
      this.treasuryToken = treasuryToken;
      this.expensesTypeToken = expensesTypeToken;
      this.dateFrom = dateFrom;
      this.dateTo = dateTo;
      this.getAllExpenses();
    },
    async getAllExpenses() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Expenses/GetAllExpensesData?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&branchToken=${this.branchToken}&treasuryToken=${this.treasuryToken}&expensesTypeToken=${this.expensesTypeToken}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.expensesPagination.totalPages,
            totalItems: response.data.expensesPagination.totalItems,
            countItemsInPage: response.data.expensesPagination.countItemsInPage,
            selfPage: response.data.expensesPagination.selfPage,
          };
          this.expensesData = response.data.expensesPagination.expensesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.expensesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.expensesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.expensesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.expensesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllExpenses();
  },
};
</script>
