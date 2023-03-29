<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeeSalarySettingsData">
      <EmployeeSalarySettingsTable
        :employeeSalarySettingsData="employeeSalarySettingsData"
        :employeeSalarySettingData="employeeSalarySettingData"
        v-on:setEmployeeSalarySettingData="
          employeeSalarySettingData.fillData($event)
        "
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <EmployeeSalarySettingInfo
        :employeeSalarySettingData="employeeSalarySettingData"
      />
      <EmployeeSalarySettingDelete
        :employeeSalarySettingData="employeeSalarySettingData"
        v-on:refresh="getAllEmployeeSalarySettings()"
      />
    </div>

    <!-- <EmployeeSalarySettingFloatBtns
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
import EmployeeSalarySettingsTable from "@/components/employees/employeeSalarySettings/EmployeeSalarySettingsTable.vue";
import EmployeeSalarySettingInfo from "@/components/employees/employeeSalarySettings/EmployeeSalarySettingInfo.vue";
import EmployeeSalarySettingDelete from "@/components/employees/employeeSalarySettings/EmployeeSalarySettingDelete.vue";
// import EmployeeSalarySettingFloatBtns from "@/components/employees/employeeSalarySettings/EmployeeSalarySettingFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import EmployeeSalarySetting from "@/models/employees/employeeSalarySettings/EmployeeSalarySetting";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeeSalarySettings",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeSalarySettingsTable,
    EmployeeSalarySettingInfo,
    EmployeeSalarySettingDelete,
    // EmployeeSalarySettingFloatBtns,
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
      employeeSalarySettingData: new EmployeeSalarySetting(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllEmployeeSalarySettings();
    },
    search(text) {
      this.textSearch = text;
      this.getAllEmployeeSalarySettings();
    },
    async getAllEmployeeSalarySettings() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeeSalarySetting/GetAllEmployeeSalarySetting?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&employeeToken=${this.employeeToken}&textSearch=${this.textSearch}`
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
  },
  computed: {},
  async created() {
    this.getAllEmployeeSalarySettings();
  },
};
</script>
