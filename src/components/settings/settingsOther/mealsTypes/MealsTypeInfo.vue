<template>
  <b-modal id="MealsTypeInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/meals-types.svg" class="icon-lg" />
        {{ $t("mealsTypes.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="mealsTypeData.mealsTypeNameAr"
        :title="$t('mealsTypes.nameAr')"
        :imgName="'meals-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="mealsTypeData.mealsTypeNameEn"
        :title="$t('mealsTypes.nameEn')"
        :imgName="'meals-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="mealsTypeData.mealsTypeNameUnd"
        :title="$t('mealsTypes.nameUnd')"
        :imgName="'meals-types.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="mealsTypeData.mealsTypeNotes"
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
  name: "MealsTypeInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["mealsTypeData"],
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
