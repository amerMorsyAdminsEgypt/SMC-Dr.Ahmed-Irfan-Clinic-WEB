<template>
  <b-modal id="AddictiveStuffInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/habits.svg" class="icon-lg" />
        {{ $t("addictiveStuffs.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="addictiveStuffData.addictiveStuffTypeNameCurrent"
        :title="$t('type')"
        :imgName="'habits.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="addictiveStuffData.addictiveStuffNameAr"
        :title="$t('nameAr')"
        :imgName="'habits.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="addictiveStuffData.addictiveStuffNameEn"
        :title="$t('nameEn')"
        :imgName="'habits.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="addictiveStuffData.addictiveStuffNameUnd"
        :title="$t('nameUnd')"
        :imgName="'habits.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="addictiveStuffData.addictiveStuffDetailsAr"
        :title="$t('detailsAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="addictiveStuffData.addictiveStuffDetailsEn"
        :title="$t('detailsEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="addictiveStuffData.addictiveStuffDetailsUnd"
        :title="$t('detailsUnd')"
        :imgName="'description.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="addictiveStuffData.addictiveStuffNotes"
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
  name: "AddictiveStuffInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["addictiveStuffData"],
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
