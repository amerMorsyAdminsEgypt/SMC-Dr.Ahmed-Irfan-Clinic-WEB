<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <OfficialHolidaysPlanDetailsForm
      v-if="!isLoading"
      :officialHolidaysPlansSlideDetailsData="
        officialHolidaysPlansSlideDetailsData
      "
      v-on:addOrUpdateOfficialHolidaysPlansSlidesDetails="
        addOfficialHolidaysPlansSlidesDetails
      "
      :submitName="$t('add')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import OfficialHolidaysPlanDetailsForm from "@/components/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanDetailsForm.vue";
import OfficialHolidaysPlansSlideDetails from "@/models/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OfficialHolidaysPlanDetailsAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficialHolidaysPlanDetailsForm,
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
      officialHolidaysPlansSlideDetailsData:
        new OfficialHolidaysPlansSlideDetails(),
      officialHolidaysPlansToken: this.$route.params.officialHolidaysPlansToken,
    };
  },
  methods: {
    async addOfficialHolidaysPlansSlidesDetails() {
      this.isLoading = true;
      this.officialHolidaysPlansSlideDetailsData.officialHolidaysPlansToken =
        this.officialHolidaysPlansToken;
      try {
        let response =
          await this.officialHolidaysPlansSlideDetailsData.addOrUpdateOfficialHolidaysPlansSlidesDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push(
            "/official-holidays-plan-details/" +
              this.officialHolidaysPlansSlideDetailsData
                .officialHolidaysPlansToken
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
    this.officialHolidaysPlansSlideDetailsData.officialHolidaysPlansToken =
      this.officialHolidaysPlansToken;
  },
};
</script>

<style scoped lang="scss"></style>
