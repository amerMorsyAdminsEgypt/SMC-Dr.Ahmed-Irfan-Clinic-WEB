<template>
  <b-modal id="WorkShiftInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/work-shifts.svg" class="icon-lg" />
        {{ $t("workShiftData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="workShiftData.workShiftCode"
        :title="$t('workShiftCode')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="workShiftData.workShiftNameAr"
        :title="$t('workShiftNameAr')"
        :imgName="'work-shifts.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="workShiftData.workShiftNameEn"
        :title="$t('workShiftNameEn')"
        :imgName="'work-shifts.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="workShiftData.workShiftNameUnd"
        :title="$t('workShiftNameUnd')"
        :imgName="'work-shifts.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(workShiftData.workShiftTimeFrom)"
        :title="$t('workShiftTimeFrom')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(workShiftData.workShiftTimeTo)"
        :title="$t('workShiftTimeTo')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="workShiftData.workShiftDuration"
        :title="$t('workShiftDuration')"
        :imgName="'time.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(workShiftData.actionDateTime)"
        :title="$t('actionDateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="workShiftData.workShiftNotes"
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
  name: "WorkShiftInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["workShiftData"],
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
