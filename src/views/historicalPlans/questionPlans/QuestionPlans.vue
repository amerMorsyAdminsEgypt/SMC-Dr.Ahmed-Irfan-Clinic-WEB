<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="questionPlans.questionPlansData">
      <QuestionPlansTable
        v-on:setQuestionPlanData="questionPlans.questionPlan.fillData($event)"
        :questionPlans="questionPlans"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="questionPlans.pagination"
        v-on:changePage="changePage"
      />
      <QuestionPlanDelete
        :questionPlanData="questionPlans.questionPlan"
        v-on:refresh="getAllQuestionPlans()"
      />
      <QuestionPlanDownload
        :questionPlanData="questionPlans.questionPlan"
        v-on:refresh="getAllQuestionPlans()"
      />
    </div>

    <QuestionPlanFloatBtns
      :theFilterData="questionPlans.filterData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import QuestionPlansTable from "@/components/historicalPlans/questionPlans/QuestionPlansTable.vue";
import QuestionPlanDelete from "@/components/historicalPlans/questionPlans/QuestionPlanDelete.vue";
import QuestionPlanDownload from "@/components/historicalPlans/questionPlans/QuestionPlanDownload.vue";
import QuestionPlanFloatBtns from "@/components/historicalPlans/questionPlans/QuestionPlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import QuestionPlans from "@/models/historicalPlans/questionPlans/QuestionPlans";

export default {
  name: "QuestionPlans",
  components: {
    PreLoader,
    ExceptionWithImg,
    QuestionPlansTable,
    QuestionPlanDelete,
    QuestionPlanDownload,
    QuestionPlanFloatBtns,
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
      questionPlans: new QuestionPlans(),
    };
  },
  methods: {
    changePage(page) {
      this.questionPlans.pagination.selfPage = page;
      this.getAllQuestionPlans();
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
      this.questionPlans.filterData.fillData(data);
      this.questionPlans.questionPlansData = null;
      this.getAllQuestionPlans();
    },
    async getAllQuestionPlans() {
      this.isLoading = true;
      try {
        const response =
          await this.questionPlans.questionPlan.getAllQuestionPlans(
            this.language,
            this.userAuthorizeToken,
            this.questionPlans.pagination,
            this.questionPlans.filterData
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.questionPlans.fillData(response.data);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.questionPlans.questionPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.questionPlans.questionPlansData = null;
          this.$store.dispatch("logoutUser");
          this.$router.push("/").catch(() => {});
        } else {
          this.questionPlans.questionPlansData = null;
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.questionPlans.questionPlansData = null;
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.questionPlans.filterData.clientToken = this.$store.getters
      .historicalPlans.clientToken
      ? this.$store.getters.historicalPlans.clientToken
      : "";
    this.questionPlans.filterData.reservationToken = this.$store.getters
      .historicalPlans.reservationToken
      ? this.$store.getters.historicalPlans.reservationToken
      : "";
    this.getAllQuestionPlans();
  },
};
</script>
