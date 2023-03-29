<template>
  <b-modal id="ServiceInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/services.svg" class="icon-lg" />
        {{ $t("serviceData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.generalSpecialtyNameCurrent"
        :title="$t('generalSpecialtyName')"
        :imgName="'general-specialities.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.specialSpecialtyNameCurrent"
        :title="$t('specialSpecialtyName')"
        :imgName="'special-spcialities.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.serviceTypeNameCurrent"
        :title="$t('serviceTypesName')"
        :imgName="'services-types.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.serviceProvideTypeNameCurrent"
        :title="$t('serviceProvideTypeName')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.serviceNameAr"
        :title="$t('serviceNameAr')"
        :imgName="'services.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.serviceNameEn"
        :title="$t('serviceNameEn')"
        :imgName="'services.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.serviceNameUnd"
        :title="$t('serviceNameUnd')"
        :imgName="'services.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.serviceDescriptionAr"
        :title="$t('serviceDescriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.serviceDescriptionEn"
        :title="$t('serviceDescriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.serviceDescriptionUnd"
        :title="$t('serviceDescriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.servicePrice"
        :title="$t('servicePrice')"
        :imgName="'money.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          serviceData.maxDiscountPercentage > 0
            ? serviceData.maxDiscountPercentage
            : $t('notFound')
        "
        :title="$t('maxDiscountPercentage')"
        :imgName="'maxDiscountPercentage.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          serviceData.serviceTimeWithMinutes > 0
            ? serviceData.serviceTimeWithMinutes
            : $t('notFound')
        "
        :title="$t('serviceTimeWithMinutes')"
        :imgName="'minutes.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.serviceNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          serviceData.serviceReceptionistPercentage > 0
            ? serviceData.serviceReceptionistPercentage
            : $t('notFound')
        "
        :title="$t('serviceReceptionistPercentage')"
        :imgName="'maxDiscountPercentage.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="serviceData.serviceReceptionistValue"
        :title="$t('value')"
        :imgName="'money.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";
import i18n from "@/i18n/index.js";

export default {
  name: "ServiceInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["serviceData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
    status(s) {
      if (s) {
        return i18n.t("activeOfferStatus");
      }
      return i18n.t("disActiveOfferStatus");
    },
  },
};
</script>

<style scoped lang="scss"></style>
