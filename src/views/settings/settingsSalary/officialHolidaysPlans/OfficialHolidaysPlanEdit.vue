<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <OfficialHolidaysPlanForm
      v-if="!isLoading"
      :officialHolidaysPlanData="officialHolidaysPlanData"
      :submitName="$t('edit')"
      v-on:addOrUpdateOfficialHolidaysPlan="updateOfficialHolidaysPlan()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import OfficialHolidaysPlanForm from "@/components/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanForm.vue";
import OfficialHolidaysPlan from "@/models/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OfficialHolidaysPlanEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficialHolidaysPlanForm,
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
      officialHolidaysPlanData: new OfficialHolidaysPlan(),
      officialHolidaysPlansToken: this.$route.params.officialHolidaysPlansToken,
    };
  },
  methods: {
    async getOfficialHolidaysPlanDetails() {
      this.isLoading = true;
      this.officialHolidaysPlanData.officialHolidaysPlansToken =
        this.officialHolidaysPlansToken;
      try {
        let response =
          await this.officialHolidaysPlanData.getOfficialHolidaysPlanDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.officialHolidaysPlanData.fillData(
            response.data.officialHolidaysPlansData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.officialHolidaysPlanData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.officialHolidaysPlanData = null;
      }
      this.isLoading = false;
    },
    async updateOfficialHolidaysPlan() {
      this.isLoading = true;
      try {
        let response =
          await this.officialHolidaysPlanData.addOrUpdateOfficialHolidaysPlan(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/official-holidays-plans");
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
    this.getOfficialHolidaysPlanDetails();
  },
};
</script>

<style scoped lang="scss"></style>
