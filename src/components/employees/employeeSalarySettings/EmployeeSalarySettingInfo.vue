<template>
  <b-modal
    id="EmployeeSalarySettingInfo"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img src="@/assets/images/money.svg" class="icon-lg" />
        {{ $t("employeeSalarySettingData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="employeeSalarySettingData.employeeNameCurrent"
        :title="$t('employeeName')"
        :imgName="'man.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(employeeSalarySettingData.actionDateTime)"
        :title="$t('actionDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="employeeSalarySettingData.employeeSalarySettingNameCurrent"
        :title="$t('salarySettingName')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeSalarySettingActivationStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeSalarySettingDescriptionCurrent
        "
        :title="$t('employeeSalarySettingDescription')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="employeeSalarySettingData.employeeSalarySettingNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-4'"
        :value="employeeSalarySettingData.employeeBasicSalary + $t('EGP')"
        :title="$t('employeeBasicSalary')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-4'"
        :value="employeeSalarySettingData.employeeVariableSalary + $t('EGP')"
        :title="$t('employeeVariableSalary')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-4'"
        :value="employeeSalarySettingData.employeeTotalSalary + $t('EGP')"
        :title="$t('employeeTotalSalary')"
        :imgName="'money.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-4'"
        :value="employeeSalarySettingData.employeeWorkDaysNumberPerMonth"
        :title="$t('employeeWorkDaysNumberPerMonth')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-4'"
        :value="employeeSalarySettingData.employeeWorkHoursNumberPerDay"
        :title="$t('employeeWorkHoursNumberPerDay')"
        :imgName="'hours.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-4'"
        :value="
          employeeSalarySettingData.employeeWorkHourPrice
            ? employeeSalarySettingData.employeeWorkHourPrice + $t('EGP')
            : $t('notFound')
        "
        :title="$t('employeeWorkHourPrice')"
        :imgName="'money.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedAttendLateInDayByHours24
        "
        :title="$t('maximumAllowedAttendLateInDay')"
        :imgName="'hours.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedAttendLateInDayStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          $t('days') +
          ': ( ' +
          employeeSalarySettingData.employeeMaximumAllowedAttendLateInMonthByDays +
          ' ) / ' +
          $t('hours') +
          ': ( ' +
          employeeSalarySettingData.employeeMaximumAllowedAttendLateInMonthByHours24 +
          ' )'
        "
        :title="$t('maximumAllowedAttendLateInMonth')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedAttendLateInMonthStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInDayByHours24
        "
        :title="$t('maximumAllowedEarlyDepartureInDay')"
        :imgName="'hours.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInDayStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          $t('days') +
          ': ( ' +
          employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInMonthByDays +
          ' ) / ' +
          $t('hours') +
          ': ( ' +
          employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInMonthByHours24 +
          ' )'
        "
        :title="$t('maximumAllowedEarlyDepartureInMonth')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInMonthStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedOverTimeInDayByHours24
        "
        :title="$t('maximumAllowedOverTimeInDay')"
        :imgName="'hours.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedOverTimeInDayStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          $t('days') +
          ': ( ' +
          employeeSalarySettingData.employeeMaximumAllowedOverTimeInMonthByDays +
          ' ) / ' +
          $t('hours') +
          ': ( ' +
          employeeSalarySettingData.employeeMaximumAllowedOverTimeInMonthByHours24 +
          ' )'
        "
        :title="$t('maximumAllowedOverTimeInMonth')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedOverTimeInMonthStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedOverTimeInMonthByDays
        "
        :title="$t('maximumAllowedOverTimeInMonth')"
        :imgName="'hours.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedOverTimeInMonthStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedShiftAbsenceUntillSalaryStop
        "
        :title="$t('maximumAllowedShiftAbsenceUntillSalaryStop')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMaximumAllowedShiftAbsenceUntillSalaryStopStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="employeeSalarySettingData.employeeDeductionFactorValueCaseLate"
        :title="$t('employeeDeductionFactorValueCaseLate')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeDeductionPriceCaseLateStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeDeductionFactorValueCaseEarlyDeparture
        "
        :title="$t('employeeDeductionFactorValueCaseEarlyDeparture')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeDeductionFactorValueCaseEarlyDepartureStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="employeeSalarySettingData.employeeBalancePlanNameCurrent"
        :title="$t('balancesPlansName')"
        :imgName="'balances-plans.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="employeeSalarySettingData.employeeAbsencePlanNameCurrent"
        :title="$t('absencePlansName')"
        :imgName="'absence-plans.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="employeeSalarySettingData.employeeAllowancePlanNameCurrent"
        :title="$t('allowancesPlansName')"
        :imgName="'allowances-plans.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          employeeSalarySettingData.employeeMonthAllowancesPlanNameCurrent
        "
        :title="$t('monthAllowancesPlansName')"
        :imgName="'month-allowances-plans.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="employeeSalarySettingData.employeeOverTimePlanNameCurrent"
        :title="$t('overTimePlansName')"
        :imgName="'overtime-plans.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="employeeSalarySettingData.employeeSalarySettingNotes"
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
  getTimeFormatInMinSec,
} from "@/utils/functions";

export default {
  name: "EmployeeSalarySettingInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["employeeSalarySettingData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
    getTimeFormatInMinSec(seconds = "", minutes = "") {
      return getTimeFormatInMinSec(seconds, minutes);
    },
  },
};
</script>

<style scoped lang="scss"></style>
