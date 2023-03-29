<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="floorsData">
      <FloorsTable
        :floorsData="floorsData"
        :floorData="floorData"
        v-on:setFloorData="floorData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <FloorInfo :floorData="floorData" />
      <FloorDelete :floorData="floorData" v-on:refresh="getAllFloors()" />
    </div>

    <FloorFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import FloorsTable from "@/components/settings/settingsBranch/floors/FloorsTable.vue";
import FloorInfo from "@/components/settings/settingsBranch/floors/FloorInfo.vue";
import FloorDelete from "@/components/settings/settingsBranch/floors/FloorDelete.vue";
import FloorFloatBtns from "@/components/settings/settingsBranch/floors/FloorFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Floor from "@/models/settings/settingsBranch/floors/Floor";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Floors",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    FloorsTable,
    FloorInfo,
    FloorDelete,
    FloorFloatBtns,
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
      floorsData: null,
      floorData: new Floor(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllFloors();
    },
    search(text) {
      this.textSearch = text;
      this.getAllFloors();
    },
    async getAllFloors() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Floors/GetAllFloors/?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.floorsPagination.totalPages,
            totalItems: response.data.floorsPagination.totalItems,
            countItemsInPage: response.data.floorsPagination.countItemsInPage,
            selfPage: response.data.floorsPagination.selfPage,
          };
          this.floorsData = response.data.floorsPagination.floorsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.floorsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.floorsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.floorsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.floorsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllFloors();
  },
};
</script>
