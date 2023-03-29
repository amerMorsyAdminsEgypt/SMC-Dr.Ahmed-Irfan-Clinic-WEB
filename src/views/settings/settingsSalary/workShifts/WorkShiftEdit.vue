<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <WorkShiftForm
      v-if="!isLoading"
      :workShiftData="workShiftData"
      :submitName="$t('edit')"
      v-on:addOrUpdateWorkShift="updateWorkShift"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import WorkShiftForm from "@/components/settings/settingsSalary/workShifts/WorkShiftForm.vue";
import WorkShift from "@/models/settings/settingsSalary/workShifts/WorkShift";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "WorkShiftEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    WorkShiftForm,
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
      workShiftData: new WorkShift(),
      workShiftToken: this.$route.params.workShiftToken,
    };
  },
  methods: {
    async getWorkShiftDetails() {
      this.isLoading = true;
      this.workShiftData.workShiftToken = this.workShiftToken;
      try {
        let response = await this.workShiftData.getWorkShiftDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.workShiftData.fillData(response.data.workShiftData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.workShiftData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.workShiftData = null;
      }
      this.isLoading = false;
    },
    async updateWorkShift() {
      this.isLoading = true;
      try {
        let response = await this.workShiftData.addOrUpdateWorkShift(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/work-shifts");
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
    this.getWorkShiftDetails();
  },
};
</script>

<style scoped lang="scss"></style>
