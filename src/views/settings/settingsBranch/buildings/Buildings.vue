<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="buildingsData">
      <BuildingsTable
        :buildingsData="buildingsData"
        :buildingData="buildingData"
        v-on:setBuildingData="buildingData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <BuildingInfo :buildingData="buildingData" />
      <BuildingDelete
        :buildingData="buildingData"
        v-on:refresh="getAllBuildings()"
      />
    </div>

    <BuildingFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import BuildingsTable from "@/components/settings/settingsBranch/buildings/BuildingsTable.vue";
import BuildingInfo from "@/components/settings/settingsBranch/buildings/BuildingInfo.vue";
import BuildingDelete from "@/components/settings/settingsBranch/buildings/BuildingDelete.vue";
import BuildingFloatBtns from "@/components/settings/settingsBranch/buildings/BuildingFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Building from "@/models/settings/settingsBranch/buildings/Building";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Buildings",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BuildingsTable,
    BuildingInfo,
    BuildingDelete,
    BuildingFloatBtns,
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
      buildingsData: null,
      buildingData: new Building(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllBuildings();
    },
    search(text) {
      this.textSearch = text;
      this.getAllBuildings();
    },
    async getAllBuildings() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Buildings/GetAllBuildings?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.buildingsPagination.totalPages,
            totalItems: response.data.buildingsPagination.totalItems,
            countItemsInPage:
              response.data.buildingsPagination.countItemsInPage,
            selfPage: response.data.buildingsPagination.selfPage,
          };
          this.buildingsData = response.data.buildingsPagination.buildingsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.buildingsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.buildingsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.buildingsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.buildingsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllBuildings();
  },
};
</script>
