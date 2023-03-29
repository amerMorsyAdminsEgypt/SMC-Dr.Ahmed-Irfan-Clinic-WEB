<template>
  <b-modal id="SalaryEffectInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/salary-effects.svg" class="icon-lg" />
        {{ $t("salaryEffectData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="salaryEffectData.workShiftCode"
        :title="$t('workShiftCode')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="salaryEffectData.workShiftNameAr"
        :title="$t('workShiftNameAr')"
        :imgName="'work-shifts.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="salaryEffectData.workShiftNameEn"
        :title="$t('workShiftNameEn')"
        :imgName="'work-shifts.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="salaryEffectData.workShiftNameUnd"
        :title="$t('workShiftNameUnd')"
        :imgName="'work-shifts.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(salaryEffectData.workShiftTimeFrom)"
        :title="$t('workShiftTimeFrom')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(salaryEffectData.workShiftTimeTo)"
        :title="$t('workShiftTimeTo')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="salaryEffectData.workShiftDuration"
        :title="$t('workShiftDuration')"
        :imgName="'time.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(salaryEffectData.actionDateTime)"
        :title="$t('actionDateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="salaryEffectData.workShiftNotes"
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
  name: "SalaryEffectInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["salaryEffectData"],
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
