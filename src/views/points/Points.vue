<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeesSettlementMovementData">
      <EmployeesSettlementTable
        :employeesSettlementMovementData="employeesSettlementMovementData"
        :employeeSettlementData="employeeSettlementData"
        v-on:setSettlementData="employeeSettlementData = $event"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <EmployeesSettlementInfo
        :employeeSettlementData="employeeSettlementData"
      />
      <EmployeesSettlementCancel
        :employeeSettlementData="employeeSettlementData"
        v-on:refresh="getEmployeesSettlementMovementDate(1)"
      />
    </div>

    <EmployeesSettlementFloatBtns
      :settlementYear="settlementYear"
      :settlementMonth="settlementMonth"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import { mapGetters } from "vuex";
import EmployeesSettlementTable from "@/components/points/EmployeesSettlementTable.vue";
import EmployeesSettlementInfo from "@/components/points/EmployeesSettlementInfo.vue";
import EmployeesSettlementCancel from "@/components/points/EmployeesSettlementCancel.vue";
import EmployeesSettlementFloatBtns from "@/components/points/EmployeesSettlementFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";

export default {
  name: "Points",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeesSettlementTable,
    EmployeesSettlementInfo,
    EmployeesSettlementCancel,
    EmployeesSettlementFloatBtns,
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
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      settlementYear: new Date().getFullYear(),
      settlementMonth: new Date().getMonth() + 1,
      employeesSettlementMovementData: null,
      employeeSettlementData: {},
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getEmployeesSettlementMovementDate();
    },
    search(year, month) {
      this.settlementYear = year;
      this.settlementMonth = month;
      this.getEmployeesSettlementMovementDate();
    },
    async getEmployeesSettlementMovementDate() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesSettlementMovement/GetEmployeesSettlementMovementDate?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&settlementYear=${this.settlementYear}&settlementMonth=${this.settlementMonth}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.employeesSettlementMovementPagination.totalPages,
            totalItems:
              response.data.employeesSettlementMovementPagination.totalItems,
            countItemsInPage:
              response.data.employeesSettlementMovementPagination
                .countItemsInPage,
            selfPage:
              response.data.employeesSettlementMovementPagination.selfPage,
          };
          this.employeesSettlementMovementData =
            response.data.employeesSettlementMovementPagination.employeesSettlementMovementData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesSettlementMovementData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesSettlementMovementData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeesSettlementMovementData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesSettlementMovementData = null;
      }
      this.isLoading = false;
    },
    showMsg(msg = "", isSuccess = false) {
      let variant = isSuccess ? "success" : "danger";
      this.$bvToast.toast(`${msg}`, {
        title: this.$t("alert"),
        variant: variant,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 5000,
      });
    },
    getNow: function (monthAgo = 0) {
      if (monthAgo < 0) monthAgo = 0;
      var d = new Date();
      d.toLocaleDateString();
      d.setMonth(d.getMonth() - monthAgo);
      d.toLocaleDateString();
      var month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("/");
    },
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  async created() {
    this.getEmployeesSettlementMovementDate();
  },
};
</script>

<style lang="scss"></style>
