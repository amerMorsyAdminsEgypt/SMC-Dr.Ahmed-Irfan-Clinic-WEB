<template>
  <b-modal
    id="EmployeesSettlementInfo"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img src="@/assets/images/info.svg" class="icon-lg" />
        {{ $t("info") }}
      </h3>
    </template>
    <div
      class="my-card"
      v-for="(
        slice, index
      ) in employeeSettlementData.employeeSettlmentCalcolateMoveSlides"
      :key="slice.moveSlidDetailsToken"
    >
      <span class="my-card-title">{{ ++index }}</span>
      <div class="row">
        <DataLabelGroup
          :className="'col-lg-12'"
          :value="
            setDataMultiLang(
              language,
              slice.moveSlidDetailsNameAr,
              slice.moveSlidDetailsNameEn
            )
          "
          :title="$t('sliceName')"
          :imgName="'slices.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-6'"
          :value="slice.actualNumberOfkilometers + $t('KM')"
          :title="$t('actualNumberOfkilometers')"
          :imgName="'kilometer.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="slice.actualPrice + $t('EGP')"
          :title="$t('actualPrice')"
          :imgName="'money.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-6'"
          :value="slice.moveSlidDetailsFrom + $t('KM')"
          :title="$t('sliceStart')"
          :imgName="'kilometer.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="slice.moveSlidDetailsTo + $t('KM')"
          :title="$t('sliceEnd')"
          :imgName="'kilometer2.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-6'"
          :value="slice.moveSlidDifference + $t('KM')"
          :title="$t('difference')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="slice.moveSlidDetailsPrice + $t('EGP')"
          :title="$t('slicePrice')"
          :imgName="'money.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-12'"
          :value="slice.moveSlidDetailsNote"
          :title="$t('notes')"
          :imgName="'notes.svg'"
        />
      </div>
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { timeToLang } from "@/utils/functions";

export default {
  name: "EmployeesSettlementInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["employeeSettlementData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
};
</script>

<style scoped lang="scss"></style>
