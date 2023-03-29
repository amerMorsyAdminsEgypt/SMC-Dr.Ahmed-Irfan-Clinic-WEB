<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="treasuriesData">
      <TreasuriesTable
        :treasuriesData="treasuriesData"
        :treasuryData="treasuryData"
        v-on:setTreasuryData="treasuryData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <TreasuryDelete
        :treasuryData="treasuryData"
        v-on:refresh="getAllTreasuries()"
      />
    </div>

    <TreasuryFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import TreasuriesTable from "@/components/finance/treasuries/TreasuriesTable.vue";
import TreasuryDelete from "@/components/finance/treasuries/TreasuryDelete.vue";
import TreasuryFloatBtns from "@/components/finance/treasuries/TreasuryFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Treasury from "@/models/finance/treasuries/Treasury";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Treasuries",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    TreasuriesTable,
    TreasuryDelete,
    TreasuryFloatBtns,
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
      treasuriesData: null,
      treasuryData: new Treasury(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllTreasuries();
    },
    search(text) {
      this.textSearch = text;
      this.getAllTreasuries();
    },
    async getAllTreasuries() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Treasuries/GetAllTreasuries?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.treasuriesPagination.totalPages,
            totalItems: response.data.treasuriesPagination.totalItems,
            countItemsInPage:
              response.data.treasuriesPagination.countItemsInPage,
            selfPage: response.data.treasuriesPagination.selfPage,
          };
          this.treasuriesData = response.data.treasuriesPagination.treasuryData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.treasuriesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.treasuriesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.treasuriesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.treasuriesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllTreasuries();
  },
};
</script>
