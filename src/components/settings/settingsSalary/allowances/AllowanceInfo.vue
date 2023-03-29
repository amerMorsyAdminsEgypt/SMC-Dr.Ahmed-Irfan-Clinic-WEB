<template>
  <b-modal id="AllowanceInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/work-shifts.svg" class="icon-lg" />
        {{ $t("allowanceData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowanceData.allowanceNameAr"
        :title="$t('allowanceNameAr')"
        :imgName="'work-shifts.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowanceData.allowanceNameEn"
        :title="$t('allowanceNameEn')"
        :imgName="'work-shifts.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowanceData.allowanceNameUnd"
        :title="$t('allowanceNameUnd')"
        :imgName="'work-shifts.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowanceData.allowanceDescriptionAr"
        :title="$t('allowanceDescriptionAr')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowanceData.allowanceDescriptionEn"
        :title="$t('allowanceDescriptionEn')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowanceData.allowanceDescriptionUnd"
        :title="$t('allowanceDescriptionUnd')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="allowanceData.allowanceNotes"
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
  name: "AllowanceInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["allowanceData"],
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
