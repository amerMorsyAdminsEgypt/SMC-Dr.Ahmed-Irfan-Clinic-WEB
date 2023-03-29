<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <QuestionsTypeForm
      v-if="!isLoading"
      :questionsTypeData="questionsTypeData"
      :submitName="$t('edit')"
      :imageSrc="imageSrc"
      v-on:addOrUpdateQuestionsType="updateQuestionsType"
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
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/questions.svg";

export default {
  name: "QuestionsTypeEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    QuestionsTypeForm,
  },
  props: ["questionsTypeToken"],
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      questionsTypeData: new QuestionsType(),
    };
  },
  methods: {
    async getQuestionsTypeDetails() {
      this.isLoading = true;
      this.questionsTypeData.questionsTypeToken = this.questionsTypeToken;
      try {
        let response = await this.questionsTypeData.getQuestionsTypeDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.questionsTypeData.fillData(response.data.questionsTypeData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.questionsTypeData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.questionsTypeData = null;
      }
      this.isLoading = false;
    },
    async updateQuestionsType() {
      this.isLoading = true;
      try {
        let response = await this.questionsTypeData.addOrUpdateQuestionsType(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push({ name: "QuestionsTypes" });
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
      if (
        this.questionsTypeData &&
        this.questionsTypeData.questionsTypeImagePath
      ) {
        return BASE_URL + this.questionsTypeData.questionsTypeImagePath;
      }
      return DEFAULT_IMG;
    },
  },
  async created() {
    this.getQuestionsTypeDetails();
  },
};
</script>

<style scoped lang="scss"></style>
