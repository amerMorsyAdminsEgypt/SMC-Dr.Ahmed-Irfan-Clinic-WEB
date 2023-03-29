<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeesData">
      <div class="row">
        <EmployeeCard
          v-for="employee in employeesData"
          :key="employee.employeeToken"
          :employeeData="employee"
          v-on:setEmployeeData="employeeData = $event"
        />
      </div>
      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <EmployeeInfo :employeeData="employeeData" />
      <EmployeeDelete
        :employeeData="employeeData"
        v-on:refresh="getEmployees(1)"
      />
    </div>

    <EmployeeFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import { mapGetters } from "vuex";
import EmployeeCard from "@/components/employees/employees/EmployeeCard.vue";
import EmployeeInfo from "@/components/employees/employees/EmployeeInfo.vue";
import EmployeeDelete from "@/components/employees/employees/EmployeeDelete.vue";
import EmployeeFloatBtns from "@/components/employees/employees/EmployeeFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";

export default {
  name: "Employees",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeCard,
    EmployeeInfo,
    EmployeeDelete,
    EmployeeFloatBtns,
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
      typeToken: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      employeesData: null,
      employeeData: {},
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getEmployees();
    },
    search(text, employeeTypeToken) {
      this.textSearch = text;
      this.typeToken = employeeTypeToken;
      this.getEmployees();
    },
    async getEmployees() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Employees/GetAllEmployees?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&employeeTypeToken=${this.typeToken}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.employeesPagination.totalPages,
            totalItems: response.data.employeesPagination.totalItems,
            countItemsInPage:
              response.data.employeesPagination.countItemsInPage,
            selfPage: response.data.employeesPagination.selfPage,
          };
          this.employeesData = response.data.employeesPagination.employeesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesData = null;
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
        // noAutoHide: true,
      });
    },
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  async created() {
    this.getEmployees();
  },
};
</script>
