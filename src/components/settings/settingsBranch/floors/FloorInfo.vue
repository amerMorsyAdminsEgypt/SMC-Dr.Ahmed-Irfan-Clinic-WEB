<template>
  <b-modal id="FloorInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/floors.svg" class="icon-lg" />
        {{ $t("floorData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="floorData.branchNameCurrent"
        :title="$t('branchName')"
        :imgName="'branches.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="floorData.buildingNameCurrent"
        :title="$t('buildingName')"
        :imgName="'buildings.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(floorData.floorNameAr, 'ar')"
        :title="$t('floorNameAr')"
        :imgName="'floors.svg'"
        class="font-ar"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(floorData.floorNameEn, 'en')"
        :title="$t('floorNameEn')"
        :imgName="'floors.svg'"
        class="font-en"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="floorData.floorNameUnd"
        :title="$t('floorNameUnd')"
        :imgName="'floors.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(floorData.floorDescriptionAr, 'ar')"
        :title="$t('floorDescriptionAr')"
        :imgName="'description.svg'"
        class="font-ar"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        class="font-en"
        :value="timeToLang(floorData.floorDescriptionEn, 'en')"
        :title="$t('floorDescriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="floorData.floorDescriptionUnd"
        :title="$t('floorDescriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="floorData.floorNotes"
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
  name: "FloorInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["floorData"],
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
