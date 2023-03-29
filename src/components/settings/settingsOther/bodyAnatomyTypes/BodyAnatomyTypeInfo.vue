<template>
  <b-modal id="BodyAnatomyTypeInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/anatomy-types.svg" class="icon-lg" />
        {{ $t("bodyAnatomyTypes.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyTypeData.bodyAnatomyTypeNameAr"
        :title="$t('bodyAnatomyTypes.nameAr')"
        :imgName="'anatomy-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyTypeData.bodyAnatomyTypeNameEn"
        :title="$t('bodyAnatomyTypes.nameEn')"
        :imgName="'anatomy-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyTypeData.bodyAnatomyTypeNameUnd"
        :title="$t('bodyAnatomyTypes.nameUnd')"
        :imgName="'anatomy-types.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyTypeData.bodyAnatomyTypeDescriptionAr"
        :title="$t('bodyAnatomyTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyTypeData.bodyAnatomyTypeDescriptionEn"
        :title="$t('bodyAnatomyTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyTypeData.bodyAnatomyTypeDescriptionUnd"
        :title="$t('bodyAnatomyTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="bodyAnatomyTypeData.bodyAnatomyTypeNotes"
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
  name: "BodyAnatomyTypeInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["bodyAnatomyTypeData"],
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
