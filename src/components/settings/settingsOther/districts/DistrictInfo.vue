<template>
  <b-modal id="DistrictInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/district.svg" class="icon-lg" />
        {{ $t("districts.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="districtData.countryNameCurrent"
        :title="$t('countries.name')"
        :imgName="'country.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="districtData.governateNameCurrent"
        :title="$t('governates.name')"
        :imgName="'governate.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="districtData.cityNameCurrent"
        :title="$t('cities.name')"
        :imgName="'city.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="districtData.districtNameAr"
        :title="$t('districts.nameAr')"
        :imgName="'district.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="districtData.districtNameEn"
        :title="$t('districts.nameEn')"
        :imgName="'district.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="districtData.districtNameUnd"
        :title="$t('districts.nameUnd')"
        :imgName="'district.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";

export default {
  name: "DistrictInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["districtData"],
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
