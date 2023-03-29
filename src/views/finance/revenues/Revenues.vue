<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="revenuesData">
      <RevenuesTable
        :revenuesData="revenuesData"
        :revenueData="revenueData"
        v-on:setRevenueData="revenueData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <RevenueInfo :revenueData="revenueData" />
      <RevenueRefund
        :revenueData="revenueData"
        v-on:refresh="getAllRevenues()"
      />
    </div>

    <RevenueFloatBtns
      :textSearch="textSearch"
      :branchToken="branchToken"
      :treasuryToken="treasuryToken"
      :revenuesTypeToken="revenuesTypeToken"
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
import RevenuesTable from "@/components/finance/revenues/RevenuesTable.vue";
import RevenueInfo from "@/components/finance/revenues/RevenueInfo.vue";
import RevenueRefund from "@/components/finance/revenues/RevenueRefund.vue";
import RevenueFloatBtns from "@/components/finance/revenues/RevenueFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Revenue from "@/models/finance/revenues/Revenue";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Revenues",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    RevenuesTable,
    RevenueInfo,
    RevenueRefund,
    RevenueFloatBtns,
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
      revenuesTypeToken: "",
      dateFrom: "",
      dateTo: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      revenuesData: null,
      revenueData: new Revenue(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllRevenues();
    },
    search(
      text,
      branchToken,
      treasuryToken,
      revenuesTypeToken,
      dateFrom,
      dateTo
    ) {
      this.textSearch = text;
      this.branchToken = branchToken;
      this.treasuryToken = treasuryToken;
      this.revenuesTypeToken = revenuesTypeToken;
      this.dateFrom = dateFrom;
      this.dateTo = dateTo;
      this.getAllRevenues();
    },
    async getAllRevenues() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Revenues/GetAllRevenuesData?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&branchToken=${this.branchToken}&treasuryToken=${this.treasuryToken}&revenuesTypeToken=${this.revenuesTypeToken}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.revenuesPagination.totalPages,
            totalItems: response.data.revenuesPagination.totalItems,
            countItemsInPage: response.data.revenuesPagination.countItemsInPage,
            selfPage: response.data.revenuesPagination.selfPage,
          };
          this.revenuesData = response.data.revenuesPagination.revenuesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.revenuesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.revenuesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.revenuesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.revenuesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllRevenues();
  },
};
</script>
