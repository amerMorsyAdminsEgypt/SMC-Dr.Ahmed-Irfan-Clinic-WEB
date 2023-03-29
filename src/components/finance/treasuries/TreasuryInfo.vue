<template>
  <b-modal id="StoreInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/stores.svg" class="icon-lg" />
        {{ $t("storeData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.storeNameAr"
        :title="$t('storeNameAr')"
        :imgName="'stores.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.storeNameEn"
        :title="$t('storeNameEn')"
        :imgName="'stores.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.storeNameUnd"
        :title="$t('storeNameUnd')"
        :imgName="'stores.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.storeMangareEmployeeNameCurrent"
        :title="$t('theManager')"
        :imgName="'man.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.countryNameCurrent"
        :title="$t('theCountry')"
        :imgName="'country.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.governateNameCurrent"
        :title="$t('theGovernate')"
        :imgName="'governate.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.cityNameCurrent"
        :title="$t('theCity')"
        :imgName="'city.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.districtNameCurrent"
        :title="$t('theDistrict')"
        :imgName="'district.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.storeAddressAr"
        :title="$t('addressAr')"
        :imgName="'address.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.storeAddressEn"
        :title="$t('addressEn')"
        :imgName="'address.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.storeAddressUnd"
        :title="$t('addressUnd')"
        :imgName="'address.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.storeFirstPhoneWithCC"
        :title="$t('phone1')"
        :imgName="'phone.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.storeSecondPhoneWithCC"
        :title="$t('phone2')"
        :imgName="'phone.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.storeLandLineWithCC"
        :title="$t('phoneLandline')"
        :imgName="'phone-landline.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="`${storeData.storeLatitude}, ${storeData.storeLongitude}`"
        :title="$t('locationCoordinates')"
        :imgName="'location.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="`${storeData.storeEndLatitude}, ${storeData.storeEndLongitude}`"
        :title="$t('locationCoordinatesNearestPoint')"
        :imgName="'location.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.storeDistance"
        :title="$t('distance')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="storeData.storeNotes"
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
  name: "TreasuryInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["storeData"],
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
