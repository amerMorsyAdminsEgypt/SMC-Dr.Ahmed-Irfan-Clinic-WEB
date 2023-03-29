<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <OfficialHolidaysPlanForm
      v-if="!isLoading"
      :officialHolidaysPlanData="officialHolidaysPlanData"
      :submitName="$t('add')"
      v-on:addOrUpdateOfficialHolidaysPlan="addOfficialHolidaysPlan()"
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
  name: "OfficialHolidaysPlanAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficialHolidaysPlanForm,
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
      officialHolidaysPlanData: new OfficialHolidaysPlan(),
    };
  },
  methods: {
    async addOfficialHolidaysPlan() {
      this.isLoading = true;
      try {
        let response =
          await this.officialHolidaysPlanData.addOrUpdateOfficialHolidaysPlan(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.officialHolidaysPlanData.setInitialValue();
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
};
</script>

<style scoped lang="scss"></style>
