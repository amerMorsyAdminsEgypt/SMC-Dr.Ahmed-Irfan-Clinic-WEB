<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="workPlansData">
      <WorkPlansTable
        :workPlansData="workPlansData"
        :workPlanData="workPlanData"
        v-on:setWorkPlanData="workPlanData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <WorkPlanInfo :workPlanData="workPlanData" />
      <WorkPlanDelete
        :workPlanData="workPlanData"
        v-on:refresh="getAllWorkPlans()"
      />
    </div>

    <WorkPlanFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import WorkPlansTable from "@/components/settings/settingsSalary/workPlans/WorkPlansTable.vue";
import WorkPlanInfo from "@/components/settings/settingsSalary/workPlans/WorkPlanInfo.vue";
import WorkPlanDelete from "@/components/settings/settingsSalary/workPlans/WorkPlanDelete.vue";
import WorkPlanFloatBtns from "@/components/settings/settingsSalary/workPlans/WorkPlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import WorkPlan from "@/models/settings/settingsSalary/workPlans/WorkPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "WorkPlans",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    WorkPlansTable,
    WorkPlanInfo,
    WorkPlanDelete,
    WorkPlanFloatBtns,
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
      workPlansData: null,
      workPlanData: new WorkPlan(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllWorkPlans();
    },
    search(text) {
      this.textSearch = text;
      this.getAllWorkPlans();
    },
    async getAllWorkPlans() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/WorkPlans/GetAllWorkPlans?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.workPlansPagination.totalPages,
            totalItems: response.data.workPlansPagination.totalItems,
            countItemsInPage:
              response.data.workPlansPagination.countItemsInPage,
            selfPage: response.data.workPlansPagination.selfPage,
          };
          this.workPlansData = response.data.workPlansPagination.workPlansData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.workPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.workPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.workPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.workPlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllWorkPlans();
  },
};
</script>
