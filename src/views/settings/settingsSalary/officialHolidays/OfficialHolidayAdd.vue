<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <OfficialHolidayForm
      v-if="!isLoading"
      :officialHolidayData="officialHolidayData"
      :submitName="$t('add')"
      v-on:addOrUpdateOfficialHoliday="addOfficialHoliday"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import OfficialHolidayForm from "@/components/settings/settingsSalary/officialHolidays/OfficialHolidayForm.vue";
import OfficialHoliday from "@/models/settings/settingsSalary/officialHolidays/OfficialHoliday";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OfficialHolidayAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficialHolidayForm,
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
      officialHolidayData: new OfficialHoliday(),
    };
  },
  methods: {
    async addOfficialHoliday() {
      this.isLoading = true;
      try {
        let response =
          await this.officialHolidayData.addOrUpdateOfficialHoliday(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.officialHolidayData.setInitialValue();
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
  async created() {},
};
</script>

<style scoped lang="scss"></style>
