<template>
  <b-modal
    id="InsurancesPlanDetailsInfo"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img src="@/assets/images/insurances-plans.svg" class="icon-lg" />
        {{ $t("insurancesPlansSlideDetailsData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="insurancesPlansSlideDetailsData.insurancesPlansNameCurrent"
        :title="$t('insurancesPlansName')"
        :imgName="'insurances-plans.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="insurancesPlansSlideDetailsData.planTypeNameCurrent"
        :title="$t('planTypeName')"
        :imgName="'insurances.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="insurancesPlansSlideDetailsData.employeeBasicSalaryFrom"
        :title="$t('employeeBasicSalaryFrom')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="insurancesPlansSlideDetailsData.employeeBasicSalaryTo"
        :title="$t('employeeBasicSalaryTo')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="insurancesPlansSlideDetailsData.employeeBasicSalaryPercentage"
        :title="$t('employeeBasicSalaryPercentage')"
        :imgName="'percentage.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          insurancesPlansSlideDetailsData.employeeBasicSalaryDeductionStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('employeeBasicSalaryDeductionStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="insurancesPlansSlideDetailsData.employeeVariableSalaryFrom"
        :title="$t('employeeVariableSalaryFrom')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="insurancesPlansSlideDetailsData.employeeVariableSalaryTo"
        :title="$t('employeeVariableSalaryTo')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          insurancesPlansSlideDetailsData.employeeVariableSalaryPercentage
        "
        :title="$t('employeeVariableSalaryPercentage')"
        :imgName="'percentage.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          insurancesPlansSlideDetailsData.employeeVariableSalaryDeductionStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('employeeVariableSalaryDeductionStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="insurancesPlansSlideDetailsData.employeeTotalSalaryFrom"
        :title="$t('employeeTotalSalaryFrom')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="insurancesPlansSlideDetailsData.employeeTotalSalaryTo"
        :title="$t('employeeTotalSalaryTo')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="insurancesPlansSlideDetailsData.employeeTotalSalaryPercentage"
        :title="$t('employeeTotalSalaryPercentage')"
        :imgName="'percentage.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          insurancesPlansSlideDetailsData.employeeTotalSalaryDeductionStatus ===
          true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('employeeTotalSalaryDeductionStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="
          insurancesPlansSlideDetailsData.insurancesPlansSlidesDetailsNote
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
  name: "InsurancesPlanDetailsInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["insurancesPlansSlideDetailsData"],
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
