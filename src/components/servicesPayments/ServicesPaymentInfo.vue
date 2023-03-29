<template>
  <b-modal id="ServicesPaymentInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/services-payments.svg" class="icon-lg" />
        {{ $t("paymentData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="paymentData.clientCode"
        :title="$t('clientCode')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="paymentData.clientNameCurrent"
        :title="$t('clientName')"
        :imgName="'clients.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="paymentData.reservationCode"
        :title="$t('reservationCode')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="paymentData.payEmployeeNameCurrent"
        :title="$t('responsibleOfPaymentTransaction')"
        :imgName="'employees.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="moneyFormat(paymentData.servesActualPrice)"
        :title="$t('reservationPrice')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="moneyFormat(paymentData.paidActual)"
        :title="$t('paidMoney')"
        :imgName="'money.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="paymentData.treasuryNameCurrent"
        :title="$t('treasuryName')"
        :imgName="'treasuries.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="paymentData.methodPaidNameCurrent"
        :title="$t('paymentMethod')"
        :imgName="'payment-method.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="paymentData.serviceNameCurrent"
        :title="$t('serviceName')"
        :imgName="'services.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(paymentData.payDateTime)"
        :title="$t('actionDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="paymentData.payNote"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <div v-if="paymentData.refundStatus === true" class="row">
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="paymentData.refundEmployeeNameCurrent"
          :title="$t('responsibleOfRefund')"
          :imgName="'employees.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="paymentData.refundReasonAr"
          :title="$t('refundReasonAr')"
          :imgName="'reason.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="paymentData.refundReasonEn"
          :title="$t('refundReasonEn')"
          :imgName="'reason.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="paymentData.refundReasonUnd"
          :title="$t('refundReasonUnd')"
          :imgName="'reason.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-6'"
          :value="timeToLang(paymentData.refundDateTime)"
          :title="$t('dateTimeRefund')"
          :imgName="'dateAndTime.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="paymentData.refundNotes"
          :title="$t('refundNotes')"
          :imgName="'notes.svg'"
        />
      </div>
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang, moneyFormat } from "@/utils/functions";

export default {
  name: "ServicesPaymentInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["paymentData"],
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
  },
};
</script>

<style scoped lang="scss"></style>
