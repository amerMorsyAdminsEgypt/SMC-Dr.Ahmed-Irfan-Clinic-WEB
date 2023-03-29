<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BalancesPlanDetailsForm
      v-if="!isLoading"
      :balancesPlansSlideDetailsData="balancesPlansSlideDetailsData"
      v-on:addOrUpdateBalancesPlansSlidesDetails="
        updateBalancesPlansSlidesDetails
      "
      :submitName="$t('edit')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import BalancesPlanDetailsForm from "@/components/settings/settingsSalary/balancesPlans/BalancesPlanDetailsForm.vue";
import BalancesPlansSlideDetails from "@/models/settings/settingsSalary/balancesPlans/BalancesPlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BalancesPlanDetailsEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BalancesPlanDetailsForm,
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
      balancesPlansSlideDetailsData: new BalancesPlansSlideDetails(),
      balancesPlansSlidesDetailsToken:
        this.$route.params.balancesPlansSlidesDetailsToken,
    };
  },
  methods: {
    async getBalancesPlansSlidesDetailsDetails() {
      this.isLoading = true;
      this.balancesPlansSlideDetailsData.balancesPlansSlidesDetailsToken =
        this.balancesPlansSlidesDetailsToken;
      try {
        let response =
          await this.balancesPlansSlideDetailsData.getBalancesPlansSlidesDetailsDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.balancesPlansSlideDetailsData.fillData(
            response.data.balancesPlansSlidesDetailsData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.balancesPlansSlideDetailsData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.balancesPlansSlideDetailsData = null;
      }
      this.isLoading = false;
    },
    async updateBalancesPlansSlidesDetails() {
      this.isLoading = true;
      try {
        let response =
          await this.balancesPlansSlideDetailsData.addOrUpdateBalancesPlansSlidesDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push(
            "/balances-plan-details/" +
              this.balancesPlansSlideDetailsData.balancesPlansToken
          );
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
    this.getBalancesPlansSlidesDetailsDetails();
  },
};
</script>

<style scoped lang="scss"></style>
