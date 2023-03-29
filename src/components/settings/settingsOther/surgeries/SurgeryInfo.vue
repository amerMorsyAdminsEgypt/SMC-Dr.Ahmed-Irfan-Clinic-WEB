<template>
  <b-modal id="SurgeryInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/medical-operations.svg" class="icon-lg" />
        {{ $t("surgeries.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="surgeryData.surgeryNameAr"
        :title="$t('surgeries.nameAr')"
        :imgName="'medical-operations.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="surgeryData.surgeryNameEn"
        :title="$t('surgeries.nameEn')"
        :imgName="'medical-operations.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="surgeryData.surgeryNameUnd"
        :title="$t('surgeries.nameUnd')"
        :imgName="'medical-operations.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="surgeryData.surgeryDescriptionAr"
        :title="$t('surgeries.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="surgeryData.surgeryDescriptionEn"
        :title="$t('surgeries.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="surgeryData.surgeryDescriptionUnd"
        :title="$t('surgeries.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="surgeryData.surgeryNotes"
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
  name: "SurgeryInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["surgeryData"],
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
