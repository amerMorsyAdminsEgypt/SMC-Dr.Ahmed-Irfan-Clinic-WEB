<template>
  <b-modal id="SpecialSpecialtyInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/special-spcialities.svg" class="icon-lg" />
        {{ $t("specialSpecialtyData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="specialSpecialtyData.generalSpecialtyNameCurrent"
        :title="$t('generalSpecialtyName')"
        :imgName="'special-spcialities.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="specialSpecialtyData.specialSpecialtyNameAr"
        :title="$t('specialSpecialtyNameAr')"
        :imgName="'special-spcialities.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="specialSpecialtyData.specialSpecialtyNameEn"
        :title="$t('specialSpecialtyNameEn')"
        :imgName="'special-spcialities.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="specialSpecialtyData.specialSpecialtyNameUnd"
        :title="$t('specialSpecialtyNameUnd')"
        :imgName="'special-spcialities.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="specialSpecialtyData.specialSpecialtyDescriptionAr"
        :title="$t('specialSpecialtyDescriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="specialSpecialtyData.specialSpecialtyDescriptionEn"
        :title="$t('specialSpecialtyDescriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="specialSpecialtyData.specialSpecialtyDescriptionUnd"
        :title="$t('specialSpecialtyDescriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="specialSpecialtyData.specialSpecialtyNotes"
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
  name: "SpecialSpecialtyInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["specialSpecialtyData"],
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
