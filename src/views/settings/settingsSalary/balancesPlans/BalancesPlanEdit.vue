<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BalancesPlanForm
      v-if="!isLoading"
      :balancesPlanData="balancesPlanData"
      :submitName="$t('edit')"
      v-on:addOrUpdateBalancesPlan="updateBalancesPlan()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import BalancesPlanForm from "@/components/settings/settingsSalary/balancesPlans/BalancesPlanForm.vue";
import BalancesPlan from "@/models/settings/settingsSalary/balancesPlans/BalancesPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BalancesPlanEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BalancesPlanForm,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      balancesPlanData: new BalancesPlan(),
      balancesPlansToken: this.$route.params.balancesPlansToken,
    };
  },
  methods: {
    async getBalancesPlanDetails() {
      this.isLoading = true;
      this.balancesPlanData.balancesPlansToken = this.balancesPlansToken;
      try {
        let response = await this.balancesPlanData.getBalancesPlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.balancesPlanData.fillData(response.data.balancesPlansData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.balancesPlanData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.balancesPlanData = null;
      }
      this.isLoading = false;
    },
    async updateBalancesPlan() {
      this.isLoading = true;
      try {
        let response = await this.balancesPlanData.addOrUpdateBalancesPlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/balances-plans/");
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
  async created() {
    this.getBalancesPlanDetails();
  },
};
</script>

<style scoped lang="scss"></style>
