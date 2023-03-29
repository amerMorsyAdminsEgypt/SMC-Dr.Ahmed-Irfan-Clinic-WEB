<template>
  <b-modal id="NewsCategoryInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/category.svg" class="icon-lg" />
        {{ $t("newsCategoryData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="newsCategoryData.newsCategoryNameAr"
        :title="$t('newsCategoryNameAr')"
        :imgName="'category.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="newsCategoryData.newsCategoryNameEn"
        :title="$t('newsCategoryNameEn')"
        :imgName="'category.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="newsCategoryData.newsCategoryNameUnd"
        :title="$t('newsCategoryNameUnd')"
        :imgName="'category.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="newsCategoryData.newsCategoryDescriptionAr"
        :title="$t('newsCategoryDescriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="newsCategoryData.newsCategoryDescriptionEn"
        :title="$t('newsCategoryDescriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="newsCategoryData.newsCategoryDescriptionUnd"
        :title="$t('newsCategoryDescriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="newsCategoryData.newsCategoryNotes"
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
  name: "NewsCategoryInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["newsCategoryData"],
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
