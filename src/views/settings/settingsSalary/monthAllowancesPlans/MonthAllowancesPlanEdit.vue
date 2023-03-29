<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MonthAllowancesPlanForm
      v-if="!isLoading"
      :monthAllowancesPlanData="monthAllowancesPlanData"
      :submitName="$t('edit')"
      v-on:addOrUpdateMonthAllowancesPlan="updateMonthAllowancesPlan()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MonthAllowancesPlanForm from "@/components/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanForm.vue";
import MonthAllowancesPlan from "@/models/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MonthAllowancesPlanEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MonthAllowancesPlanForm,
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
      monthAllowancesPlanData: new MonthAllowancesPlan(),
      monthAllowancesPlansToken: this.$route.params.monthAllowancesPlansToken,
    };
  },
  methods: {
    async getMonthAllowancesPlanDetails() {
      this.isLoading = true;
      this.monthAllowancesPlanData.monthAllowancesPlansToken =
        this.monthAllowancesPlansToken;
      try {
        let response =
          await this.monthAllowancesPlanData.getMonthAllowancesPlanDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.monthAllowancesPlanData.fillData(
            response.data.monthAllowancesPlansData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.monthAllowancesPlanData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.monthAllowancesPlanData = null;
      }
      this.isLoading = false;
    },
    async updateMonthAllowancesPlan() {
      this.isLoading = true;
      try {
        let response =
          await this.monthAllowancesPlanData.addOrUpdateMonthAllowancesPlan(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/month-allowances-plans/");
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
    this.getMonthAllowancesPlanDetails();
  },
};
</script>

<style scoped lang="scss"></style>
