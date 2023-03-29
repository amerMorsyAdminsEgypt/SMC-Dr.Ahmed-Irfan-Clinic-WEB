<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <AllowancesPlanDetailsForm
      v-if="!isLoading"
      :allowancesPlansSlideDetailsData="allowancesPlansSlideDetailsData"
      v-on:addOrUpdateAllowancesPlansSlidesDetails="
        addAllowancesPlansSlidesDetails
      "
      :submitName="$t('add')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import AllowancesPlanDetailsForm from "@/components/settings/settingsSalary/allowancesPlans/AllowancesPlanDetailsForm.vue";
import AllowancesPlansSlideDetails from "@/models/settings/settingsSalary/allowancesPlans/AllowancesPlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "AllowancesPlanDetailsAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AllowancesPlanDetailsForm,
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
      allowancesPlansSlideDetailsData: new AllowancesPlansSlideDetails(),
      allowancesPlansToken: this.$route.params.allowancesPlansToken,
    };
  },
  methods: {
    async addAllowancesPlansSlidesDetails() {
      this.isLoading = true;
      this.allowancesPlansSlideDetailsData.allowancesPlansToken =
        this.allowancesPlansToken;
      try {
        let response =
          await this.allowancesPlansSlideDetailsData.addOrUpdateAllowancesPlansSlidesDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push(
            "/allowances-plan-details/" +
              this.allowancesPlansSlideDetailsData.allowancesPlansToken
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
    this.allowancesPlansSlideDetailsData.allowancesPlansToken =
      this.allowancesPlansToken;
  },
};
</script>

<style scoped lang="scss"></style>
