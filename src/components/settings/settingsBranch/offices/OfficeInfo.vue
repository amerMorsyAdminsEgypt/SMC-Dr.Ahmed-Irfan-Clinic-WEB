<template>
  <b-modal id="OfficeInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/office.svg" class="icon-lg" />
        {{ $t("officeData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officeData.branchNameCurrent"
        :title="$t('branchName')"
        :imgName="'branches.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officeData.buildingNameCurrent"
        :title="$t('buildingName')"
        :imgName="'buildings.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officeData.floorNameCurrent"
        :title="$t('floorName')"
        :imgName="'floors.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officeData.chamberNameCurrent"
        :title="$t('chamberName')"
        :imgName="'chambers.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-ar"
        :value="timeToLang(officeData.officeNameAr, 'ar')"
        :title="$t('officeNameAr')"
        :imgName="'office.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-en"
        :value="timeToLang(officeData.officeNameEn, 'en')"
        :title="$t('officeNameEn')"
        :imgName="'office.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officeData.officeNameUnd"
        :title="$t('officeNameUnd')"
        :imgName="'office.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-ar"
        :value="timeToLang(officeData.officeDescriptionAr, 'ar')"
        :title="$t('officeDescriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-en"
        :value="timeToLang(officeData.officeDescriptionEn, 'en')"
        :title="$t('officeDescriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="officeData.officeDescriptionUnd"
        :title="$t('officeDescriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="officeData.officeNotes"
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
  name: "OfficeInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["officeData"],
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
