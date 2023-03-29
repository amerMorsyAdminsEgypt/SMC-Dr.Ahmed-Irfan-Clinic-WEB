<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="officesTimesData">
      <OfficesTimesTable
        :officesTimesData="officesTimesData"
        :officesTimeData="officesTimeData"
        v-on:setOfficesTimeData="officesTimeData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <OfficesTimeInfo :officesTimeData="officesTimeData" />
      <OfficesTimeDelete
        :officesTimeData="officesTimeData"
        v-on:refresh="getAllOfficesTimes()"
      />
    </div>

    <OfficesTimeFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import OfficesTimesTable from "@/components/settings/settingsBranch/officesTimes/OfficesTimesTable.vue";
import OfficesTimeInfo from "@/components/settings/settingsBranch/officesTimes/OfficesTimeInfo.vue";
import OfficesTimeDelete from "@/components/settings/settingsBranch/officesTimes/OfficesTimeDelete.vue";
import OfficesTimeFloatBtns from "@/components/settings/settingsBranch/officesTimes/OfficesTimeFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import OfficesTime from "@/models/settings/settingsBranch/officesTimes/OfficeTime";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OfficesTimes",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficesTimesTable,
    OfficesTimeInfo,
    OfficesTimeDelete,
    OfficesTimeFloatBtns,
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
      officesTimesData: null,
      officesTimeData: new OfficesTime(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllOfficesTimes();
    },
    search(text) {
      this.textSearch = text;
      this.getAllOfficesTimes();
    },
    async getAllOfficesTimes() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/OfficesTimes/GetAllOfficesTimes?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&branchTimeArchiveStatus=false&filterStatus=false&reservationShowStatus=&dayToken=&branchToken=&buildingToken=&floorToken=&chamberToken=&generalSpecialtyToken=&specialSpecialtyToken=&textSearch=${this.textSearch}&employeeToken`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.officesTimesPagination.totalPages,
            totalItems: response.data.officesTimesPagination.totalItems,
            countItemsInPage:
              response.data.officesTimesPagination.countItemsInPage,
            selfPage: response.data.officesTimesPagination.selfPage,
          };
          this.officesTimesData =
            response.data.officesTimesPagination.officesTimesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.officesTimesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.officesTimesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.officesTimesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.officesTimesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllOfficesTimes();
    // console.log(this.officesTimesData);
  },
};
</script>
