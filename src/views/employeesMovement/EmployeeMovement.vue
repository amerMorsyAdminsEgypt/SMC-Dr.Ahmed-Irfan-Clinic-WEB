<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeesMovementData">
      <EmployeeMovementTable
        :employeesMovementData="employeesMovementData"
        :employeeData="employeeData"
        v-on:setMovementData="movementData = $event"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <EmployeeMovementDelete
        :movementData="movementData"
        v-on:refresh="getUserMovement(1)"
      />
    </div>

    <EmployeeMovementFloatBtns :attendanceToken="attendanceToken" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import EmployeeMovementTable from "@/components/employeesMovement/EmployeeMovementTable.vue";
import EmployeeMovementFloatBtns from "@/components/employeesMovement/EmployeeMovementFloatBtns.vue";
import EmployeeMovementDelete from "@/components/employeesMovement/EmployeeMovementDelete.vue";
import Pagination from "@/components/general/Pagination.vue";

export default {
  name: "EmployeeMovement",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeMovementTable,
    EmployeeMovementFloatBtns,
    EmployeeMovementDelete,
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
      attendanceToken: this.$route.params.attendanceToken,
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      employeesMovementData: {},
      employeeData: {},
      movementData: {},
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getUserMovement();
    },
    search() {
      this.getUserMovement();
    },
    async getUserMovement() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesMovement/GetUserMovement?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&attendanceToken=${this.attendanceToken}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.employeesMovementDataHistory
                .employeesMovementPagination.totalPages,
            totalItems:
              response.data.employeesMovementDataHistory
                .employeesMovementPagination.totalItems,
            countItemsInPage:
              response.data.employeesMovementDataHistory
                .employeesMovementPagination.countItemsInPage,
            selfPage:
              response.data.employeesMovementDataHistory
                .employeesMovementPagination.selfPage,
          };
          this.employeeData = {
            employeeCode:
              response.data.employeesMovementDataHistory.employeeCode,
            employeeName:
              this.language == "ar"
                ? response.data.employeesMovementDataHistory.employeeNameAr
                : response.data.employeesMovementDataHistory.employeeNameEn,
          };
          this.employeesMovementData =
            response.data.employeesMovementDataHistory.employeesMovementPagination.employeesMovementData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesMovementData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesMovementData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeesMovementData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesMovementData = null;
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
    this.getUserMovement();
  },
};
</script>

<style scoped lang="scss"></style>
