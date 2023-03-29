<template>
  <b-modal id="RequirementInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/requirements.svg" class="icon-lg" />
        {{ $t("requirementData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="requirementData.requirementTypeNameCurrent"
        :title="$t('requirementTypeName')"
        :imgName="'requirement-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="requirementData.requirementNameAr"
        :title="$t('requirementNameAr')"
        :imgName="'requirements.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="requirementData.requirementNameEn"
        :title="$t('requirementNameEn')"
        :imgName="'requirements.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="requirementData.requirementNameUnd"
        :title="$t('requirementNameUnd')"
        :imgName="'requirements.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="requirementData.requirementNote"
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
  name: "RequirementInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["requirementData"],
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
