<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <AllowanceForm
      v-if="!isLoading"
      :allowanceData="allowanceData"
      :submitName="$t('add')"
      v-on:addOrUpdateAllowance="addAllowance"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import AllowanceForm from "@/components/settings/settingsSalary/allowances/AllowanceForm.vue";
import Allowance from "@/models/settings/settingsSalary/allowances/Allowance";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "AllowanceAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AllowanceForm,
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
      allowanceData: new Allowance(),
    };
  },
  methods: {
    async addAllowance() {
      this.isLoading = true;
      try {
        let response = await this.allowanceData.addOrUpdateAllowance(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.allowanceData.setInitialValue();
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
