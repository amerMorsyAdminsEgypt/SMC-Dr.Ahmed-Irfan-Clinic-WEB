<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeesAttendanceData">
      <EmployeeAttendanceTable
        :employeesAttendanceData="employeesAttendanceData"
        :employeeData="employeeData"
        v-on:setAttendanceData="attendanceData = $event"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <EmployeeAttendanceDelete
        :attendanceData="attendanceData"
        v-on:refresh="getUserAttendance(1)"
      />
    </div>

    <EmployeeAttendanceFloatBtns
      :employeeToken="employeeToken"
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
import EmployeeAttendanceTable from "@/components/employeesAttendance/EmployeeAttendanceTable.vue";
import EmployeeAttendanceFloatBtns from "@/components/employeesAttendance/EmployeeAttendanceFloatBtns.vue";
import EmployeeAttendanceDelete from "@/components/employeesAttendance/EmployeeAttendanceDelete.vue";
import Pagination from "@/components/general/Pagination.vue";

export default {
  name: "EmployeeAttendance",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeAttendanceTable,
    EmployeeAttendanceFloatBtns,
    EmployeeAttendanceDelete,
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
      dateFrom: this.getNow(1),
      dateTo: this.getNow(),
      employeesAttendanceData: {},
      employeeData: {},
      attendanceData: {},
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getUserAttendance();
    },
    search(theDateFrom, theDateTo) {
      this.dateFrom = theDateFrom;
      this.dateTo = theDateTo;
      this.getUserAttendance();
    },
    async getUserAttendance() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesAttendance/GetUserAttendance?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&employeeToken=${this.employeeToken}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.employeeAttendanceDataHistory
                .employeesAttendancePagination.totalPages,
            totalItems:
              response.data.employeeAttendanceDataHistory
                .employeesAttendancePagination.totalItems,
            countItemsInPage:
              response.data.employeeAttendanceDataHistory
                .employeesAttendancePagination.countItemsInPage,
            selfPage:
              response.data.employeeAttendanceDataHistory
                .employeesAttendancePagination.selfPage,
          };
          this.employeeData = {
            employeeCode:
              response.data.employeeAttendanceDataHistory.employeeCode,
            employeeName:
              this.language == "ar"
                ? response.data.employeeAttendanceDataHistory.employeeNameAr
                : response.data.employeeAttendanceDataHistory.employeeNameEn,
          };
          this.employeesAttendanceData =
            response.data.employeeAttendanceDataHistory.employeesAttendancePagination.employeesAttendanceData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesAttendanceData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesAttendanceData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeesAttendanceData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesAttendanceData = null;
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
    this.getUserAttendance();
  },
};
</script>

<style scoped lang="scss"></style>
