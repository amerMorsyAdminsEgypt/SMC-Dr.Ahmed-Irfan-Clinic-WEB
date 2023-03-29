<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeeWorkSchedulesData">
      <EmployeeWorkSchedulesTable
        :employeeWorkSchedulesData="employeeWorkSchedulesData"
        :employeeWorkScheduleData="employeeWorkScheduleData"
        v-on:setEmployeeWorkScheduleData="
          employeeWorkScheduleData.fillData($event)
        "
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <EmployeeWorkScheduleDelete
        :employeeWorkScheduleData="employeeWorkScheduleData"
        v-on:refresh="getAllEmployeeWorkSchedules()"
      />
    </div>

    <!-- <EmployeeWorkScheduleFloatBtns
      :textSearch="textSearch"
      v-on:search="search"
    /> -->
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import EmployeeWorkSchedulesTable from "@/components/employees/employeeWorkSchedules/EmployeeWorkSchedulesTable.vue";
import EmployeeWorkScheduleDelete from "@/components/employees/employeeWorkSchedules/EmployeeWorkScheduleDelete.vue";
// import EmployeeWorkScheduleFloatBtns from "@/components/employees/employeeWorkSchedules/EmployeeWorkScheduleFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import EmployeeWorkSchedule from "@/models/employees/employeeWorkSchedules/EmployeeWorkSchedule";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeeWorkSchedules",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeWorkSchedulesTable,
    EmployeeWorkScheduleDelete,
    // EmployeeWorkScheduleFloatBtns,
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
      employeeToken: this.$route.params.employeeToken,
      employeeWorkSchedulesData: null,
      employeeWorkScheduleData: new EmployeeWorkSchedule(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllEmployeeWorkSchedules();
    },
    search(text) {
      this.textSearch = text;
      this.getAllEmployeeWorkSchedules();
    },
    async getAllEmployeeWorkSchedules() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeeWorkSchedule/GetAllEmployeeWorkSchedule?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&employeeToken=${this.employeeToken}&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.employeeWorkSchedulePagination.totalPages,
            totalItems: response.data.employeeWorkSchedulePagination.totalItems,
            countItemsInPage:
              response.data.employeeWorkSchedulePagination.countItemsInPage,
            selfPage: response.data.employeeWorkSchedulePagination.selfPage,
          };
          this.employeeWorkSchedulesData =
            response.data.employeeWorkSchedulePagination.employeeWorkScheduleData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeeWorkSchedulesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeeWorkSchedulesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeeWorkSchedulesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeeWorkSchedulesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllEmployeeWorkSchedules();
  },
};
</script>
