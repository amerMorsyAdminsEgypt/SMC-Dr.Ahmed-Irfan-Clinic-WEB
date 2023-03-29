<template>
  <b-modal id="GovernateInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/governate.svg" class="icon-lg" />
        {{ $t("governates.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="governateData.countryNameCurrent"
        :title="$t('countries.name')"
        :imgName="'country.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="governateData.governateNameAr"
        :title="$t('governates.nameAr')"
        :imgName="'governate.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="governateData.governateNameEn"
        :title="$t('governates.nameEn')"
        :imgName="'governate.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="governateData.governateNameUnd"
        :title="$t('governates.nameUnd')"
        :imgName="'governate.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";
export default {
  name: "GovernateInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["governateData"],
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
