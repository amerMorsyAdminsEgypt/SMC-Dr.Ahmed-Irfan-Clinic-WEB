<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <AllowanceForm
      v-if="!isLoading"
      :allowanceData="allowanceData"
      :submitName="$t('edit')"
      v-on:addOrUpdateAllowance="updateAllowance"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import { timeTo24 } from "@/utils/functions";
import AllowanceForm from "@/components/settings/settingsSalary/allowances/AllowanceForm.vue";
import Allowance from "@/models/settings/settingsSalary/allowances/Allowance";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "AllowanceEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AllowanceForm,
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
      allowanceData: new Allowance(),
      allowanceToken: this.$route.params.allowanceToken,
    };
  },
  methods: {
    async getAllowanceDetails() {
      this.isLoading = true;
      this.allowanceData.allowanceToken = this.allowanceToken;
      try {
        let response = await this.allowanceData.getAllowanceDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.allowanceData.fillData(response.data.allowanceData);
          this.allowanceData.allowanceTimeFrom = timeTo24(
            this.allowanceData.allowanceTimeFrom
          );
          this.allowanceData.allowanceTimeTo = timeTo24(
            this.allowanceData.allowanceTimeTo
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.allowanceData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.allowanceData = null;
      }
      this.isLoading = false;
    },
    async updateAllowance() {
      this.isLoading = true;
      try {
        let response = await this.allowanceData.addOrUpdateAllowance(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/allowances");
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
    this.getAllowanceDetails();
  },
};
</script>

<style scoped lang="scss"></style>
