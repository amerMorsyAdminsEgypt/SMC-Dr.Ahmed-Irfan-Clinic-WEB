<template>
  <b-modal id="BuildingInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/buildings.svg" class="icon-lg" />
        {{ $t("buildingData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="buildingData.branchNameCurrent"
        :title="$t('branchName')"
        :imgName="'branches.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="buildingData.buildingNameAr"
        :title="$t('buildingNameAr')"
        :imgName="'buildings.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="buildingData.buildingNameEn"
        :title="$t('buildingNameEn')"
        :imgName="'buildings.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="buildingData.buildingNameUnd"
        :title="$t('buildingNameUnd')"
        :imgName="'buildings.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(buildingData.buildingDescriptionAr)"
        :title="$t('buildingDescriptionAr')"
        :imgName="'description.svg'"
        class="font-ar"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(buildingData.buildingDescriptionEn)"
        :title="$t('buildingDescriptionEn')"
        :imgName="'description.svg'"
        class="font-en"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="buildingData.buildingDescriptionUnd"
        :title="$t('buildingDescriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="buildingData.buildingNotes"
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
  name: "BuildingInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["buildingData"],
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
