<template>
  <b-modal id="CityInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/city.svg" class="icon-lg" />
        {{ $t("cities.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="cityData.countryNameCurrent"
        :title="$t('countries.name')"
        :imgName="'country.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="cityData.governorateNameCurrent"
        :title="$t('governates.name')"
        :imgName="'governate.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="cityData.cityNameAr"
        :title="$t('cities.nameAr')"
        :imgName="'city.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="cityData.cityNameEn"
        :title="$t('cities.nameEn')"
        :imgName="'city.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="cityData.cityNameUnd"
        :title="$t('cities.nameUnd')"
        :imgName="'city.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";

export default {
  name: "CityInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["cityData"],
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
