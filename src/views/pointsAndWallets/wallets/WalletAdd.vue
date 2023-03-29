<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <WalletForm
      v-if="!isLoading"
      :filterWalletData="filterWalletData"
      :submitName="$t('update')"
      v-on:updateWalletTransactions="addWallet"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import WalletForm from "@/components/pointsAndWallets/wallets/WalletForm.vue";
import Wallet from "@/models/pointsAndWallets/wallets/Wallet";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "WalletAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    WalletForm,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      filterWalletData: new Wallet(),
    };
  },
  methods: {
    async addWallet() {
      this.isLoading = true;
      try {
        let response = await this.filterWalletData.updateWalletTransactions(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.filterWalletData.setInitialValue();
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    filter() {
      this.filterWalletData.clientToken = this.$store.getters.wallets
        .clientToken
        ? this.$store.getters.wallets.clientToken
        : "";
    },
  },
  async created() {
    await this.filter();
  },
};
</script>

<style scoped lang="scss"></style>
