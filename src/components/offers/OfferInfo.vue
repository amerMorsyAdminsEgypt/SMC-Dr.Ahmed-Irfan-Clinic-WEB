<template>
  <b-modal id="OfferInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/offers.svg" class="icon-lg" />
        {{ $t("offerData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.serviceNameCurrent"
        :title="$t('serviceName')"
        :imgName="'services.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.offerCode"
        :title="$t('offerCode')"
        :imgName="'points.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.offerTitleAr"
        :title="$t('offerTitleAr')"
        :imgName="'offers.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.offerTitleEn"
        :title="$t('offerTitleEn')"
        :imgName="'offers.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.offerTitleUnd"
        :title="$t('offerTitleUnd')"
        :imgName="'offers.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.offerStartDate"
        :title="$t('offerStartDate')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.offerEndDate"
        :title="$t('offerEndDate')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.offerDuration"
        :title="$t('offerDuration')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.servicePriceInOffer"
        :title="$t('servicePriceInOffer')"
        :imgName="'price.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.offerDescriptionEn"
        :title="$t('offerDescriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.offerDescriptionAr"
        :title="$t('offerDescriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.offerDescriptionUnd"
        :title="$t('offerDescriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="offerData.offerNotes"
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
  name: "OfferInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["offerData"],
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
