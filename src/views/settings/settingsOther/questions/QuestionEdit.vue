<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <QuestionForm
      v-if="!isLoading"
      :questionData="questionData"
      :submitName="$t('edit')"
      :imageSrc="imageSrc"
      v-on:addOrUpdateQuestion="addOrUpdateQuestion"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import QuestionForm from "@/components/settings/settingsOther/questions/QuestionForm.vue";
import Question from "@/models/settings/settingsOther/questions/Question";
import createToastMixin from "@/utils/create-toast-mixin";
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/questions.svg";

export default {
  name: "QuestionEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    QuestionForm,
  },
  props: ["questionToken"],
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      questionData: new Question(),
    };
  },
  methods: {
    async getQuestionDetails() {
      this.isLoading = true;
      this.questionData.questionToken = this.questionToken;
      try {
        let response = await this.questionData.getQuestionDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.questionData.fillData(response.data.questionData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.questionData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.questionData = null;
      }
      this.isLoading = false;
    },
    async addOrUpdateQuestion() {
      this.isLoading = true;
      try {
        let response = await this.questionData.addOrUpdateQuestion(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push({
            name: "Questions",
            params: {
              questionsTypeToken: this.questionData.questionsTypeToken,
              generalSpecialtyToken: this.questionData.generalSpecialtyToken,
              specialSpecialtyToken: this.questionData.specialSpecialtyToken,
            },
          });
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
  computed: {
    imageSrc: function () {
      if (this.questionData && this.questionData.questionImagePath) {
        return BASE_URL + this.questionData.questionImagePath;
      }
      return DEFAULT_IMG;
    },
  },
  async created() {
    this.getQuestionDetails();
  },
};
</script>

<style scoped lang="scss"></style>
