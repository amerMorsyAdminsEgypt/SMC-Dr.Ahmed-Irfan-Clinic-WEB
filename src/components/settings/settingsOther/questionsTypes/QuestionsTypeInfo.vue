<template>
  <b-modal id="QuestionsTypeInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/questions.svg" class="icon-lg" />
        {{ $t("questionsTypes.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="questionsTypeData.questionsTypeNameAr"
        :title="$t('questionsTypes.nameAr')"
        :imgName="'questions.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="questionsTypeData.questionsTypeNameEn"
        :title="$t('questionsTypes.nameEn')"
        :imgName="'questions.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="questionsTypeData.questionsTypeNameUnd"
        :title="$t('questionsTypes.nameUnd')"
        :imgName="'questions.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="questionsTypeData.questionsTypeNotes"
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
  name: "QuestionsTypeInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["questionsTypeData"],
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
