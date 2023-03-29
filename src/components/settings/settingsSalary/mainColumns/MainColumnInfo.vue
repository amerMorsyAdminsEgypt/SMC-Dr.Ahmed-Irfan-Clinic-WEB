<template>
  <b-modal id="MainColumnInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/main-columns.svg" class="icon-lg" />
        {{ $t("mainColumnData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="mainColumnData.mainColumnNameAr"
        :title="$t('mainColumnNameAr')"
        :imgName="'main-columns.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="mainColumnData.mainColumnNameEn"
        :title="$t('mainColumnNameEn')"
        :imgName="'main-columns.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="mainColumnData.mainColumnNameUnd"
        :title="$t('mainColumnNameUnd')"
        :imgName="'main-columns.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="mainColumnData.mainColumnNote"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="mainColumnData.employeeCodeInOutColumnName"
        :title="$t('employeeCodeInOutColumnName')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          mainColumnData.employeeCodeInOutFindStatus === true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="mainColumnData.branchCodeInOutColumnName"
        :title="$t('branchCodeInOutColumnName')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          mainColumnData.branchCodeInOutFindStatus === true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="mainColumnData.dateTimeInColumnName"
        :title="$t('dateTimeInColumnName')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          mainColumnData.dateTimeInFindStatus === true ? $t('yes') : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-4'"
        :value="mainColumnData.dateInColumnName"
        :title="$t('dateInColumnName')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-4'"
        :value="mainColumnData.timeInColumnName"
        :title="$t('timeInColumnName')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-4'"
        :value="
          mainColumnData.dateTimeSeparatedInFindStatus === true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="mainColumnData.dateTimeOutColumnName"
        :title="$t('dateTimeOutColumnName')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          mainColumnData.dateTimeOutFindStatus === true ? $t('yes') : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-4'"
        :value="mainColumnData.dateOutColumnName"
        :title="$t('dateOutColumnName')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-4'"
        :value="mainColumnData.timeOutColumnName"
        :title="$t('timeOutColumnName')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-4'"
        :value="
          mainColumnData.dateTimeSeparatedOutFindStatus === true
            ? $t('yes')
            : $t('no')
        "
        :title="$t('activationStatus')"
        :imgName="'type.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";

export default {
  name: "MainColumnInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["mainColumnData"],
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
