<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="treasuriesTransactionsData">
      <TreasuriesTransactionsTable
        :treasuriesTransactionsData="treasuriesTransactionsData"
        v-on:setTransactionData="treasuriesTransactionData.fillData($event)"
      />

      <TreasuryTransactionReceipt
        :treasuriesTransactionData="treasuriesTransactionData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
    </div>

    <TreasuryTransactionFloatBtns
      :textSearch="textSearch"
      :treasuryToken="treasuryToken"
      :transactionTypeToken="transactionTypeToken"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import TreasuriesTransactionsTable from "@/components/finance/treasuriesTransactions/TreasuriesTransactionsTable.vue";
import TreasuryTransactionReceipt from "@/components/finance/treasuriesTransactions/TreasuryTransactionReceipt.vue";
import TreasuryTransactionFloatBtns from "@/components/finance/treasuriesTransactions/TreasuryTransactionFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import TreasuryTransaction from "@/models/finance/treasuriesTransactions/TreasuryTransaction";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Treasuries",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    TreasuriesTransactionsTable,
    TreasuryTransactionReceipt,
    TreasuryTransactionFloatBtns,
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
      treasuryToken: "",
      transactionTypeToken: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      treasuriesTransactionsData: null,
      treasuriesTransactionData: new TreasuryTransaction(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getTreasuriesTransactions();
    },
    search(text, treasuryToken, transactionTypeToken) {
      this.textSearch = text;
      this.treasuryToken = treasuryToken;
      this.transactionTypeToken = transactionTypeToken;
      this.getTreasuriesTransactions();
    },
    async getTreasuriesTransactions() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/TreasuriesTransactions/GetTreasuriesTransactions?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&treasuryToken=${this.treasuryToken}&transactionTypeToken=${this.transactionTypeToken}&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.treasuriesTransactionPagination.totalPages,
            totalItems:
              response.data.treasuriesTransactionPagination.totalItems,
            countItemsInPage:
              response.data.treasuriesTransactionPagination.countItemsInPage,
            selfPage: response.data.treasuriesTransactionPagination.selfPage,
          };
          this.treasuriesTransactionsData =
            response.data.treasuriesTransactionPagination.treasuriesTransactionData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.treasuriesTransactionsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.treasuriesTransactionsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.treasuriesTransactionsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.treasuriesTransactionsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getTreasuriesTransactions();
  },
};
</script>
