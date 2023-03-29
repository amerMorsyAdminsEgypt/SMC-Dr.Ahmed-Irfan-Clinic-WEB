<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="qualificationsData">
      <QualificationsTable
        :qualificationsData="qualificationsData"
        :qualificationData="qualificationData"
        v-on:setQualificationData="qualificationData = $event"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <QualificationsDelete
        :qualificationData="qualificationData"
        v-on:refresh="getAllQualifications(1)"
      />
    </div>

    <QualificationsFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import QualificationsTable from "@/components/settings/settingsOther/qualifications/QualificationsTable.vue";
import QualificationsDelete from "@/components/settings/settingsOther/qualifications/QualificationsDelete.vue";
import QualificationsFloatBtns from "@/components/settings/settingsOther/qualifications/QualificationsFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";

export default {
  name: "Qualifications",
  components: {
    PreLoader,
    ExceptionWithImg,
    QualificationsTable,
    QualificationsDelete,
    QualificationsFloatBtns,
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
      settlementYear: new Date().getFullYear(),
      settlementMonth: new Date().getMonth() + 1,
      qualificationsData: null,
      qualificationData: {},
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllQualifications();
    },
    search(text) {
      this.textSearch = text;
      this.getAllQualifications();
    },
    async getAllQualifications() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Qualifications/GetAllQualifications?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.qualificationsPagination.totalPages,
            totalItems: response.data.qualificationsPagination.totalItems,
            countItemsInPage:
              response.data.qualificationsPagination.countItemsInPage,
            selfPage: response.data.qualificationsPagination.selfPage,
          };
          this.qualificationsData =
            response.data.qualificationsPagination.qualificationsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.qualificationsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.qualificationsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.qualificationsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.qualificationsData = null;
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
    this.getAllQualifications();
  },
};
</script>

<style lang="scss"></style>
