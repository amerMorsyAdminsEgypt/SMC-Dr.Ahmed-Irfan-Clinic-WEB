<template>
  <div v-if="treasuriesTransactionsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("transactionCode") }}</th>
            <th>{{ $t("transactionSerialNumber") }}</th>
            <th>{{ $t("branchName") }}</th>
            <th>{{ $t("treasuryName") }}</th>
            <th>{{ $t("operationType") }}</th>
            <th>{{ $t("money") }}</th>
            <th>{{ $t("transactionDate") }}</th>
            <th>{{ $t("userMakeAction") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("receipt") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(treasuryTransaction, index) in treasuriesTransactionsData"
            :key="treasuryTransaction.transactionToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(treasuryTransaction.transactionCode) }}</td>
            <td>
              {{ isDataExist(treasuryTransaction.transactionSerialNumber) }}
            </td>
            <td>{{ isDataExist(treasuryTransaction.branchNameCurrent) }}</td>
            <td>{{ isDataExist(treasuryTransaction.treasuryNameCurrent) }}</td>
            <td>
              {{ isDataExist(treasuryTransaction.transactionTypeNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(treasuryTransaction.transactionMoney + $t("EGP"))
              }}
            </td>
            <td>{{ timeToLang(treasuryTransaction.transactionDate) }}</td>
            <td>{{ isDataExist(treasuryTransaction.userNameCurrent) }}</td>
            <td>
              {{
                formateDateTimeLang(
                  treasuryTransaction.actionDate,
                  treasuryTransaction.actionTime
                )
              }}
            </td>
            <td>{{ isDataExist(treasuryTransaction.transactionNote) }}</td>
            <td>
              <button
                v-b-modal.TreasuryTransactionReceipt
                class="btn p-0"
                :title="$t('receipt')"
                @click="setTransactionData(treasuryTransaction)"
              >
                <img src="@/assets/images/receipt.svg" class="icon-lg" />
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
  formateDateTimeLang,
} from "@/utils/functions";

export default {
  name: "TreasuriesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["treasuriesTransactionsData"],
  methods: {
    setTransactionData(treasuryTransaction) {
      this.$emit("setTransactionData", treasuryTransaction);
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
    formateDateTimeLang(date, time) {
      return formateDateTimeLang(date, time, this.language);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
