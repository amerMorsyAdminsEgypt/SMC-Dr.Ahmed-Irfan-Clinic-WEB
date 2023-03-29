<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="mainColumnsData">
      <MainColumnsTable
        :mainColumnsData="mainColumnsData"
        :mainColumnData="mainColumnData"
        v-on:setMainColumnData="mainColumnData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <MainColumnInfo :mainColumnData="mainColumnData" />
      <MainColumnDelete
        :mainColumnData="mainColumnData"
        v-on:refresh="getAllMainColumns()"
      />
    </div>

    <MainColumnFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import MainColumnsTable from "@/components/settings/settingsSalary/mainColumns/MainColumnsTable.vue";
import MainColumnInfo from "@/components/settings/settingsSalary/mainColumns/MainColumnInfo.vue";
import MainColumnDelete from "@/components/settings/settingsSalary/mainColumns/MainColumnDelete.vue";
import MainColumnFloatBtns from "@/components/settings/settingsSalary/mainColumns/MainColumnFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import MainColumn from "@/models/settings/settingsSalary/mainColumns/MainColumn";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MainColumns",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MainColumnsTable,
    MainColumnInfo,
    MainColumnDelete,
    MainColumnFloatBtns,
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
      mainColumnsData: null,
      mainColumnData: new MainColumn(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllMainColumns();
    },
    search(text) {
      this.textSearch = text;
      this.getAllMainColumns();
    },
    async getAllMainColumns() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/InputAttendaceSheetMainColumns/GetAllInputAttendaceSheetMainColumns?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.inputAttendaceSheetMainColumnsPagination.totalPages,
            totalItems:
              response.data.inputAttendaceSheetMainColumnsPagination.totalItems,
            countItemsInPage:
              response.data.inputAttendaceSheetMainColumnsPagination
                .countItemsInPage,
            selfPage:
              response.data.inputAttendaceSheetMainColumnsPagination.selfPage,
          };
          this.mainColumnsData =
            response.data.inputAttendaceSheetMainColumnsPagination.inputAttendaceSheetMainColumnsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.mainColumnsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.mainColumnsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.mainColumnsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.mainColumnsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllMainColumns();
  },
};
</script>
