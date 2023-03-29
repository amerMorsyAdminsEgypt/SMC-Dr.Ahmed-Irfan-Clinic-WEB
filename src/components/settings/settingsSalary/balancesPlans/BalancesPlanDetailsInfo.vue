<template>
  <b-modal
    id="BalancesPlanDetailsInfo"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img src="@/assets/images/balances-plans.svg" class="icon-lg" />
        {{ $t("balancesPlansSlideDetailsData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="balancesPlansSlideDetailsData.employeeSalaryEffectNameCurrent"
        :title="$t('salaryEffectName')"
        :imgName="'salary-effects.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="
          convertTimeAndDaysToString(
            balancesPlansSlideDetailsData.maximumNumberInDayInSeconds,
            balancesPlansSlideDetailsData.maximumNumberInDayInMinutes,
            balancesPlansSlideDetailsData.maximumNumberInDayInHours,
            0
          )
        "
        :title="$t('maximumNumberInDay')"
        :imgName="'days.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="
          convertTimeAndDaysToString(
            balancesPlansSlideDetailsData.maximumNumberInMonthInSeconds,
            balancesPlansSlideDetailsData.maximumNumberInMonthInMinutes,
            balancesPlansSlideDetailsData.maximumNumberInMonthInHours,
            balancesPlansSlideDetailsData.maximumNumberInMonthInDays
          )
        "
        :title="$t('maximumNumberInMonth')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="
          convertTimeAndDaysToString(
            balancesPlansSlideDetailsData.maximumNumberInYearInSeconds,
            balancesPlansSlideDetailsData.maximumNumberInYearInMinutes,
            balancesPlansSlideDetailsData.maximumNumberInYearInHours,
            balancesPlansSlideDetailsData.maximumNumberInYearInDays
          )
        "
        :title="$t('maximumNumberInYear')"
        :imgName="'year.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="balancesPlansSlideDetailsData.balancesPlansSlidesDetailsNote"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import {
  setDataMultiLang,
  timeToLang,
  convertTimeAndDaysToString,
} from "@/utils/functions";

export default {
  name: "BalancesPlanDetailsInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["balancesPlansSlideDetailsData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
    convertTimeAndDaysToString(seconds, minutes, hours, days) {
      return convertTimeAndDaysToString(seconds, minutes, hours, days).data.data
        .string;
    },
  },
};
</script>

<style scoped lang="scss"></style>
