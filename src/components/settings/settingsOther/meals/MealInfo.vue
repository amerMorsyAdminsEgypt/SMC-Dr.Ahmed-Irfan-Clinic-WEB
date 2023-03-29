<template>
  <b-modal id="MealInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/meal.svg" class="icon-lg" />
        {{ $t("meals.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="mealData.mealsTypeNameCurrent"
        :title="$t('mealsTypes.name')"
        :imgName="'meals-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="mealData.mealNameCurrent"
        :title="$t('meals.name')"
        :imgName="'meal.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="mealData.mealNameAr"
        :title="$t('meals.nameAr')"
        :imgName="'meal.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="mealData.mealNameEn"
        :title="$t('meals.nameEn')"
        :imgName="'meal.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="mealData.mealNameUnd"
        :title="$t('meals.nameUnd')"
        :imgName="'meal.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="mealData.mealNotes"
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
  name: "MealInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["mealData"],
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
