<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeeSalarySettingsData">
      <EmployeeSalarySettingsTable
        :employeeSalarySettingsData="employeeSalarySettingsData"
        :salarySettingData="salarySettingData"
        v-on:setsalarySettingData="salarySettingData = $event"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <EmployeeSalarySettingsDelete
        :salarySettingData="salarySettingData"
        v-on:refresh="getAllEmployeeSalarySetting()"
      />
    </div>

    <EmployeeSalarySettingsFloatBtns
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
import EmployeeSalarySettingsTable from "@/components/employeeSalarySettings/EmployeeSalarySettingsTable.vue";
import EmployeeSalarySettingsDelete from "@/components/employeeSalarySettings/EmployeeSalarySettingsDelete.vue";
import EmployeeSalarySettingsFloatBtns from "@/components/employeeSalarySettings/EmployeeSalarySettingsFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";

export default {
  name: "EmployeeSalarySettings",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeSalarySettingsTable,
    EmployeeSalarySettingsDelete,
    EmployeeSalarySettingsFloatBtns,
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
      employeeSalarySettingsData: null,
      salarySettingData: {},
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllEmployeeSalarySetting();
    },
    search(text) {
      this.textSearch = text;
      this.getAllEmployeeSalarySetting();
    },
    async getAllEmployeeSalarySetting() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeeSalarySetting/GetAllEmployeeSalarySetting/?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}&employeeToken=${this.employeeToken}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.employeeSalarySettingPagination.totalPages,
            totalItems:
              response.data.employeeSalarySettingPagination.totalItems,
            countItemsInPage:
              response.data.employeeSalarySettingPagination.countItemsInPage,
            selfPage: response.data.employeeSalarySettingPagination.selfPage,
          };
          this.employeeSalarySettingsData =
            response.data.employeeSalarySettingPagination.employeeSalarySettingData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeeSalarySettingsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeeSalarySettingsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeeSalarySettingsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeeSalarySettingsData = null;
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
  },
  async created() {
    this.getAllEmployeeSalarySetting();
  },
};
</script>

<style lang="scss"></style>
