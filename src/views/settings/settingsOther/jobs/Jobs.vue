<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="jobsData">
      <JobsTable
        :jobsData="jobsData"
        :jobData="jobData"
        v-on:setJobData="jobData = $event"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <JobsDelete :jobData="jobData" v-on:refresh="getAllJobs()" />
    </div>

    <JobsFloatBtns
      :textSearch="textSearch"
      :sectorToken="sectorToken"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import JobsTable from "@/components/settings/settingsOther/jobs/JobsTable.vue";
import JobsDelete from "@/components/settings/settingsOther/jobs/JobsDelete.vue";
import JobsFloatBtns from "@/components/settings/settingsOther/jobs/JobsFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";

export default {
  name: "Jobs",
  components: {
    PreLoader,
    ExceptionWithImg,
    JobsTable,
    JobsDelete,
    JobsFloatBtns,
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
      sectorToken: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      jobsData: null,
      jobData: {},
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllJobs();
    },
    search(text, sectorToken) {
      this.textSearch = text;
      this.sectorToken = sectorToken;
      this.getAllJobs();
    },
    async getAllJobs() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Jobs/GetAllJobs?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&sectorToken=${this.sectorToken}&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.jobsPagination.totalPages,
            totalItems: response.data.jobsPagination.totalItems,
            countItemsInPage: response.data.jobsPagination.countItemsInPage,
            selfPage: response.data.jobsPagination.selfPage,
          };
          this.jobsData = response.data.jobsPagination.jobsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.jobsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.jobsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.jobsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.jobsData = null;
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
    this.getAllJobs();
  },
};
</script>

<style lang="scss"></style>
