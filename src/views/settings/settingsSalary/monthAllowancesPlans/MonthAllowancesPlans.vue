<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="monthAllowancesPlansData">
      <MonthAllowancesPlansTable
        :monthAllowancesPlansData="monthAllowancesPlansData"
        :monthAllowancesPlanData="monthAllowancesPlanData"
        v-on:setMonthAllowancesPlanData="
          monthAllowancesPlanData.fillData($event)
        "
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <MonthAllowancesPlanDelete
        :monthAllowancesPlanData="monthAllowancesPlanData"
        v-on:refresh="getMonthAllowancesPlans()"
      />
    </div>

    <MonthAllowancesPlanFloatBtns
      :textSearch="textSearch"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import MonthAllowancesPlansTable from "@/components/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlansTable.vue";
import MonthAllowancesPlanDelete from "@/components/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanDelete.vue";
import MonthAllowancesPlanFloatBtns from "@/components/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import MonthAllowancesPlan from "@/models/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MonthAllowancesPlans",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MonthAllowancesPlansTable,
    MonthAllowancesPlanDelete,
    MonthAllowancesPlanFloatBtns,
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
      monthAllowancesPlansData: null,
      monthAllowancesPlanData: new MonthAllowancesPlan(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getMonthAllowancesPlans();
    },
    search(text) {
      this.textSearch = text;
      this.getMonthAllowancesPlans();
    },
    async getMonthAllowancesPlans() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/MonthAllowancesPlans/GetMonthAllowancesPlans?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.monthAllowancesPlansPagination.totalPages,
            totalItems: response.data.monthAllowancesPlansPagination.totalItems,
            countItemsInPage:
              response.data.monthAllowancesPlansPagination.countItemsInPage,
            selfPage: response.data.monthAllowancesPlansPagination.selfPage,
          };
          this.monthAllowancesPlansData =
            response.data.monthAllowancesPlansPagination.monthAllowancesPlansData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.monthAllowancesPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.monthAllowancesPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.monthAllowancesPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.monthAllowancesPlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getMonthAllowancesPlans();
  },
};
</script>
