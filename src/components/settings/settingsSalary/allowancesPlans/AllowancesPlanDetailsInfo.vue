<template>
  <b-modal
    id="AllowancesPlanDetailsInfo"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img src="@/assets/images/allowances-plans.svg" class="icon-lg" />
        {{ $t("allowancesPlansSlideDetailsData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowancesPlansSlideDetailsData.allowanceNameCurrent"
        :title="$t('allowanceName')"
        :imgName="'allowances.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowancesPlansSlideDetailsData.allowancesValue + $t('EGP')"
        :title="$t('allowanceValue')"
        :imgName="'money.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowancesPlansSlideDetailsData.attendanceTypeNameCurrent"
        :title="$t('operationType')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowancesPlansSlideDetailsData.timeMethodCalcolateNameCurrent"
        :title="$t('timeMethodCalcolateName')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(allowancesPlansSlideDetailsData.workShiftTimeFrom)"
        :title="$t('workShiftTimeFrom')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(allowancesPlansSlideDetailsData.workShiftTimeTo)"
        :title="$t('workShiftTimeTo')"
        :imgName="'time.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowancesPlansSlideDetailsData.dateStart"
        :title="$t('activationStartDate')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowancesPlansSlideDetailsData.dateEnd"
        :title="$t('activationEndDate')"
        :imgName="'date.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowancesPlansSlideDetailsData.totalTimeOfShift"
        :title="$t('workShiftDuration')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowancesPlansSlideDetailsData.allowancesMaximumNumberInDay"
        :title="$t('allowancesMaximumNumberInDay')"
        :imgName="'days.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowancesPlansSlideDetailsData.allowancesMaximumNumberInMonth"
        :title="$t('allowancesMaximumNumberInMonth')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="allowancesPlansSlideDetailsData.allowancesMaximumNumberInYear"
        :title="$t('allowancesMaximumNumberInYear')"
        :imgName="'year.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          allowancesPlansSlideDetailsData.beginningOfTheEntitlementInHours
        "
        :title="$t('beginningOfTheEntitlement') + '(' + $t('hours') + ')'"
        :imgName="'hours.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          allowancesPlansSlideDetailsData.beginningOfTheEntitlementInMinutes
        "
        :title="$t('beginningOfTheEntitlement') + '(' + $t('minutes') + ')'"
        :imgName="'minutes.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          allowancesPlansSlideDetailsData.beginningOfTheEntitlementInSeconds
        "
        :title="$t('beginningOfTheEntitlement') + '(' + $t('seconds') + ')'"
        :imgName="'seconds.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          allowancesPlansSlideDetailsData.allowancesPlansSlidesDetailsNote
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
  name: "AllowancesPlanDetailsInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["allowancesPlansSlideDetailsData"],
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
