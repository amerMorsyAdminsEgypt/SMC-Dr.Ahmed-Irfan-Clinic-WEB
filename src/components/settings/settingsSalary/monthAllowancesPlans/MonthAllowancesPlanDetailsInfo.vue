<template>
  <b-modal
    id="MonthAllowancesPlanDetailsInfo"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img src="@/assets/images/month-allowances-plans.svg" class="icon-lg" />
        {{ $t("monthAllowancesPlansSlideDetailsData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="monthAllowancesPlansSlideDetailsData.allowanceNameCurrent"
        :title="$t('allowanceName')"
        :imgName="'allowances.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          monthAllowancesPlansSlideDetailsData.monthAllowancesValue + $t('EGP')
        "
        :title="$t('allowanceValue')"
        :imgName="'money.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          monthAllowancesPlansSlideDetailsData.monthAllowancesMaximumNumberInMonth
        "
        :title="$t('allowancesMaximumNumberInMonth')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          monthAllowancesPlansSlideDetailsData.monthAllowancesMaximumNumberInYear
        "
        :title="$t('allowancesMaximumNumberInYear')"
        :imgName="'year.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          monthAllowancesPlansSlideDetailsData.beginningOfTheEntitlementInDays
        "
        :title="$t('beginningOfTheEntitlement') + '(' + $t('days') + ')'"
        :imgName="'days.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          monthAllowancesPlansSlideDetailsData.beginningOfTheEntitlementInHours
        "
        :title="$t('beginningOfTheEntitlement') + '(' + $t('hours') + ')'"
        :imgName="'hours.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          monthAllowancesPlansSlideDetailsData.beginningOfTheEntitlementInMinutes
        "
        :title="$t('beginningOfTheEntitlement') + '(' + $t('minutes') + ')'"
        :imgName="'minutes.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          monthAllowancesPlansSlideDetailsData.beginningOfTheEntitlementInSeconds
        "
        :title="$t('beginningOfTheEntitlement') + '(' + $t('seconds') + ')'"
        :imgName="'seconds.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="
          monthAllowancesPlansSlideDetailsData.monthAllowancesPlansSlidesDetailsNote
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
  name: "MonthAllowancesPlanDetailsInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["monthAllowancesPlansSlideDetailsData"],
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
