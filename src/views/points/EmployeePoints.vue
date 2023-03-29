<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeesSettlementMovementData">
      <EmployeesNameTable :employeeSettlementData="employeeSettlementData" />

      <EmployeesSettlementTable
        :employeesSettlementMovementData="employeesSettlementMovementData"
        :employeeSettlementData="employeeSettlementData"
        :noEmployeeData="true"
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
        v-on:refresh="getUserOrEmployeesSettlementMovement(1)"
      />
      <EmployeesSettlementDone
        :employeeSettlementData="employeeSettlementData"
        v-on:refresh="getUserOrEmployeesSettlementMovement(1)"
      />
    </div>

    <EmployeesSettlementFloatBtns
      :settlementYear="settlementYear"
      :noSettlementMonth="true"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import EmployeesNameTable from "@/components/points/EmployeesNameTable.vue";
import EmployeesSettlementTable from "@/components/points/EmployeesSettlementTable.vue";
import EmployeesSettlementInfo from "@/components/points/EmployeesSettlementInfo.vue";
import EmployeesSettlementCancel from "@/components/points/EmployeesSettlementCancel.vue";
import EmployeesSettlementDone from "@/components/points/EmployeesSettlementDone.vue";
import EmployeesSettlementFloatBtns from "@/components/points/EmployeesSettlementFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";

export default {
  name: "EmployeePoints",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeesNameTable,
    EmployeesSettlementTable,
    EmployeesSettlementInfo,
    EmployeesSettlementCancel,
    EmployeesSettlementDone,
    EmployeesSettlementFloatBtns,
    Pagination,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      employeeToken: this.$route.params.employeeToken,
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      settlementYear: new Date().getFullYear(),
      employeesSettlementMovementData: {},
      employeeSettlementData: {},
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getUserOrEmployeesSettlementMovement();
    },
    search(year) {
      this.settlementYear = year;
      this.getUserOrEmployeesSettlementMovement();
    },
    async getUserOrEmployeesSettlementMovement() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesSettlementMovement/GetUserOrEmployeesSettlementMovement?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&employeeToken=${this.employeeToken}&settlementYear=${this.settlementYear}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.employeeSettlementData =
            response.data.employeesSettlementMovementData[0];
          this.employeesSettlementMovementData =
            response.data.employeesSettlementMovementData;
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
  async created() {
    this.getUserOrEmployeesSettlementMovement();
  },
};
</script>

<style scoped lang="scss"></style>
