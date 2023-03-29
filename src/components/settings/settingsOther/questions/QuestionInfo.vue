<template>
  <b-modal id="QuestionInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/questions.svg" class="icon-lg" />
        {{ $t("questions.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="questionData.questionsTypeNameCurrent"
        :title="$t('questionsTypes.name')"
        :imgName="'questions.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="questionData.questionNameCurrent"
        :title="$t('questions.name')"
        :imgName="'questions.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="questionData.questionNameAr"
        :title="$t('questions.nameAr')"
        :imgName="'questions.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="questionData.questionNameEn"
        :title="$t('questions.nameEn')"
        :imgName="'questions.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="questionData.questionNameUnd"
        :title="$t('questions.nameUnd')"
        :imgName="'questions.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="questionData.questionNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";

export default {
  name: "QuestionInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["questionData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
};
</script>

<style scoped lang="scss"></style>
