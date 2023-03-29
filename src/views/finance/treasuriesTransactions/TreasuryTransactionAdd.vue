<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <TreasuryTransactionForm
      v-if="!isLoading"
      :treasuryTransactionData="treasuryTransactionData"
      :submitName="$t('add')"
      v-on:addTreasuryProcess="addTreasuryProcess"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import TreasuryTransactionForm from "@/components/finance/treasuriesTransactions/TreasuryTransactionForm.vue";
import TreasuryTransaction from "@/models/finance/treasuriesTransactions/TreasuryTransaction";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "TreasuryAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    TreasuryTransactionForm,
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
      treasuryTransactionData: new TreasuryTransaction(),
    };
  },
  methods: {
    async addTreasuryProcess() {
      this.isLoading = true;
      try {
        let response = await this.treasuryTransactionData.addTreasuryProcess(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.treasuryTransactionData.setInitialValue();
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
  },
  async created() {},
};
</script>

<style scoped lang="scss"></style>
