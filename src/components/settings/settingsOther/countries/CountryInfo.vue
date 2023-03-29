<template>
  <b-modal id="CountryInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/country.svg" class="icon-lg" />
        {{ $t("countries.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="countryData.countryNameAr"
        :title="$t('countries.nameAr')"
        :imgName="'country.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="countryData.countryNameEn"
        :title="$t('countries.nameEn')"
        :imgName="'country.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="countryData.countryNameUnd"
        :title="$t('countries.nameUnd')"
        :imgName="'country.svg'"
      />

      <!-- <DataLabelGroup
        :className="'col-lg-6'"
        :value="countryData.countryDescriptionAr"
        :title="$t('countries.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="countryData.countryDescriptionEn"
        :title="$t('countries.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="countryData.countryDescriptionUnd"
        :title="$t('countries.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="
          formateDateDMY(countryData.actionDate) +
          ' ' +
          timeToLang(countryData.actionTime)
        "
        :title="$t('countries.actionDateTime')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="countryData.countryNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      /> -->
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";

export default {
  name: "CountryInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["countryData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  async created() {},
};
</script>

<style scoped lang="scss"></style>
