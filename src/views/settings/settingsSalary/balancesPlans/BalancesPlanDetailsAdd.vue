<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BalancesPlanDetailsForm
      v-if="!isLoading"
      :balancesPlansSlideDetailsData="balancesPlansSlideDetailsData"
      v-on:addOrUpdateBalancesPlansSlidesDetails="addBalancesPlansSlidesDetails"
      :submitName="$t('add')"
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
  name: "BalancesPlanDetailsAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BalancesPlanDetailsForm,
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
      balancesPlansSlideDetailsData: new BalancesPlansSlideDetails(),
      balancesPlansToken: this.$route.params.balancesPlansToken,
    };
  },
  methods: {
    async addBalancesPlansSlidesDetails() {
      this.isLoading = true;
      this.balancesPlansSlideDetailsData.balancesPlansToken =
        this.balancesPlansToken;
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
    this.balancesPlansSlideDetailsData.balancesPlansToken =
      this.balancesPlansToken;
  },
};
</script>

<style scoped lang="scss"></style>
