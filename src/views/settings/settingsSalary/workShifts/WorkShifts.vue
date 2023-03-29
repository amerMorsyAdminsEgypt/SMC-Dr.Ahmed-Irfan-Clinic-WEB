<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="workShiftsData">
      <WorkShiftsTable
        :workShiftsData="workShiftsData"
        :workShiftData="workShiftData"
        v-on:setWorkShiftData="workShiftData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <WorkShiftInfo :workShiftData="workShiftData" />
      <WorkShiftDelete
        :workShiftData="workShiftData"
        v-on:refresh="getAllWorkShifts()"
      />
    </div>

    <WorkShiftFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import WorkShiftsTable from "@/components/settings/settingsSalary/workShifts/WorkShiftsTable.vue";
import WorkShiftInfo from "@/components/settings/settingsSalary/workShifts/WorkShiftInfo.vue";
import WorkShiftDelete from "@/components/settings/settingsSalary/workShifts/WorkShiftDelete.vue";
import WorkShiftFloatBtns from "@/components/settings/settingsSalary/workShifts/WorkShiftFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import WorkShift from "@/models/settings/settingsSalary/workShifts/WorkShift";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "WorkShifts",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    WorkShiftsTable,
    WorkShiftInfo,
    WorkShiftDelete,
    WorkShiftFloatBtns,
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
      workShiftsData: null,
      workShiftData: new WorkShift(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllWorkShifts();
    },
    search(text) {
      this.textSearch = text;
      this.getAllWorkShifts();
    },
    async getAllWorkShifts() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/WorkShifts/GetAllWorkShifts?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.workShiftsPagination.totalPages,
            totalItems: response.data.workShiftsPagination.totalItems,
            countItemsInPage:
              response.data.workShiftsPagination.countItemsInPage,
            selfPage: response.data.workShiftsPagination.selfPage,
          };
          this.workShiftsData =
            response.data.workShiftsPagination.workShiftsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.workShiftsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.workShiftsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.workShiftsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.workShiftsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllWorkShifts();
  },
};
</script>
