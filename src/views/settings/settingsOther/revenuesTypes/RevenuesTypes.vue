<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="revenuesTypesData">
      <RevenuesTypesTable
        :revenuesTypesData="revenuesTypesData"
        :revenueTypeData="revenueTypeData"
        v-on:setRevenueTypeData="revenueTypeData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <RevenueTypeDelete
        :revenueTypeData="revenueTypeData"
        v-on:refresh="getAllRevenuesTypes()"
      />
    </div>

    <RevenueTypeFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import RevenuesTypesTable from "@/components/settings/settingsOther/revenuesTypes/RevenuesTypesTable.vue";
import RevenueTypeDelete from "@/components/settings/settingsOther/revenuesTypes/RevenueTypeDelete.vue";
import RevenueTypeFloatBtns from "@/components/settings/settingsOther/revenuesTypes/RevenueTypeFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import RevenueType from "@/models/settings/settingsOther/revenuesTypes/RevenueType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "RevenuesTypes",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    RevenuesTypesTable,
    RevenueTypeDelete,
    RevenueTypeFloatBtns,
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
      revenuesTypesData: null,
      revenueTypeData: new RevenueType(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllRevenuesTypes();
    },
    search(text) {
      this.textSearch = text;
      this.getAllRevenuesTypes();
    },
    async getAllRevenuesTypes() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/RevenuesTypes/GetAllRevenuesTypes?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.revenuesTypePagination.totalPages,
            totalItems: response.data.revenuesTypePagination.totalItems,
            countItemsInPage:
              response.data.revenuesTypePagination.countItemsInPage,
            selfPage: response.data.revenuesTypePagination.selfPage,
          };
          this.revenuesTypesData =
            response.data.revenuesTypePagination.revenuesTypeData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.revenuesTypesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.revenuesTypesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.revenuesTypesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.revenuesTypesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllRevenuesTypes();
  },
};
</script>
