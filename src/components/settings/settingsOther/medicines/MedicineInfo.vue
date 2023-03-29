<template>
  <b-modal id="MedicineInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/medicines.svg" class="icon-lg" />
        {{ $t("medicineData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="medicineData.medicinesTypeNameCurrent"
        :title="$t('medicinesTypeName')"
        :imgName="'medicines-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="medicineData.medicineNameAr"
        :title="$t('medicineNameAr')"
        :imgName="'medicines.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="medicineData.medicineNameEn"
        :title="$t('medicineNameEn')"
        :imgName="'medicines.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="medicineData.medicineNameUnd"
        :title="$t('medicineNameUnd')"
        :imgName="'medicines.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="medicineData.medicineNotes"
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
  name: "MedicineInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["medicineData"],
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
