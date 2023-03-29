<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeesInputSheetAttendanceMergesData">
      <EmployeesInputSheetAttendanceMergesTable
        :employeesInputSheetAttendanceMergesData="
          employeesInputSheetAttendanceMergesData
        "
        :employeesInputSheetAttendanceMergeData="
          employeesInputSheetAttendanceMergeData
        "
        v-on:setEmployeesInputSheetAttendanceMergeData="
          employeesInputSheetAttendanceMergeData.fillData($event)
        "
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <EmployeesInputSheetAttendanceMergeDelete
        :employeesInputSheetAttendanceMergeData="
          employeesInputSheetAttendanceMergeData
        "
        v-on:refresh="getAllEmployeesInputSheetAttendanceMerges()"
      />
    </div>

    <EmployeesInputSheetAttendanceMergeFloatBtns
      :textSearch="textSearch"
      :mergeMonth="mergeMonth"
      :mergeYear="mergeYear"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import EmployeesInputSheetAttendanceMergesTable from "@/components/employees/employeesInputSheetAttendanceMerges/EmployeesInputSheetAttendanceMergesTable.vue";
import EmployeesInputSheetAttendanceMergeDelete from "@/components/employees/employeesInputSheetAttendanceMerges/EmployeesInputSheetAttendanceMergeDelete.vue";
import EmployeesInputSheetAttendanceMergeFloatBtns from "@/components/employees/employeesInputSheetAttendanceMerges/EmployeesInputSheetAttendanceMergeFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import EmployeesInputSheetAttendanceMerge from "@/models/employees/employeesInputSheetAttendanceMerges/EmployeesInputSheetAttendanceMerge";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeesInputSheetAttendanceMerges",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeesInputSheetAttendanceMergesTable,
    EmployeesInputSheetAttendanceMergeDelete,
    EmployeesInputSheetAttendanceMergeFloatBtns,
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
      mergeMonth: "",
      mergeYear: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      employeesInputSheetAttendanceMergesData: null,
      employeesInputSheetAttendanceMergeData:
        new EmployeesInputSheetAttendanceMerge(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllEmployeesInputSheetAttendanceMerges();
    },
    search(text, mergeMonth, mergeYear) {
      this.textSearch = text;
      this.mergeMonth = mergeMonth;
      this.mergeYear = mergeYear;
      this.getAllEmployeesInputSheetAttendanceMerges();
    },
    async getAllEmployeesInputSheetAttendanceMerges() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesInputSheetAttendanceMerge/GetAllEmployeesInputSheetAttendanceMerge?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&mergeMonth=${this.mergeMonth}&mergeYear=${this.mergeYear}&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.employeesInputSheetAttendanceMergePagination
                .totalPages,
            totalItems:
              response.data.employeesInputSheetAttendanceMergePagination
                .totalItems,
            countItemsInPage:
              response.data.employeesInputSheetAttendanceMergePagination
                .countItemsInPage,
            selfPage:
              response.data.employeesInputSheetAttendanceMergePagination
                .selfPage,
          };
          this.employeesInputSheetAttendanceMergesData =
            response.data.employeesInputSheetAttendanceMergePagination.employeesInputSheetAttendanceMergeData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesInputSheetAttendanceMergesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesInputSheetAttendanceMergesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeesInputSheetAttendanceMergesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesInputSheetAttendanceMergesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllEmployeesInputSheetAttendanceMerges();
  },
};
</script>
