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
        addMonthAllowancesPlansSlidesDetails
      "
      :submitName="$t('add')"
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
  name: "MonthAllowancesPlanDetailsAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MonthAllowancesPlanDetailsForm,
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
      monthAllowancesPlansSlideDetailsData:
        new MonthAllowancesPlansSlideDetails(),
      monthAllowancesPlansToken: this.$route.params.monthAllowancesPlansToken,
    };
  },
  methods: {
    async addMonthAllowancesPlansSlidesDetails() {
      this.isLoading = true;
      this.monthAllowancesPlansSlideDetailsData.monthAllowancesPlansToken =
        this.monthAllowancesPlansToken;
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
    this.monthAllowancesPlansSlideDetailsData.monthAllowancesPlansToken =
      this.monthAllowancesPlansToken;
  },
};
</script>

<style scoped lang="scss"></style>
