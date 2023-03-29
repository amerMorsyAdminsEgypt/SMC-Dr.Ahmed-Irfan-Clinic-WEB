<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <AbsencePlanForm
      v-if="!isLoading"
      :absencePlanData="absencePlanData"
      :submitName="$t('edit')"
      v-on:addOrUpdateAbsencePlan="updateAbsencePlan()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import AbsencePlanForm from "@/components/settings/settingsSalary/absencePlans/AbsencePlanForm.vue";
import AbsencePlan from "@/models/settings/settingsSalary/absencePlans/AbsencePlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "AbsencePlanEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AbsencePlanForm,
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
      absencePlanData: new AbsencePlan(),
      absencePlansToken: this.$route.params.absencePlansToken,
    };
  },
  methods: {
    async getAbsencePlanDetails() {
      this.isLoading = true;
      this.absencePlanData.absencePlansToken = this.absencePlansToken;
      try {
        let response = await this.absencePlanData.getAbsencePlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.absencePlanData.fillData(response.data.absencePlansData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.absencePlanData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.absencePlanData = null;
      }
      this.isLoading = false;
    },
    async updateAbsencePlan() {
      this.isLoading = true;
      try {
        let response = await this.absencePlanData.addOrUpdateAbsencePlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/absence-plans/");
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
    this.getAbsencePlanDetails();
  },
};
</script>

<style scoped lang="scss"></style>
