<template>
  <b-modal
    id="InsuranceCompanyServiceInfo"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img
          src="@/assets/images/insuranceCompanyService.svg"
          class="icon-lg"
        />
        {{ $t("info") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="insuranceCompanyServiceData.insuranceCompanyServiceCode"
        :title="$t('code')"
        :imgName="'code.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";

export default {
  name: "InsuranceCompanyServiceInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["insuranceCompanyServiceData"],
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
