<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="allowancesData">
      <AllowancesTable
        :allowancesData="allowancesData"
        :allowanceData="allowanceData"
        v-on:setAllowanceData="allowanceData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <AllowanceInfo :allowanceData="allowanceData" />
      <AllowanceDelete
        :allowanceData="allowanceData"
        v-on:refresh="getAllAllowances()"
      />
    </div>

    <AllowanceFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import AllowancesTable from "@/components/settings/settingsSalary/allowances/AllowancesTable.vue";
import AllowanceInfo from "@/components/settings/settingsSalary/allowances/AllowanceInfo.vue";
import AllowanceDelete from "@/components/settings/settingsSalary/allowances/AllowanceDelete.vue";
import AllowanceFloatBtns from "@/components/settings/settingsSalary/allowances/AllowanceFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Allowance from "@/models/settings/settingsSalary/allowances/Allowance";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Allowances",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AllowancesTable,
    AllowanceInfo,
    AllowanceDelete,
    AllowanceFloatBtns,
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
      allowancesData: null,
      allowanceData: new Allowance(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllAllowances();
    },
    search(text) {
      this.textSearch = text;
      this.getAllAllowances();
    },
    async getAllAllowances() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Allowances/GetAllAllowances?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.allowancesPagination.totalPages,
            totalItems: response.data.allowancesPagination.totalItems,
            countItemsInPage:
              response.data.allowancesPagination.countItemsInPage,
            selfPage: response.data.allowancesPagination.selfPage,
          };
          this.allowancesData =
            response.data.allowancesPagination.allowancesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.allowancesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.allowancesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.allowancesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.allowancesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllAllowances();
  },
};
</script>
