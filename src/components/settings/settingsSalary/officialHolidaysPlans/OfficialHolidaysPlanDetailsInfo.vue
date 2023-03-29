<template>
  <b-modal
    id="OfficialHolidaysPlanDetailsInfo"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img
          src="@/assets/images/official-holidays-plans.svg"
          class="icon-lg"
        />
        {{ $t("officialHolidaysPlansSlideDetailsData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          officialHolidaysPlansSlideDetailsData.officialHolidaysPlansNameCurrent
        "
        :title="$t('officialHolidaysPlansName')"
        :imgName="'official-holidays-plans.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          officialHolidaysPlansSlideDetailsData.officialHolidayNameCurrent
        "
        :title="$t('officialHolidayName')"
        :imgName="'holiday.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="
          officialHolidaysPlansSlideDetailsData.officialHolidaysPlansSlidesDetailsNote
        "
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
  name: "OfficialHolidaysPlanDetailsInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["officialHolidaysPlansSlideDetailsData"],
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
