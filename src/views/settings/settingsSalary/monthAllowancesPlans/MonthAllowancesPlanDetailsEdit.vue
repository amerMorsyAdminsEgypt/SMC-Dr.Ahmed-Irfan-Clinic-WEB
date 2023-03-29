<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MonthAllowancesPlanDetailsForm
      v-if="!isLoading"
      :monthAllowancesPlansSlideDetailsData="
        monthAllowancesPlansSlideDetailsData
      "
      v-on:addOrUpdateMonthAllowancesPlansSlidesDetails="
        updateMonthAllowancesPlansSlidesDetails
      "
      :submitName="$t('edit')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MonthAllowancesPlanDetailsForm from "@/components/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanDetailsForm.vue";
import MonthAllowancesPlansSlideDetails from "@/models/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MonthAllowancesPlanDetailsEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MonthAllowancesPlanDetailsForm,
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
      monthAllowancesPlansSlideDetailsData:
        new MonthAllowancesPlansSlideDetails(),
      monthAllowancesPlansSlidesDetailsToken:
        this.$route.params.monthAllowancesPlansSlidesDetailsToken,
    };
  },
  methods: {
    async getMonthAllowancesPlansSlidesDetailsDetails() {
      this.isLoading = true;
      this.monthAllowancesPlansSlideDetailsData.monthAllowancesPlansSlidesDetailsToken =
        this.monthAllowancesPlansSlidesDetailsToken;
      try {
        let response =
          await this.monthAllowancesPlansSlideDetailsData.getMonthAllowancesPlansSlidesDetailsDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.monthAllowancesPlansSlideDetailsData.fillData(
            response.data.monthAllowancesPlansSlidesDetailsData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.monthAllowancesPlansSlideDetailsData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.monthAllowancesPlansSlideDetailsData = null;
      }
      this.isLoading = false;
    },
    async updateMonthAllowancesPlansSlidesDetails() {
      this.isLoading = true;
      try {
        let response =
          await this.monthAllowancesPlansSlideDetailsData.addOrUpdateMonthAllowancesPlansSlidesDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push(
            "/month-allowances-plan-details/" +
              this.monthAllowancesPlansSlideDetailsData
                .monthAllowancesPlansToken
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
    this.getMonthAllowancesPlansSlidesDetailsDetails();
  },
};
</script>

<style scoped lang="scss"></style>
