<template>
  <b-modal id="ActiveSubstanceInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/active-substance.svg" class="icon-lg" />
        {{ $t("activeSubstances.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="activeSubstanceData.activeSubstanceNameAr"
        :title="$t('activeSubstances.nameAr')"
        :imgName="'active-substance.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="activeSubstanceData.activeSubstanceNameEn"
        :title="$t('activeSubstances.nameEn')"
        :imgName="'active-substance.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="activeSubstanceData.activeSubstanceNameUnd"
        :title="$t('activeSubstances.nameUnd')"
        :imgName="'active-substance.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="activeSubstanceData.activeSubstanceDescriptionAr"
        :title="$t('activeSubstances.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="activeSubstanceData.activeSubstanceDescriptionEn"
        :title="$t('activeSubstances.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="activeSubstanceData.activeSubstanceDescriptionUnd"
        :title="$t('activeSubstances.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="activeSubstanceData.activeSubstanceNotes"
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
  name: "ActiveSubstanceInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["activeSubstanceData"],
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
