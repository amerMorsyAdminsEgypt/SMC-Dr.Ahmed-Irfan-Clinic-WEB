<template>
  <div class="flip-card col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="imgSrc" :onerror="`this.src='${defaultImg}'`" alt="Image" />
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="$t('questionsTypes.name')">
            {{ questionsTypeData.questionsTypeNameCurrent }}
          </h4>
        </div>
      </div>
      <div class="flip-card-back">
        <!-- <router-link
          :to="{
            name: 'Questions',
            params: {
              questionsTypeToken: questionsTypeData.questionsTypeToken,
            },
          }"
          :title="$t('questions.modelName')"
        >
          <img src="@/assets/images/questions.svg" class="icon-lg" />
        </router-link> -->
        <div class="flip-card-back-icons">
          <button
            v-b-modal.QuestionsTypeInfo
            class="btn p-0"
            :title="$t('info')"
            @click="setQuestionsTypeData(questionsTypeData)"
          >
            <img src="@/assets/images/info.svg" class="icon-lg" />
          </button>
          <router-link
            :to="{
              name: 'QuestionsTypeEdit',
              params: {
                questionsTypeToken: questionsTypeData.questionsTypeToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
          <button
            v-b-modal.QuestionsTypeDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setQuestionsTypeData(questionsTypeData)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
          <!-- <br /> -->
        </div>
        <!-- <router-link
          :to="{
            name: 'Questions',
            params: {
              questionsTypeToken: questionsTypeData.questionsTypeToken,
            },
          }"
          :title="$t('questions.modelName')"
        > -->
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="$t('questions.modelName')">
            {{ questionsTypeData.questionsTypeNameCurrent }}
          </h4>
        </div>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/questions.svg";

export default {
  name: "QuestionsTypeCard",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG,
    };
  },
  props: ["questionsTypeData"],
  methods: {
    setQuestionsTypeData() {
      this.$emit("setQuestionsTypeData", this.questionsTypeData);
    },
  },
  computed: {
    imgSrc: function () {
      if (this.questionsTypeData.questionsTypeImagePath) {
        return BASE_URL + this.questionsTypeData.questionsTypeImagePath;
      }
      return DEFAULT_IMG;
    },
  },
};
</script>

<style lang="scss"></style>
