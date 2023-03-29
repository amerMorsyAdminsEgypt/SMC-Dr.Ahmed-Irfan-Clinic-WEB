<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeesMoveSlidesData">
      <EmployeesNameTable :employeeSlideData="employeeSlideData" />

      <EmployeesSliceTable
        :employeesMoveSlidesData="employeesMoveSlidesData"
        :employeeSlideData="employeeSlideData"
        v-on:setMoveSlidesData="employeeSlideData = $event"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />

      <EmployeesSliceDelete
        :employeeSlideData="employeeSlideData"
        v-on:refresh="getUserOrEmployeeMoveSlideses()"
      />
      <EmployeesSliceActivate
        :employeeSlideData="employeeSlideData"
        v-on:refresh="getUserOrEmployeeMoveSlideses()"
      />
    </div>

    <EmployeesSliceFloatBtns :employeeToken="employeeToken" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import EmployeesNameTable from "@/components/slices/EmployeesNameTable.vue";
import EmployeesSliceTable from "@/components/slices/EmployeesSliceTable.vue";
import EmployeesSliceDelete from "@/components/slices/EmployeesSliceDelete.vue";
import EmployeesSliceActivate from "@/components/slices/EmployeesSliceActivate.vue";
import EmployeesSliceFloatBtns from "@/components/slices/EmployeesSliceFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";

export default {
  name: "EmployeeSlices",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeesNameTable,
    EmployeesSliceTable,
    EmployeesSliceDelete,
    EmployeesSliceActivate,
    EmployeesSliceFloatBtns,
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
      employeesMoveSlidesData: {},
      employeeSlideData: {},
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getUserOrEmployeeMoveSlideses();
    },
    async getUserOrEmployeeMoveSlideses() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesMoveSlides/GetUserOrEmployeeMoveSlideses?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&employeeToken=${this.employeeToken}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.employeesMoveSlidesPagination.totalPages,
            totalItems: response.data.employeesMoveSlidesPagination.totalItems,
            countItemsInPage:
              response.data.employeesMoveSlidesPagination.countItemsInPage,
            selfPage: response.data.employeesMoveSlidesPagination.selfPage,
          };
          this.employeeSlideData =
            response.data.employeesMoveSlidesPagination.employeesMoveSlidesData[0];
          this.employeesMoveSlidesData =
            response.data.employeesMoveSlidesPagination.employeesMoveSlidesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesMoveSlidesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesMoveSlidesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeesMoveSlidesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesMoveSlidesData = null;
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
    this.getUserOrEmployeeMoveSlideses();
  },
};
</script>

<style scoped lang="scss"></style>
