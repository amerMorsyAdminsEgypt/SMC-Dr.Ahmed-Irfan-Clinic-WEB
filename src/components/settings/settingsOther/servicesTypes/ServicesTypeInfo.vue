<template>
  <b-modal id="ServicesTypeInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/services-types.svg" class="icon-lg" />
        {{ $t("servicesTypeData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="servicesTypeData.serviceTypeNameAr"
        :title="$t('serviceTypeNameAr')"
        :imgName="'services-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="servicesTypeData.serviceTypeNameEn"
        :title="$t('serviceTypeNameEn')"
        :imgName="'services-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="servicesTypeData.serviceTypeNameUnd"
        :title="$t('serviceTypeNameUnd')"
        :imgName="'services-types.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="servicesTypeData.serviceTypeDescriptionAr"
        :title="$t('serviceTypeDescriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="servicesTypeData.serviceTypeDescriptionEn"
        :title="$t('serviceTypeDescriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="servicesTypeData.serviceTypeDescriptionUnd"
        :title="$t('serviceTypeDescriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="servicesTypeData.serviceTypeNotes"
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
  name: "ServicesTypeInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["servicesTypeData"],
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
