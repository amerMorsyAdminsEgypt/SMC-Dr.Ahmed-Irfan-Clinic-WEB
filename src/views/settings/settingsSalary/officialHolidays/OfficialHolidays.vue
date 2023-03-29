<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="officialHolidaysData">
      <OfficialHolidaysTable
        :officialHolidaysData="officialHolidaysData"
        :officialHolidayData="officialHolidayData"
        v-on:setOfficialHolidayData="officialHolidayData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <OfficialHolidayInfo :officialHolidayData="officialHolidayData" />
      <OfficialHolidayDelete
        :officialHolidayData="officialHolidayData"
        v-on:refresh="getAllOfficialHolidays()"
      />
    </div>

    <OfficialHolidayFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import OfficialHolidaysTable from "@/components/settings/settingsSalary/officialHolidays/OfficialHolidaysTable.vue";
import OfficialHolidayInfo from "@/components/settings/settingsSalary/officialHolidays/OfficialHolidayInfo.vue";
import OfficialHolidayDelete from "@/components/settings/settingsSalary/officialHolidays/OfficialHolidayDelete.vue";
import OfficialHolidayFloatBtns from "@/components/settings/settingsSalary/officialHolidays/OfficialHolidayFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import OfficialHoliday from "@/models/settings/settingsSalary/officialHolidays/OfficialHoliday";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OfficialHolidays",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficialHolidaysTable,
    OfficialHolidayInfo,
    OfficialHolidayDelete,
    OfficialHolidayFloatBtns,
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
      officialHolidaysData: null,
      officialHolidayData: new OfficialHoliday(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllOfficialHolidays();
    },
    search(text) {
      this.textSearch = text;
      this.getAllOfficialHolidays();
    },
    async getAllOfficialHolidays() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/OfficialHolidays/GetAllOfficialHolidays?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.officialHolidaysPagination.totalPages,
            totalItems: response.data.officialHolidaysPagination.totalItems,
            countItemsInPage:
              response.data.officialHolidaysPagination.countItemsInPage,
            selfPage: response.data.officialHolidaysPagination.selfPage,
          };
          this.officialHolidaysData =
            response.data.officialHolidaysPagination.officialHolidaysData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.officialHolidaysData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.officialHolidaysData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.officialHolidaysData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.officialHolidaysData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllOfficialHolidays();
  },
};
</script>
