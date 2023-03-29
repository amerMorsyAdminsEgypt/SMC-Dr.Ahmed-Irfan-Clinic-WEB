<template>
  <b-modal id="BodyAnatomyInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/anatomy.svg" class="icon-lg" />
        {{ $t("bodyAnatomies.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyData.generalSpecialtyNameCurrent"
        :title="$t('generalSpecialtyName')"
        :imgName="'general-specialities.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyData.specialSpecialtyNameCurrent"
        :title="$t('specialSpecialtyName')"
        :imgName="'special-spcialities.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyData.bodyAnatomyTypeNameCurrent"
        :title="$t('bodyAnatomyTypes.name')"
        :imgName="'anatomy-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyData.bodyAnatomyNameCurrent"
        :title="$t('bodyAnatomies.name')"
        :imgName="'anatomy.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyData.bodyAnatomyNameAr"
        :title="$t('bodyAnatomies.nameAr')"
        :imgName="'anatomy.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyData.bodyAnatomyNameEn"
        :title="$t('bodyAnatomies.nameEn')"
        :imgName="'anatomy.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyData.bodyAnatomyNameUnd"
        :title="$t('bodyAnatomies.nameUnd')"
        :imgName="'anatomy.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyData.bodyAnatomyDescriptionAr"
        :title="$t('bodyAnatomies.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyData.bodyAnatomyDescriptionEn"
        :title="$t('bodyAnatomies.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bodyAnatomyData.bodyAnatomyDescriptionUnd"
        :title="$t('bodyAnatomies.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="bodyAnatomyData.bodyAnatomyNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";
import i18n from "@/i18n/index.js";

export default {
  name: "BodyAnatomyInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["bodyAnatomyData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
    status(s) {
      if (s) {
        return i18n.t("activeOfferStatus");
      }
      return i18n.t("disActiveOfferStatus");
    },
  },
};
</script>

<style scoped lang="scss"></style>
