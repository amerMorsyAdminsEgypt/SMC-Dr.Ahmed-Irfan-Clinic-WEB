<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <QuestionsTypeForm
      v-if="!isLoading"
      :questionsTypeData="questionsTypeData"
      :imageSrc="imageSrc"
      :submitName="$t('add')"
      v-on:addOrUpdateQuestionsType="addOrUpdateQuestionsType"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import QuestionsTypeForm from "@/components/settings/settingsOther/questionsTypes/QuestionsTypeForm.vue";
import QuestionsType from "@/models/settings/settingsOther/questionsTypes/QuestionsType";
import createToastMixin from "@/utils/create-toast-mixin";
import DEFAULT_IMG from "@/assets/images/questions.svg";

export default {
  name: "QuestionsTypeAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    QuestionsTypeForm,
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
      questionsTypeData: new QuestionsType(),
      imageSrc: DEFAULT_IMG,
    };
  },
  methods: {
    async addOrUpdateQuestionsType() {
      this.isLoading = true;
      try {
        let response = await this.questionsTypeData.addOrUpdateQuestionsType(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.questionsTypeData.setInitialValue();
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
  async created() {},
};
</script>

<style scoped lang="scss"></style>
