<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="chambersData">
      <ChambersTable
        :chambersData="chambersData"
        :chamberData="chamberData"
        v-on:setChamberData="chamberData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <ChamberInfo :chamberData="chamberData" />
      <ChamberDelete
        :chamberData="chamberData"
        v-on:refresh="getAllChambers()"
      />
    </div>

    <ChamberFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import ChambersTable from "@/components/settings/settingsBranch/chambers/ChambersTable.vue";
import ChamberInfo from "@/components/settings/settingsBranch/chambers/ChamberInfo.vue";
import ChamberDelete from "@/components/settings/settingsBranch/chambers/ChamberDelete.vue";
import ChamberFloatBtns from "@/components/settings/settingsBranch/chambers/ChamberFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Chamber from "@/models/settings/settingsBranch/chambers/Chamber";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Chambers",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ChambersTable,
    ChamberInfo,
    ChamberDelete,
    ChamberFloatBtns,
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
      chambersData: null,
      chamberData: new Chamber(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllChambers();
    },
    search(text) {
      this.textSearch = text;
      this.getAllChambers();
    },
    async getAllChambers() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Chambers/GetAllChambers?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.chambersPagination.totalPages,
            totalItems: response.data.chambersPagination.totalItems,
            countItemsInPage: response.data.chambersPagination.countItemsInPage,
            selfPage: response.data.chambersPagination.selfPage,
          };
          this.chambersData = response.data.chambersPagination.chambersData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.chambersData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.chambersData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.chambersData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.chambersData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllChambers();
  },
};
</script>
