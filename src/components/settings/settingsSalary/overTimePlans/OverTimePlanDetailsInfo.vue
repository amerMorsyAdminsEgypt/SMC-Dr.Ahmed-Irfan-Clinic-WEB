<template>
  <b-modal
    id="OverTimePlanDetailsInfo"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img src="@/assets/images/overtime-plans.svg" class="icon-lg" />
        {{ $t("overTimePlansSlideDetailsData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="overTimePlansSlideDetailsData.overTimePlansNameCurrent"
        :title="$t('overTimePlansName')"
        :imgName="'overtime-plans.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(overTimePlansSlideDetailsData.timeFrom)"
        :title="$t('timeFrom')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(overTimePlansSlideDetailsData.timeTo)"
        :title="$t('timeTo')"
        :imgName="'time.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="overTimePlansSlideDetailsData.overTimePriceFactor"
        :title="$t('overTimePriceFactor')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="overTimePlansSlideDetailsData.dayTypeNameCurrent"
        :title="$t('dayTypeName')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="overTimePlansSlideDetailsData.overTimePlansSlidesDetailsNote"
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
  name: "OverTimePlanDetailsInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["overTimePlansSlideDetailsData"],
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
