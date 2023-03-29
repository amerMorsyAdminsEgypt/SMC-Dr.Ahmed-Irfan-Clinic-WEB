<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="curePlansData">
      <CurePlansTable
        v-on:setCurePlanData="curePlanData.fillData($event)"
        v-on:downlaodTreatmentPlan="downlaodTreatmentPlan"
        :curePlansData="curePlansData"
        :curePlanData="curePlanData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterCurePlanData.paginationData"
        v-on:changePage="changePage"
      />

      <CurePlanDelete
        :filterCurePlanData="curePlanData"
        v-on:refresh="getCurePlans()"
      />
    </div>

    <CurePlanFloatBtns
      :filterCurePlanData="filterCurePlanData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import { downloadFileFromServer } from "@/utils/functions";
import CurePlansTable from "@/components/historicalPlans/curePlans/CurePlansTable.vue";
import CurePlanDelete from "@/components/historicalPlans/curePlans/CurePlanDelete.vue";
import CurePlanFloatBtns from "@/components/historicalPlans/curePlans/CurePlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import CurePlan from "@/models/historicalPlans/curePlans/CurePlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "CurePlans",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CurePlansTable,
    CurePlanDelete,
    CurePlanFloatBtns,
    Pagination,
  },
  props: [],
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
      curePlansData: null,
      curePlanData: new CurePlan(),
      filterCurePlanData: new CurePlan(),
    };
  },
  methods: {
    changePage(page) {
      this.filterCurePlanData.paginationData.selfPage = page;
      this.getCurePlans();
    },
    search(data) {
      this.$store.dispatch(
        "updateHistoricalPlansClientToken",
        data.clientToken
      );
      this.$store.dispatch(
        "updateHistoricalPlansReservationToken",
        data.reservationToken
      );
      this.filterCurePlanData.fillData(data);
      this.curePlansData = null;
      this.getCurePlans();
    },
    async getCurePlans() {
      this.isLoading = true;
      try {
        let response = await this.filterCurePlanData.getCurePlans(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.curePlansData = response.data.curePlansPagination.curePlansData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.curePlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.curePlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.curePlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        // console.log(error);
        this.showMsg(this.$t("errorCatch"));
        this.curePlansData = null;
      }
      this.isLoading = false;
    },
    async downlaodTreatmentPlan(data) {
      this.isLoading = true;
      this.curePlanData.treatmentPlanToken = data.treatmentPlanToken;
      try {
        let response = await this.curePlanData.getCurePlanReport(
          this.language,
          this.userAuthorizeToken
        );
        if (
          response.data.status == STATUS.SUCCESS &&
          response.data.isHaveMedicine === true
        ) {
          this.showMsg(response.data.msg, true);
          downloadFileFromServer(
            this.language,
            this.userAuthorizeToken,
            response.data.reportPathMedicine
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    setFilter() {
      this.filterCurePlanData.clientToken = this.$store.getters.historicalPlans
        .clientToken
        ? this.$store.getters.historicalPlans.clientToken
        : "";
      this.filterCurePlanData.reservationToken = this.$store.getters
        .historicalPlans.reservationToken
        ? this.$store.getters.historicalPlans.reservationToken
        : "";
    },
  },
  computed: {},
  // watch: {
  //   storedCurrentTab: function () {
  //     this.setFilter();
  //   },
  // },
  async created() {
    this.setFilter();
    this.getCurePlans();
  },
};
</script>
