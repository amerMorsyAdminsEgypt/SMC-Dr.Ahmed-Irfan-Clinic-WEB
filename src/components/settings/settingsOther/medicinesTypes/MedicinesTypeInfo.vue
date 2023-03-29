<template>
  <b-modal id="MedicinesTypeInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/medicines-types.svg" class="icon-lg" />
        {{ $t("medicinesTypeData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="medicinesTypeData.medicinesTypeNameAr"
        :title="$t('medicinesTypeNameAr')"
        :imgName="'medicines-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="medicinesTypeData.medicinesTypeNameEn"
        :title="$t('medicinesTypeNameEn')"
        :imgName="'medicines-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="medicinesTypeData.medicinesTypeNameUnd"
        :title="$t('medicinesTypeNameUnd')"
        :imgName="'medicines-types.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="medicinesTypeData.medicinesTypeNotes"
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
  name: "MedicinesTypeInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["medicinesTypeData"],
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
