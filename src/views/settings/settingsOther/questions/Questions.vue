<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="questionsData">
      <div class="">
        <!-- <QuestionCard
          v-for="question in questionsData"
          :key="question.questionToken"
          :questionData="question"
          v-on:setQuestionData="questionData.fillData($event)"
        /> -->
        <QuestionsTable
          :questionsData="questionsData"
          v-on:setQuestionData="questionData.fillData($event)"
        />
      </div>

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <QuestionInfo :questionData="questionData" />
      <QuestionDelete
        :questionData="questionData"
        v-on:refresh="getAllQuestions()"
      />
    </div>

    <QuestionBtns
      :textSearch="textSearch"
      :questionsTypeToken="questionsTypeToken"
      :generalSpecialtyToken="generalSpecialtyToken"
      :specialSpecialtyToken="specialSpecialtyToken"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
// import QuestionCard from "@/components/settings/settingsOther/questions/QuestionCard.vue";
import QuestionsTable from "@/components/settings/settingsOther/questions/QuestionsTable.vue";
import QuestionInfo from "@/components/settings/settingsOther/questions/QuestionInfo.vue";
import QuestionDelete from "@/components/settings/settingsOther/questions/QuestionDelete.vue";
import QuestionBtns from "@/components/settings/settingsOther/questions/QuestionBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Question from "@/models/settings/settingsOther/questions/Question";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Questions",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    // QuestionCard,
    QuestionsTable,
    QuestionInfo,
    QuestionDelete,
    QuestionBtns,
    Pagination,
  },
  props: [
    "questionsTypeToken",
    "generalSpecialtyToken",
    "specialSpecialtyToken",
  ],
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
      questionsData: null,
      questionData: new Question(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllQuestions();
    },
    search(type, general, special, text) {
      this.questionData.filter.questionsTypeToken = type;
      this.questionData.filter.generalSpecialtyToken = general;
      this.questionData.filter.specialSpecialtyToken = special;
      this.textSearch = text;
      this.getAllQuestions();
    },
    async getAllQuestions() {
      this.isLoading = true;
      try {
        const response = await this.questionData.getAllQuestions(
          this.language,
          this.userAuthorizeToken,
          this.selfPage,
          this.textSearch
        );

        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.questionsPagination.totalPages,
            totalItems: response.data.questionsPagination.totalItems,
            countItemsInPage:
              response.data.questionsPagination.countItemsInPage,
            selfPage: response.data.questionsPagination.selfPage,
          };
          this.questionsData = response.data.questionsPagination.questionsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.questionsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.questionsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.questionsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.questionsData = null;
      }
      this.isLoading = false;
    },
    setFilter() {
      this.questionData.filter.questionsTypeToken =
        this.questionsTypeToken || "";
      this.questionData.filter.generalSpecialtyToken =
        this.generalSpecialtyToken || "";
      this.questionData.filter.specialSpecialtyToken =
        this.specialSpecialtyToken || "";
    },
  },
  computed: {},
  async created() {
    console.log("created");
    this.setFilter();
    this.getAllQuestions();
  },
};
</script>
