<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <InsurancesPlanDetailsForm
      v-if="!isLoading"
      :insurancesPlansSlideDetailsData="insurancesPlansSlideDetailsData"
      v-on:addOrUpdateInsurancesPlansSlidesDetails="
        addInsurancesPlansSlidesDetails
      "
      :submitName="$t('add')"
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
  name: "InsurancesPlanDetailsAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    InsurancesPlanDetailsForm,
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
      insurancesPlansSlideDetailsData: new InsurancesPlansSlideDetails(),
      insurancesPlansToken: this.$route.params.insurancesPlansToken,
    };
  },
  methods: {
    async addInsurancesPlansSlidesDetails() {
      this.isLoading = true;
      this.insurancesPlansSlideDetailsData.insurancesPlansToken =
        this.insurancesPlansToken;
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
    this.insurancesPlansSlideDetailsData.insurancesPlansToken =
      this.insurancesPlansToken;
  },
};
</script>

<style scoped lang="scss"></style>
