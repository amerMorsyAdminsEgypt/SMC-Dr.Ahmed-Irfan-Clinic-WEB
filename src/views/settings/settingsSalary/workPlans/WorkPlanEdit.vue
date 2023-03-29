<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <WorkPlanForm
      v-if="!isLoading"
      :workPlanData="workPlanData"
      :submitName="$t('edit')"
      v-on:addOrUpdateWorkPlan="updateWorkPlan"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import WorkPlanForm from "@/components/settings/settingsSalary/workPlans/WorkPlanForm.vue";
import WorkPlan from "@/models/settings/settingsSalary/workPlans/WorkPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "WorkPlanEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    WorkPlanForm,
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
      workPlanData: new WorkPlan(),
      workPlanToken: this.$route.params.workPlanToken,
    };
  },
  methods: {
    async getWorkPlanDetails() {
      this.isLoading = true;
      this.workPlanData.workPlanToken = this.workPlanToken;
      try {
        let response = await this.workPlanData.getWorkPlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.workPlanData.fillData(response.data.workPlanData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.workPlanData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.workPlanData = null;
      }
      this.isLoading = false;
    },
    async updateWorkPlan() {
      this.isLoading = true;
      try {
        let response = await this.workPlanData.addOrUpdateWorkPlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/work-plans");
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
    this.getWorkPlanDetails();
  },
};
</script>

<style scoped lang="scss"></style>
