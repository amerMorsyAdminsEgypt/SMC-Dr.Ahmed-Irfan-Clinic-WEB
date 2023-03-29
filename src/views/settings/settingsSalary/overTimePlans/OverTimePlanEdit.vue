<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <OverTimePlanForm
      v-if="!isLoading"
      :overTimePlanData="overTimePlanData"
      :submitName="$t('edit')"
      v-on:addOrUpdateOverTimePlan="updateOverTimePlan()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import OverTimePlanForm from "@/components/settings/settingsSalary/overTimePlans/OverTimePlanForm.vue";
import OverTimePlan from "@/models/settings/settingsSalary/overTimePlans/OverTimePlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OverTimePlanEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OverTimePlanForm,
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
      overTimePlanData: new OverTimePlan(),
      overTimePlansToken: this.$route.params.overTimePlansToken,
    };
  },
  methods: {
    async getOverTimePlanDetails() {
      this.isLoading = true;
      this.overTimePlanData.overTimePlansToken = this.overTimePlansToken;
      try {
        let response = await this.overTimePlanData.getOverTimePlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.overTimePlanData.fillData(response.data.overTimePlansData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.overTimePlanData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.overTimePlanData = null;
      }
      this.isLoading = false;
    },
    async updateOverTimePlan() {
      this.isLoading = true;
      try {
        let response = await this.overTimePlanData.addOrUpdateOverTimePlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/overtime-plans/");
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
    this.getOverTimePlanDetails();
  },
};
</script>

<style scoped lang="scss"></style>
