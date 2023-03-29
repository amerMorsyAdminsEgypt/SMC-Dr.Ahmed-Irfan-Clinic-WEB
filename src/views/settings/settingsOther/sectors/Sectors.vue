<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="sectorsData">
      <SectorsTable
        :sectorsData="sectorsData"
        :sectorData="sectorData"
        v-on:setSectorData="sectorData = $event"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <SectorsDelete :sectorData="sectorData" v-on:refresh="getAllSectors(1)" />
    </div>

    <SectorsFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import SectorsTable from "@/components/settings/settingsOther/sectors/SectorsTable.vue";
import SectorsDelete from "@/components/settings/settingsOther/sectors/SectorsDelete.vue";
import SectorsFloatBtns from "@/components/settings/settingsOther/sectors/SectorsFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";

export default {
  name: "Sectors",
  components: {
    PreLoader,
    ExceptionWithImg,
    SectorsTable,
    SectorsDelete,
    SectorsFloatBtns,
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
      sectorsData: null,
      sectorData: {},
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllSectors();
    },
    search(text) {
      this.textSearch = text;
      this.getAllSectors();
    },
    async getAllSectors() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Sectors/GetAllSectors?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.sectorsPagination.totalPages,
            totalItems: response.data.sectorsPagination.totalItems,
            countItemsInPage: response.data.sectorsPagination.countItemsInPage,
            selfPage: response.data.sectorsPagination.selfPage,
          };
          this.sectorsData = response.data.sectorsPagination.sectorsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.sectorsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.sectorsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.sectorsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.sectorsData = null;
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
    this.getAllSectors();
  },
};
</script>

<style lang="scss"></style>
