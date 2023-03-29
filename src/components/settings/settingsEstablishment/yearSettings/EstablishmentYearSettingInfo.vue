<template>
  <b-modal
    id="EstablishmentYearSettingInfo"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img src="@/assets/images/year-settings.svg" class="icon-lg" />
        {{ $t("establishmentYearSettingData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="establishmentYearSettingData.establishmentYearSettingCode"
        :title="$t('establishmentYearSettingCode')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="establishmentYearSettingData.establishmentYearSettingNameAr"
        :title="$t('establishmentYearSettingNameAr')"
        :imgName="'year-settings.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="establishmentYearSettingData.establishmentYearSettingNameEn"
        :title="$t('establishmentYearSettingNameEn')"
        :imgName="'year-settings.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="establishmentYearSettingData.establishmentYearSettingNameUnd"
        :title="$t('establishmentYearSettingNameUnd')"
        :imgName="'year-settings.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="establishmentYearSettingData.employeeYearStart"
        :title="$t('employeeYearStart')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="establishmentYearSettingData.employeeYearEnd"
        :title="$t('employeeYearEnd')"
        :imgName="'date.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="establishmentYearSettingData.financialYearStart"
        :title="$t('financialYearStart')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="establishmentYearSettingData.financialYearEnd"
        :title="$t('financialYearEnd')"
        :imgName="'date.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="establishmentYearSettingData.year"
        :title="$t('year')"
        :imgName="'year.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(establishmentYearSettingData.dateTimeActionAdd)"
        :title="$t('actionDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="establishmentYearSettingData.establishmentYearSettingNote"
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
  name: "EstablishmentYearSettingInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["establishmentYearSettingData"],
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
