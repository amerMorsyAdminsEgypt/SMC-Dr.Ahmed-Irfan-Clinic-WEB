<template>
  <div v-if="walletsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("clientName") }}</th>
            <th>{{ $t("operationType") }}</th>
            <th>{{ $t("theMoney") }}</th>
            <th>{{ $t("treasuryName") }}</th>
            <th>{{ $t("totalMoney") }}</th>
            <th>{{ $t("operationEmployeeName") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(wallet, index) in walletsData" :key="index">
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(wallet.clientNameCurrent) }}</td>
            <td v-if="language === 'ar'">
              {{ isDataExist(wallet.walletTransactionTypeNameAr) }}
            </td>
            <td v-else-if="language === 'en'">
              {{ isDataExist(wallet.walletTransactionTypeNameEn) }}
            </td>
            <!-- <td>{{ isDataExist(wallet.walletTransactionTypeNameCurrent) }}</td> -->
            <td>{{ moneyFormat(wallet.walletTransactionValue) }}</td>
            <td>{{ isDataExist(wallet.treasuryNameCurrent) }}</td>
            <td>{{ moneyFormat(wallet.walletTransactionNewValue) }}</td>
            <td>{{ isDataExist(wallet.userMakeActionNameCurrent) }}</td>
            <td>
              {{ formateDateTimeLang(wallet.actionDate, wallet.actionTime) }}
            </td>
            <td>{{ isDataExist(wallet.notes) }}</td>
            <td>
              <button
                v-b-modal.WalletInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setWalletData(wallet)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
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
  formateDateTimeLang,
} from "@/utils/functions";

export default {
  name: "WalletsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["walletsData", "walletData"],
  methods: {
    setWalletData(walletData) {
      this.$emit("setWalletData", walletData);
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
    formateDateTimeLang(date, time) {
      return formateDateTimeLang(date, time, this.language);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
