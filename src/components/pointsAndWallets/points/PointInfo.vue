<template>
  <b-modal id="PointInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/points.svg" class="icon-lg" />
        {{ $t("pointsAndWallets.points.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="pointData.clientNameCurrent"
        :title="$t('clientName')"
        :imgName="'clients.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="pointData.transactionPointsHistoryCode"
        :title="$t('pointsAndWallets.points.code')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="pointData.transactionPointsTypeNameCurrent"
        :title="$t('operationType')"
        :imgName="'points.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="pointData.transactionPointsValue"
        :title="$t('pointsAndWallets.points.points')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="pointData.transactionPointsNewValue"
        :title="$t('pointsAndWallets.points.allPoints')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="pointData.userMakeActionNameCurrent"
        :title="$t('operationEmployeeName')"
        :imgName="'employees.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="pointData.transactionPointsReasonCurrent"
        :title="$t('pointsAndWallets.points.reason')"
        :imgName="'reason.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="formateDateTimeLang(pointData.actionDate, pointData.actionTime)"
        :title="$t('actionDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="pointData.note"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import {
  setDataMultiLang,
  timeToLang,
  moneyFormat,
  formateDateTimeLang,
} from "@/utils/functions";

export default {
  name: "PointInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["pointData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
    moneyFormat(money) {
      return moneyFormat(money);
    },
    formateDateTimeLang(date, time) {
      return formateDateTimeLang(date, time, this.language);
    },
  },
};
</script>

<style scoped lang="scss"></style>
