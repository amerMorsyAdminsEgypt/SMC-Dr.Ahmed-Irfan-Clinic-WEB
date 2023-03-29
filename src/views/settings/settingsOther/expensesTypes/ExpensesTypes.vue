<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="expensesTypesData">
      <ExpensesTypesTable
        :expensesTypesData="expensesTypesData"
        :expenseTypeData="expenseTypeData"
        v-on:setExpenseTypeData="expenseTypeData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <ExpenseTypeDelete
        :expenseTypeData="expenseTypeData"
        v-on:refresh="getAllExpensesTypes()"
      />
    </div>

    <ExpenseTypeFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import ExpensesTypesTable from "@/components/settings/settingsOther/expensesTypes/ExpensesTypesTable.vue";
import ExpenseTypeDelete from "@/components/settings/settingsOther/expensesTypes/ExpenseTypeDelete.vue";
import ExpenseTypeFloatBtns from "@/components/settings/settingsOther/expensesTypes/ExpenseTypeFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import ExpenseType from "@/models/settings/settingsOther/expensesTypes/ExpenseType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ExpensesTypes",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ExpensesTypesTable,
    ExpenseTypeDelete,
    ExpenseTypeFloatBtns,
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
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      expensesTypesData: null,
      expenseTypeData: new ExpenseType(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllExpensesTypes();
    },
    search(text) {
      this.textSearch = text;
      this.getAllExpensesTypes();
    },
    async getAllExpensesTypes() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/ExpensesTypes/GetAllExpensesTypes?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.expensesTypePagination.totalPages,
            totalItems: response.data.expensesTypePagination.totalItems,
            countItemsInPage:
              response.data.expensesTypePagination.countItemsInPage,
            selfPage: response.data.expensesTypePagination.selfPage,
          };
          this.expensesTypesData =
            response.data.expensesTypePagination.expensesTypeData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.expensesTypesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.expensesTypesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.expensesTypesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.expensesTypesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllExpensesTypes();
  },
};
</script>
