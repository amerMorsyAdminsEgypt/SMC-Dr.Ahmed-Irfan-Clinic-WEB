<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="balancesPlansData">
      <BalancesPlansTable
        :balancesPlansData="balancesPlansData"
        :balancesPlanData="balancesPlanData"
        v-on:setBalancesPlanData="balancesPlanData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <BalancesPlanDelete
        :balancesPlanData="balancesPlanData"
        v-on:refresh="getAllBalancesPlans()"
      />
    </div>

    <BalancesPlanFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import BalancesPlansTable from "@/components/settings/settingsSalary/balancesPlans/BalancesPlansTable.vue";
import BalancesPlanDelete from "@/components/settings/settingsSalary/balancesPlans/BalancesPlanDelete.vue";
import BalancesPlanFloatBtns from "@/components/settings/settingsSalary/balancesPlans/BalancesPlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import BalancesPlan from "@/models/settings/settingsSalary/balancesPlans/BalancesPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BalancesPlans",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BalancesPlansTable,
    BalancesPlanDelete,
    BalancesPlanFloatBtns,
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
      balancesPlansData: null,
      balancesPlanData: new BalancesPlan(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllBalancesPlans();
    },
    search(text) {
      this.textSearch = text;
      this.getAllBalancesPlans();
    },
    async getAllBalancesPlans() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/BalancesPlans/GetBalancesPlanses?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.balancesPlansPagination.totalPages,
            totalItems: response.data.balancesPlansPagination.totalItems,
            countItemsInPage:
              response.data.balancesPlansPagination.countItemsInPage,
            selfPage: response.data.balancesPlansPagination.selfPage,
          };
          this.balancesPlansData =
            response.data.balancesPlansPagination.balancesPlansData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.balancesPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.balancesPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.balancesPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.balancesPlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllBalancesPlans();
  },
};
</script>
