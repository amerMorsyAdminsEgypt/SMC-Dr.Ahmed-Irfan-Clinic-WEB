<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <QuestionForm
      v-if="!isLoading"
      :questionData="questionData"
      :imageSrc="imageSrc"
      :submitName="$t('add')"
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
import DEFAULT_IMG from "@/assets/images/questions.svg";

export default {
  name: "QuestionAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    QuestionForm,
  },
  props: [
    "questionsTypeToken",
    "generalSpecialtyToken",
    "specialSpecialtyToken",
  ],
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
      imageSrc: DEFAULT_IMG,
    };
  },
  methods: {
    async addOrUpdateQuestion() {
      this.isLoading = true;
      try {
        let response = await this.questionData.addOrUpdateQuestion(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.questionData.setInitialValue();
          this.setFilter();
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
      this.questionData.questionsTypeToken = this.questionsTypeToken || "";
      this.questionData.generalSpecialtyToken =
        this.generalSpecialtyToken || "";
      this.questionData.specialSpecialtyToken =
        this.specialSpecialtyToken || "";
    },
  },
  async created() {
    this.setFilter();
  },
};
</script>

<style scoped lang="scss"></style>
