<template>
  <b-modal id="ChamberInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/chambers.svg" class="icon-lg" />
        {{ $t("chamberData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="chamberData.generalSpecialtyNameCurrent"
        :title="$t('generalSpecialtyName')"
        :imgName="'general-specialities.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="chamberData.branchNameCurrent"
        :title="$t('branchName')"
        :imgName="'branches.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="chamberData.buildingNameCurrent"
        :title="$t('buildingName')"
        :imgName="'buildings.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="chamberData.floorNameCurrent"
        :title="$t('floorName')"
        :imgName="'floors.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-en"
        :value="timeToLang(chamberData.chamberNameEn, 'en')"
        :title="$t('chamberNameEn')"
        :imgName="'chambers.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-ar"
        :value="timeToLang(chamberData.chamberNameAr, 'ar')"
        :title="$t('chamberNameAr')"
        :imgName="'chambers.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="chamberData.chamberNameUnd"
        :title="$t('chamberNameUnd')"
        :imgName="'chambers.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-ar"
        :value="timeToLang(chamberData.chamberDescriptionAr, 'ar')"
        :title="$t('chamberDescriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-en"
        :value="timeToLang(chamberData.chamberDescriptionEn, 'en')"
        :title="$t('chamberDescriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="chamberData.chamberDescriptionUnd"
        :title="$t('chamberDescriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="chamberData.chamberNotes"
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
  name: "ChamberInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["chamberData"],
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
