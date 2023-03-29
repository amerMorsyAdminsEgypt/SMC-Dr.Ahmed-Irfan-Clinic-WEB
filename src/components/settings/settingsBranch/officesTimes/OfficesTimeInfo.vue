<template>
  <b-modal id="OfficesTimeInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/time.svg" class="icon-lg" />
        {{ $t("officesTimeData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officesTimeData.branchNameCurrent"
        :title="$t('branchName')"
        :imgName="'branches.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officesTimeData.buildingNameCurrent"
        :title="$t('buildingName')"
        :imgName="'buildings.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officesTimeData.floorNameCurrent"
        :title="$t('floorName')"
        :imgName="'floors.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officesTimeData.chamberNameCurrent"
        :title="$t('chamberName')"
        :imgName="'chambers.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officesTimeData.officeNameCurrent"
        :title="$t('officeName')"
        :imgName="'office.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officesTimeData.generalSpecialtyNameCurrent"
        :title="$t('generalSpecialtyName')"
        :imgName="'general-specialities.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officesTimeData.specialSpecialtyNameCurrent"
        :title="$t('specialSpecialtyName')"
        :imgName="'special-spcialities.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officesTimeData.employeeNameCurrent"
        :title="$t('employeeName')"
        :imgName="'employees.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officesTimeData.employeeJobNameCurrent"
        :title="$t('jobName')"
        :imgName="'jobs.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-ar"
        :value="timeToLang(officesTimeData.timeNameAr, 'ar')"
        :title="$t('timeNameAr')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-en"
        :value="timeToLang(officesTimeData.timeNameEn, 'en')"
        :title="$t('timeNameEn')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officesTimeData.timeNameUnd"
        :title="$t('timeNameUnd')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(officesTimeData.officeOpenTime, language)"
        :title="$t('officeOpenTime')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(officesTimeData.officeCloseTime, language)"
        :title="$t('officeCloseTime')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-ar"
        :value="timeToLang(officesTimeData.dayNameAr, 'ar')"
        :title="$t('dayNameAr')"
        :imgName="'days.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-en"
        :value="timeToLang(officesTimeData.dayNameEn, 'en')"
        :title="$t('dayNameEn')"
        :imgName="'days.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officesTimeData.dayNameUnd"
        :title="$t('dayNameUnd')"
        :imgName="'days.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          officesTimeData.reservationShowStatus === true ? $t('yes') : $t('no')
        "
        :title="$t('reservationShowStatus')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="officesTimeData.officeTimeNotes"
        :title="$t('officeTimeNotes')"
        :imgName="'notes.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";

export default {
  name: "OfficesTimeInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["officesTimeData"],
  methods: {
    timeToLang(time, lang) {
      return timeToLang(time, lang);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
};
</script>

<style scoped lang="scss"></style>
