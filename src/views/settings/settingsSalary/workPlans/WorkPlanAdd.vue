<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <WorkPlanForm
      v-if="!isLoading"
      :workPlanData="workPlanData"
      :submitName="$t('add')"
      v-on:addOrUpdateWorkPlan="addWorkPlan"
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
  name: "WorkPlanAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    WorkPlanForm,
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
      workPlanData: new WorkPlan(),
    };
  },
  methods: {
    async addWorkPlan() {
      this.isLoading = true;
      try {
        let response = await this.workPlanData.addOrUpdateWorkPlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.workPlanData.setInitialValue();
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
