<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="overTimePlansData">
      <OverTimePlansTable
        :overTimePlansData="overTimePlansData"
        :overTimePlanData="overTimePlanData"
        v-on:setOverTimePlanData="overTimePlanData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <OverTimePlanDelete
        :overTimePlanData="overTimePlanData"
        v-on:refresh="getAllOverTimePlans()"
      />
    </div>

    <OverTimePlanFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import OverTimePlansTable from "@/components/settings/settingsSalary/overTimePlans/OverTimePlansTable.vue";
import OverTimePlanDelete from "@/components/settings/settingsSalary/overTimePlans/OverTimePlanDelete.vue";
import OverTimePlanFloatBtns from "@/components/settings/settingsSalary/overTimePlans/OverTimePlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import OverTimePlan from "@/models/settings/settingsSalary/overTimePlans/OverTimePlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OverTimePlans",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OverTimePlansTable,
    OverTimePlanDelete,
    OverTimePlanFloatBtns,
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
      overTimePlansData: null,
      overTimePlanData: new OverTimePlan(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllOverTimePlans();
    },
    search(text) {
      this.textSearch = text;
      this.getAllOverTimePlans();
    },
    async getAllOverTimePlans() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/OverTimePlans/GetOverTimePlans?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.overTimePlansPagination.totalPages,
            totalItems: response.data.overTimePlansPagination.totalItems,
            countItemsInPage:
              response.data.overTimePlansPagination.countItemsInPage,
            selfPage: response.data.overTimePlansPagination.selfPage,
          };
          this.overTimePlansData =
            response.data.overTimePlansPagination.overTimePlansData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.overTimePlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.overTimePlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.overTimePlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.overTimePlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllOverTimePlans();
  },
};
</script>
