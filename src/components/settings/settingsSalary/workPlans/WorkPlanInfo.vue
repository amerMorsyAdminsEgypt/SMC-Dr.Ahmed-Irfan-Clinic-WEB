<template>
  <b-modal id="WorkPlanInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/work-plans.svg" class="icon-lg" />
        {{ $t("workPlanData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="workPlanData.workPlanCode"
        :title="$t('workPlanCode')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="workPlanData.workPlanNameAr"
        :title="$t('workPlanNameAr')"
        :imgName="'work-plans.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="workPlanData.workPlanNameEn"
        :title="$t('workPlanNameEn')"
        :imgName="'work-plans.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="workPlanData.workPlanNameUnd"
        :title="$t('workPlanNameUnd')"
        :imgName="'work-plans.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(workPlanData.actionDateTime)"
        :title="$t('actionDateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="workPlanData.workPlanNotes"
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
  name: "WorkPlanInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["workPlanData"],
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
