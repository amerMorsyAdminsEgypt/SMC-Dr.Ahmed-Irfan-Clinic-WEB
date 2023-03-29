<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <QuestionPlanForm
      v-if="!isLoading"
      v-on:addOrUpdateQuestionPlan="updateQuestionPlan()"
      :questionPlanData="questionPlanData"
      :clientToken="clientToken"
      :reservationToken="reservationToken"
      :submitName="$t('edit')"
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
  name: "QuestionPlanEdit",
  mixins: [createToastMixin],
  props: ["clientToken", "reservationToken", "questionPlanToken"],
  components: {
    PreLoader,
    ExceptionWithImg,
    QuestionPlanForm,
  },
  data() {
    return {
      isLoading: true,
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
    async getQuestionPlanDetails() {
      this.isLoading = true;
      this.questionPlanData.questionPlanToken = this.questionPlanToken;
      try {
        let response = await this.questionPlanData.getQuestionPlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.questionPlanData.fillData(response.data.questionPlanData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.$router
            .push({
              name: "QuestionPlans",
              params: {
                clientToken: this.clientToken,
                reservationToken: this.reservationToken,
              },
            })
            .catch(() => {});
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.$router
          .push({
            name: "QuestionPlans",
            params: {
              clientToken: this.clientToken,
              reservationToken: this.reservationToken,
            },
          })
          .catch(() => {});
      }
      this.isLoading = false;
    },
    async updateQuestionPlan() {
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
                clientToken: this.clientToken,
                reservationToken: this.reservationToken,
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
  },
  async created() {
    this.getQuestionPlanDetails();
  },
};
</script>

<style scoped lang="scss"></style>
