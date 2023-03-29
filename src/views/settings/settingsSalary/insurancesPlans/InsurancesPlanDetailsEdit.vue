<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <InsurancesPlanDetailsForm
      v-if="!isLoading"
      :insurancesPlansSlideDetailsData="insurancesPlansSlideDetailsData"
      v-on:addOrUpdateInsurancesPlansSlidesDetails="
        updateInsurancesPlansSlidesDetails
      "
      :submitName="$t('edit')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import InsurancesPlanDetailsForm from "@/components/settings/settingsSalary/insurancesPlans/InsurancesPlanDetailsForm.vue";
import InsurancesPlansSlideDetails from "@/models/settings/settingsSalary/insurancesPlans/InsurancesPlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "InsurancesPlanDetailsEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    InsurancesPlanDetailsForm,
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
      insurancesPlansSlideDetailsData: new InsurancesPlansSlideDetails(),
      insurancesPlansSlidesDetailsToken:
        this.$route.params.insurancesPlansSlidesDetailsToken,
    };
  },
  methods: {
    async getInsurancesPlansSlidesDetailsDetails() {
      this.isLoading = true;
      this.insurancesPlansSlideDetailsData.insurancesPlansSlidesDetailsToken =
        this.insurancesPlansSlidesDetailsToken;
      try {
        let response =
          await this.insurancesPlansSlideDetailsData.getInsurancesPlansSlidesDetailsDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.insurancesPlansSlideDetailsData.fillData(
            response.data.insurancesPlansSlidesDetailsData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.insurancesPlansSlideDetailsData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.insurancesPlansSlideDetailsData = null;
      }
      this.isLoading = false;
    },
    async updateInsurancesPlansSlidesDetails() {
      this.isLoading = true;
      try {
        let response =
          await this.insurancesPlansSlideDetailsData.addOrUpdateInsurancesPlansSlidesDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push(
            "/insurances-plan-details/" +
              this.insurancesPlansSlideDetailsData.insurancesPlansToken
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
    this.getInsurancesPlansSlidesDetailsDetails();
  },
};
</script>

<style scoped lang="scss"></style>
