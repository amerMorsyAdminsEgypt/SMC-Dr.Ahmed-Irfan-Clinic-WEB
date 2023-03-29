<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeesInputSheetsAttendanceData">
      <EmployeesInputSheetsAttendanceTable
        :employeesInputSheetsAttendanceData="employeesInputSheetsAttendanceData"
        :employeesInputSheetAttendanceData="employeesInputSheetAttendanceData"
        v-on:setEmployeesInputSheetAttendanceData="
          employeesInputSheetAttendanceData.fillData($event)
        "
      />

      <!-- <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      /> -->
      <!-- <EmployeesInputSheetAttendanceInfo :employeesInputSheetAttendanceData="employeesInputSheetAttendanceData" /> -->
      <EmployeesInputSheetAttendanceDelete
        :employeesInputSheetAttendanceData="employeesInputSheetAttendanceData"
        v-on:refresh="getAllEmployeesInputSheetAttendances()"
      />
    </div>

    <EmployeesInputSheetAttendanceFloatBtns
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
import EmployeesInputSheetsAttendanceTable from "@/components/employees/employeesInputSheetsAttendance/EmployeesInputSheetsAttendanceTable.vue";
// import EmployeesInputSheetAttendanceInfo from "@/components/employees/employeesInputSheetsAttendance/EmployeesInputSheetAttendanceInfo.vue";
import EmployeesInputSheetAttendanceDelete from "@/components/employees/employeesInputSheetsAttendance/EmployeesInputSheetAttendanceDelete.vue";
import EmployeesInputSheetAttendanceFloatBtns from "@/components/employees/employeesInputSheetsAttendance/EmployeesInputSheetAttendanceFloatBtns.vue";
// import Pagination from "@/components/general/Pagination.vue";
import EmployeesInputSheetAttendance from "@/models/employees/employeesInputSheetsAttendance/EmployeesInputSheetAttendance";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeesInputSheetsAttendance",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeesInputSheetsAttendanceTable,
    // EmployeesInputSheetAttendanceInfo,
    EmployeesInputSheetAttendanceDelete,
    EmployeesInputSheetAttendanceFloatBtns,
    // Pagination,
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
      employeesInputSheetsAttendanceData: null,
      employeesInputSheetAttendanceData: new EmployeesInputSheetAttendance(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllEmployeesInputSheetAttendances();
    },
    search(text) {
      this.textSearch = text;
      this.getAllEmployeesInputSheetAttendances();
    },
    async getAllEmployeesInputSheetAttendances() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesInputSheetAttendance/GetAllEmployeesInputSheetAttendance?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.employeesInputSheetAttendancePagination.totalPages,
            totalItems:
              response.data.employeesInputSheetAttendancePagination.totalItems,
            countItemsInPage:
              response.data.employeesInputSheetAttendancePagination
                .countItemsInPage,
            selfPage:
              response.data.employeesInputSheetAttendancePagination.selfPage,
          };
          this.employeesInputSheetsAttendanceData =
            response.data.employeesInputSheetAttendancePagination.employeesInputSheetAttendanceData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesInputSheetsAttendanceData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesInputSheetsAttendanceData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeesInputSheetsAttendanceData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesInputSheetsAttendanceData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllEmployeesInputSheetAttendances();
  },
};
</script>
