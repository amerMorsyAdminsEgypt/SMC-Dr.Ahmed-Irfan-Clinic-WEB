<template>
  <b-modal id="OfficialHolidayInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/holiday.svg" class="icon-lg" />
        {{ $t("officialHolidayData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officialHolidayData.officialHolidayCode"
        :title="$t('officialHolidayCode')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officialHolidayData.officialHolidayNameAr"
        :title="$t('officialHolidayNameAr')"
        :imgName="'holiday.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officialHolidayData.officialHolidayNameEn"
        :title="$t('officialHolidayNameEn')"
        :imgName="'holiday.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officialHolidayData.officialHolidayNameUnd"
        :title="$t('officialHolidayNameUnd')"
        :imgName="'holiday.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officialHolidayData.officialHolidayStartDate"
        :title="$t('officialHolidayStartDate')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(officialHolidayData.officialHolidayStartTime)"
        :title="$t('officialHolidayStartTime')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officialHolidayData.officialHolidayEndDate"
        :title="$t('officialHolidayEndDate')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(officialHolidayData.officialHolidayEndTime)"
        :title="$t('officialHolidayEndTime')"
        :imgName="'time.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officialHolidayData.officialHolidayDurationTime"
        :title="$t('officialHolidayDurationTime')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officialHolidayData.officialHolidayWorkHourPrice"
        :title="$t('officialHolidayWorkHourPrice')"
        :imgName="'number.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officialHolidayData.officialHolidayDescriptionAr"
        :title="$t('officialHolidayDescriptionAr')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officialHolidayData.officialHolidayDescriptionEn"
        :title="$t('officialHolidayDescriptionEn')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officialHolidayData.officialHolidayDescriptionUnd"
        :title="$t('officialHolidayDescriptionUnd')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(officialHolidayData.actionDateTime)"
        :title="$t('actionDateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="officialHolidayData.officialHolidayNotes"
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
  name: "OfficialHolidayInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["officialHolidayData"],
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
