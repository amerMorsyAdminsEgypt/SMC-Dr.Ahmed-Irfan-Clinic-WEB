<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <AllowancesPlanForm
      v-if="!isLoading"
      :allowancesPlanData="allowancesPlanData"
      :submitName="$t('edit')"
      v-on:addOrUpdateAllowancesPlan="updateAllowancesPlan()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import AllowancesPlanForm from "@/components/settings/settingsSalary/allowancesPlans/AllowancesPlanForm.vue";
import AllowancesPlan from "@/models/settings/settingsSalary/allowancesPlans/AllowancesPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "AllowancesPlanEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AllowancesPlanForm,
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
      allowancesPlanData: new AllowancesPlan(),
      allowancesPlansToken: this.$route.params.allowancesPlansToken,
    };
  },
  methods: {
    async getAllowancesPlanDetails() {
      this.isLoading = true;
      this.allowancesPlanData.allowancesPlansToken = this.allowancesPlansToken;
      try {
        let response = await this.allowancesPlanData.getAllowancesPlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.allowancesPlanData.fillData(response.data.allowancesPlansData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.allowancesPlanData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.allowancesPlanData = null;
      }
      this.isLoading = false;
    },
    async updateAllowancesPlan() {
      this.isLoading = true;
      try {
        let response = await this.allowancesPlanData.addOrUpdateAllowancesPlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/allowances-plans/");
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
    this.getAllowancesPlanDetails();
  },
};
</script>

<style scoped lang="scss"></style>
