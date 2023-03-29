<template>
  <b-modal id="InsuranceCompanyInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/insurance-companies.svg" class="icon-lg" />
        {{ $t("insuranceCompanies.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompanyData.insuranceCompanyNameAr"
        :title="$t('insuranceCompanies.nameAr')"
        :imgName="'insurance-companies.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompanyData.insuranceCompanyNameEn"
        :title="$t('insuranceCompanies.nameEn')"
        :imgName="'insurance-companies.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompanyData.insuranceCompanyNameUnd"
        :title="$t('insuranceCompanies.nameUnd')"
        :imgName="'insurance-companies.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompanyData.insuranceCompanyAddressAr"
        :title="$t('insuranceCompanies.addressAr')"
        :imgName="'address.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompanyData.insuranceCompanyAddressEn"
        :title="$t('insuranceCompanies.addressEn')"
        :imgName="'address.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompanyData.insuranceCompanyAddressUnd"
        :title="$t('insuranceCompanies.addressUnd')"
        :imgName="'address.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompanyData.insuranceCompanyPhone"
        :title="$t('insuranceCompanies.phone')"
        :imgName="'phone.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompanyData.insuranceCompanyDescriptionAr"
        :title="$t('insuranceCompanies.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompanyData.insuranceCompanyDescriptionEn"
        :title="$t('insuranceCompanies.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompanyData.insuranceCompanyDescriptionUnd"
        :title="$t('insuranceCompanies.descriptionUnd')"
        :imgName="'description.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";

export default {
  name: "InsuranceCompanyInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["insuranceCompanyData"],
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
