<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <OfficialHolidayForm
      v-if="!isLoading"
      :officialHolidayData="officialHolidayData"
      :submitName="$t('edit')"
      v-on:addOrUpdateOfficialHoliday="updateOfficialHoliday"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import { date2dash } from "@/utils/functions";
import OfficialHolidayForm from "@/components/settings/settingsSalary/officialHolidays/OfficialHolidayForm.vue";
import OfficialHoliday from "@/models/settings/settingsSalary/officialHolidays/OfficialHoliday";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OfficialHolidayEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficialHolidayForm,
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
      officialHolidayData: new OfficialHoliday(),
      officialHolidayToken: this.$route.params.officialHolidayToken,
    };
  },
  methods: {
    async getOfficialHolidayDetails() {
      this.isLoading = true;
      this.officialHolidayData.officialHolidayToken = this.officialHolidayToken;
      try {
        let response = await this.officialHolidayData.getOfficialHolidayDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.officialHolidayData.fillData(response.data.officialHolidayData);
          this.officialHolidayData.officialHolidayStartDate = date2dash(
            this.officialHolidayData.officialHolidayStartDate
          );
          this.officialHolidayData.officialHolidayEndDate = date2dash(
            this.officialHolidayData.officialHolidayEndDate
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.officialHolidayData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.officialHolidayData = null;
      }
      this.isLoading = false;
    },
    async updateOfficialHoliday() {
      this.isLoading = true;
      try {
        let response =
          await this.officialHolidayData.addOrUpdateOfficialHoliday(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/official-holidays");
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
    this.getOfficialHolidayDetails();
  },
};
</script>

<style scoped lang="scss"></style>
