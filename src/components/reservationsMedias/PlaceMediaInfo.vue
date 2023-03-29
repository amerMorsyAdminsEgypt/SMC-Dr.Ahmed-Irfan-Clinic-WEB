<template>
  <b-modal id="TransactionPointInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/transaction-points.svg" class="icon-lg" />
        {{ $t("transactionPoints.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="transactionPointData.transactionPointsHistoryCode"
        :title="$t('transactionPoints.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="transactionPointData.clientNameCurrent"
        :title="$t('clientName')"
        :imgName="'clients.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="transactionPointData.transactionPointsTypeNameCurrent"
        :title="$t('transactionPoints.type')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="transactionPointData.transactionPointsValue"
        :title="$t('transactionPoints.value')"
        :imgName="'transaction-points.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="transactionPointData.transactionPointsOldValue"
        :title="$t('transactionPoints.oldValue')"
        :imgName="'transaction-points.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="transactionPointData.transactionPointsNewValue"
        :title="$t('transactionPoints.newValue')"
        :imgName="'transaction-points.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="transactionPointData.userMakeActionNameCurrent"
        :title="$t('userMakeAction')"
        :imgName="'employees.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            transactionPointData.actionDate,
            transactionPointData.actionTime
          )
        "
        :title="$t('actionDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="transactionPointData.transactionPointsReasonAr"
        :title="$t('transactionPoints.reasonAr')"
        :imgName="'reason.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="transactionPointData.transactionPointsReasonEn"
        :title="$t('transactionPoints.reasonEn')"
        :imgName="'reason.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="transactionPointData.transactionPointsReasonUnd"
        :title="$t('transactionPoints.reasonUnd')"
        :imgName="'reason.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="transactionPointData.notes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { formateDateTimeLang } from "@/utils/functions";

export default {
  name: "PlaceMediaInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["transactionPointData"],
  methods: {
    formateDateTimeLang(date, time) {
      return formateDateTimeLang(date, time, this.language);
    },
  },
};
</script>

<style scoped lang="scss"></style>
