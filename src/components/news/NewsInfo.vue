<template>
  <b-modal id="NewsInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/news.svg" class="icon-lg" />
        {{ $t("newsData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="newsData.newsCategoryNameCurrent"
        :title="$t('newsCategoryName')"
        :imgName="'category.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="newsData.newsCode"
        :title="$t('newsCode')"
        :imgName="'points.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="newsData.newsNotes"
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
  name: "NewsInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["newsData"],
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
