<template>
  <div v-if="questionsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("questions.name") }}</th>
            <th>{{ $t("questionsTypes.name") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(questionData, index) in questionsData"
            :key="questionData.questionToken"
          >
            <td>{{ ++index }}</td>
            <td class="cell-with-image">
              <img
                class="item-img-table"
                :src="`${baseUrl}${questionData.questionImagePath}`"
                :onerror="`this.src='${defaultImg}'`"
                alt="Image"
              />
              {{ isDataExist(questionData.questionNameCurrent) }}
            </td>

            <td>{{ isDataExist(questionData.questionsTypeNameCurrent) }}</td>
            <td>
              <button
                v-b-modal.QuestionInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setQuestionData(questionData)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="{
                  name: 'QuestionEdit',
                  params: {
                    questionToken: questionData.questionToken,
                  },
                }"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.QuestionDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setQuestionData(questionData)"
              >
                <img src="@/assets/images/trash.svg" class="icon-lg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/questions.svg";
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "QuestionsTable",
  components: {},
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG,
      baseUrl: BASE_URL,
    };
  },
  props: ["questionsData"],
  methods: {
    setQuestionData(questionData) {
      this.$emit("setQuestionData", questionData);
    },

    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
  computed: {
    imgSrc: function () {
      return BASE_URL + this.questionData.questionImagePath;
    },
  },
};
</script>

<style lang="scss"></style>
