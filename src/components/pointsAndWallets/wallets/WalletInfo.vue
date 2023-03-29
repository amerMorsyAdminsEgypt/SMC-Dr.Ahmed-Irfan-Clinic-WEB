<template>
  <b-modal id="WalletInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/wallet.svg" class="icon-lg" />
        {{ $t("pointsAndWallets.wallets.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="walletData.clientNameCurrent"
        :title="$t('clientName')"
        :imgName="'clients.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="walletData.walletTransactionCode"
        :title="$t('pointsAndWallets.wallets.code')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="walletData.methodPaidNameCurrent"
        :title="$t('paymentMethod')"
        :imgName="'payment-method.svg'"
      />
      <DataLabelGroup
        v-if="language == 'ar'"
        :className="'col-lg-6'"
        :value="walletData.walletTransactionTypeNameAr"
        :title="$t('operationType')"
        :imgName="'treasuries.svg'"
      />
      <DataLabelGroup
        v-else-if="language == 'en'"
        :className="'col-lg-6'"
        :value="walletData.walletTransactionTypeNameEn"
        :title="$t('operationType')"
        :imgName="'treasuries.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="moneyFormat(walletData.walletTransactionValue)"
        :title="$t('theMoney')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="walletData.treasuryNameCurrent"
        :title="$t('treasuryName')"
        :imgName="'treasuries.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="moneyFormat(walletData.walletTransactionNewValue)"
        :title="$t('totalMoney')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="walletData.userMakeActionNameCurrent"
        :title="$t('operationEmployeeName')"
        :imgName="'employees.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="
          formateDateTimeLang(walletData.actionDate, walletData.actionTime)
        "
        :title="$t('actionDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-12'"
        :value="walletData.note"
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
  name: "WalletInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["walletData"],
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
