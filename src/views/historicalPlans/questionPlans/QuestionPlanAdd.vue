<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <QuestionPlanForm
      v-if="!isLoading"
      v-on:addOrUpdateQuestionPlan="addQuestionPlan()"
      :questionPlanData="questionPlanData"
      :clientToken="clientToken"
      :reservationToken="reservationToken"
      :submitName="$t('add')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import QuestionPlanForm from "@/components/historicalPlans/questionPlans/QuestionPlanForm";
import QuestionPlan from "@/models/historicalPlans/questionPlans/QuestionPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "QuestionPlanAdd",
  mixins: [createToastMixin],
  props: ["clientToken", "reservationToken"],
  components: {
    PreLoader,
    ExceptionWithImg,
    QuestionPlanForm,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      questionPlanData: new QuestionPlan(),
    };
  },
  methods: {
    async addQuestionPlan() {
      this.isLoading = true;
      try {
        let response = await this.questionPlanData.addOrUpdateQuestionPlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router
            .push({
              name: "QuestionPlans",
              params: {
                clientToken: this.questionPlanData.clientToken,
                reservationToken: this.questionPlanData.reservationToken,
              },
            })
            .catch(() => {});
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
      this.questionPlanData.clientToken = this.clientToken
        ? this.clientToken
        : "";
      this.questionPlanData.reservationToken = this.reservationToken
        ? this.reservationToken
        : "";
    },
  },
  async created() {
    this.setFilter();
  },
};
</script>

<style scoped lang="scss"></style>
