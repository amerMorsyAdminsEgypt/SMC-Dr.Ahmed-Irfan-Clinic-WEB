<template>
  <b-modal id="GeneralSpecialtyInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/general-specialities.svg" class="icon-lg" />
        {{ $t("generalSpecialtyData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="generalSpecialtyData.generalSpecialtyNameAr"
        :title="$t('generalSpecialtyNameAr')"
        :imgName="'general-specialities.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="generalSpecialtyData.generalSpecialtyNameEn"
        :title="$t('generalSpecialtyNameEn')"
        :imgName="'general-specialities.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="generalSpecialtyData.generalSpecialtyNameUnd"
        :title="$t('generalSpecialtyNameUnd')"
        :imgName="'general-specialities.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="generalSpecialtyData.generalSpecialtyDescriptionAr"
        :title="$t('generalSpecialtyDescriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="generalSpecialtyData.generalSpecialtyDescriptionEn"
        :title="$t('generalSpecialtyDescriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="generalSpecialtyData.generalSpecialtyDescriptionUnd"
        :title="$t('generalSpecialtyDescriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="generalSpecialtyData.generalSpecialtyNotes"
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
  name: "GeneralSpecialtyInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["generalSpecialtyData"],
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
