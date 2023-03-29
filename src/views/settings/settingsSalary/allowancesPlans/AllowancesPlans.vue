<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="allowancesPlansData">
      <AllowancesPlansTable
        :allowancesPlansData="allowancesPlansData"
        :allowancesPlanData="allowancesPlanData"
        v-on:setAllowancesPlanData="allowancesPlanData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <AllowancesPlanDelete
        :allowancesPlanData="allowancesPlanData"
        v-on:refresh="getAllAllowancesPlans()"
      />
    </div>

    <AllowancesPlanFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import AllowancesPlansTable from "@/components/settings/settingsSalary/allowancesPlans/AllowancesPlansTable.vue";
import AllowancesPlanDelete from "@/components/settings/settingsSalary/allowancesPlans/AllowancesPlanDelete.vue";
import AllowancesPlanFloatBtns from "@/components/settings/settingsSalary/allowancesPlans/AllowancesPlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import AllowancesPlan from "@/models/settings/settingsSalary/allowancesPlans/AllowancesPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "AllowancesPlans",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AllowancesPlansTable,
    AllowancesPlanDelete,
    AllowancesPlanFloatBtns,
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
      allowancesPlansData: null,
      allowancesPlanData: new AllowancesPlan(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllAllowancesPlans();
    },
    search(text) {
      this.textSearch = text;
      this.getAllAllowancesPlans();
    },
    async getAllAllowancesPlans() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/AllowancesPlans/GetAllowancesPlanses?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.allowancesPlansPagination.totalPages,
            totalItems: response.data.allowancesPlansPagination.totalItems,
            countItemsInPage:
              response.data.allowancesPlansPagination.countItemsInPage,
            selfPage: response.data.allowancesPlansPagination.selfPage,
          };
          this.allowancesPlansData =
            response.data.allowancesPlansPagination.allowancesPlansData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.allowancesPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.allowancesPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.allowancesPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.allowancesPlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllAllowancesPlans();
  },
};
</script>
