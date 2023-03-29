<template>
  <div v-if="paymentsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("reservationCode") }}</th>
            <th>{{ $t("clientName") }}</th>
            <th>{{ $t("paidMoney") }}</th>
            <th>{{ $t("treasuryName") }}</th>
            <th>{{ $t("paymentMethod") }}</th>
            <th>{{ $t("responsibleOfPaymentTransaction") }}</th>
            <th>{{ $t("paymentNotes") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("refundStatus") }}</th>
            <th>{{ $t("receipt") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("refund") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in paymentsData" :key="index">
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(payment.reservationCode) }}</td>
            <td>{{ isDataExist(payment.clientNameCurrent) }}</td>
            <td>{{ moneyFormat(payment.paidActual) }}</td>
            <td>{{ isDataExist(payment.treasuryNameCurrent) }}</td>
            <td>{{ isDataExist(payment.methodPaidNameCurrent) }}</td>
            <td>{{ isDataExist(payment.payEmployeeNameCurrent) }}</td>
            <td>{{ isDataExist(payment.payNote) }}</td>
            <td>{{ timeToLang(payment.payDateTime) }}</td>
            <td>{{ payment.refundStatus === true ? $t("yes") : $t("no") }}</td>
            <td>
              <button
                v-b-modal.ServicesPaymentReceipt
                class="btn p-0"
                :title="$t('receipt')"
                @click="setPaymentData(payment)"
              >
                <img src="@/assets/images/receipt.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <button
                v-b-modal.ServicesPaymentInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setPaymentData(payment)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <span v-if="payment.refundStatus === true">-</span>
              <button
                v-else
                v-b-modal.ServicesPaymentRefund
                class="btn p-0"
                :title="$t('refund')"
                @click="setPaymentData(payment)"
              >
                <img src="@/assets/images/refund.svg" class="icon-lg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  setDataMultiLang,
  timeToLang,
  isDataExist,
  moneyFormat,
} from "@/utils/functions";

export default {
  name: "ServicesPaymentsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["paymentsData", "paymentData"],
  methods: {
    setPaymentData(paymentData) {
      this.$emit("setPaymentData", paymentData);
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
    moneyFormat(money) {
      return moneyFormat(money);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
