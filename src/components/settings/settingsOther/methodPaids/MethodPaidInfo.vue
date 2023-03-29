<template>
  <b-modal id="MethodPaidInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/method-paids.svg" class="icon-lg" />
        {{ $t("methodPaidData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="methodPaidData.methodPaidNameAr"
        :title="$t('methodPaidNameAr')"
        :imgName="'method-paids.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="methodPaidData.methodPaidNameEn"
        :title="$t('methodPaidNameEn')"
        :imgName="'method-paids.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="methodPaidData.methodPaidNameUnd"
        :title="$t('methodPaidNameUnd')"
        :imgName="'method-paids.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="methodPaidData.methodPaidNotes"
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
  name: "MethodPaidInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["methodPaidData"],
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
