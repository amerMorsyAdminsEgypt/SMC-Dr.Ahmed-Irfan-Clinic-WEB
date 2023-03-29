<template>
  <b-modal id="BloodTypeInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/blood-types.svg" class="icon-lg" />
        {{ $t("bloodTypeData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bloodTypeData.bloodTypeNameAr"
        :title="$t('bloodTypeNameAr')"
        :imgName="'blood-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bloodTypeData.bloodTypeNameEn"
        :title="$t('bloodTypeNameEn')"
        :imgName="'blood-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bloodTypeData.bloodTypeNameUnd"
        :title="$t('bloodTypeNameUnd')"
        :imgName="'blood-types.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bloodTypeData.bloodTypeDescriptionAr"
        :title="$t('bloodTypeDescriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bloodTypeData.bloodTypeDescriptionEn"
        :title="$t('bloodTypeDescriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="bloodTypeData.bloodTypeDescriptionUnd"
        :title="$t('bloodTypeDescriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="bloodTypeData.bloodTypeNotes"
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
  name: "BloodTypeInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["bloodTypeData"],
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
