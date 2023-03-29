<template>
  <b-modal id="ScientificDegreeInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/scientific-degrees.svg" class="icon-lg" />
        {{ $t("scientificDegreeData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="scientificDegreeData.scientificDegreeNameAr"
        :title="$t('scientificDegreeNameAr')"
        :imgName="'scientific-degrees.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="scientificDegreeData.scientificDegreeNameEn"
        :title="$t('scientificDegreeNameEn')"
        :imgName="'scientific-degrees.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="scientificDegreeData.scientificDegreeNameUnd"
        :title="$t('scientificDegreeNameUnd')"
        :imgName="'scientific-degrees.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="scientificDegreeData.scientificDegreeDescriptionAr"
        :title="$t('scientificDegreeDescriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="scientificDegreeData.scientificDegreeDescriptionEn"
        :title="$t('scientificDegreeDescriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="scientificDegreeData.scientificDegreeDescriptionUnd"
        :title="$t('scientificDegreeDescriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="scientificDegreeData.scientificDegreeNotes"
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
  name: "ScientificDegreeInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["scientificDegreeData"],
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
