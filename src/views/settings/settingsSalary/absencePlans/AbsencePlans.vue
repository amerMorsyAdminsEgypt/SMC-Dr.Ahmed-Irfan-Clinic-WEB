<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="absencePlansData">
      <AbsencePlansTable
        :absencePlansData="absencePlansData"
        :absencePlanData="absencePlanData"
        v-on:setAbsencePlanData="absencePlanData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <AbsencePlanDelete
        :absencePlanData="absencePlanData"
        v-on:refresh="getAllAbsencePlans()"
      />
    </div>

    <AbsencePlanFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import AbsencePlansTable from "@/components/settings/settingsSalary/absencePlans/AbsencePlansTable.vue";
import AbsencePlanDelete from "@/components/settings/settingsSalary/absencePlans/AbsencePlanDelete.vue";
import AbsencePlanFloatBtns from "@/components/settings/settingsSalary/absencePlans/AbsencePlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import AbsencePlan from "@/models/settings/settingsSalary/absencePlans/AbsencePlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "AbsencePlans",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AbsencePlansTable,
    AbsencePlanDelete,
    AbsencePlanFloatBtns,
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
      absencePlansData: null,
      absencePlanData: new AbsencePlan(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllAbsencePlans();
    },
    search(text) {
      this.textSearch = text;
      this.getAllAbsencePlans();
    },
    async getAllAbsencePlans() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/AbsencePlans/GetAbsencePlanses?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.absencePlansPagination.totalPages,
            totalItems: response.data.absencePlansPagination.totalItems,
            countItemsInPage:
              response.data.absencePlansPagination.countItemsInPage,
            selfPage: response.data.absencePlansPagination.selfPage,
          };
          this.absencePlansData =
            response.data.absencePlansPagination.absencePlansData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.absencePlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.absencePlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.absencePlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.absencePlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllAbsencePlans();
  },
};
</script>
