<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <CalculatePayrollForm
      v-if="!isLoading"
      :calculatePayrollData="calculatePayrollData"
      :submitName="$t('download')"
      v-on:getEmployeePayroll="getEmployeePayroll"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import { downloadFileFromServer } from "@/utils/functions";
import CalculatePayrollForm from "@/components/settings/settingsSalary/calculatePayroll/CalculatePayrollForm.vue";
import CalculatePayroll from "@/models/settings/settingsSalary/calculatePayroll/CalculatePayroll";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "CalculatePayroll",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CalculatePayrollForm,
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
      calculatePayrollData: new CalculatePayroll(),
    };
  },
  methods: {
    async getEmployeePayroll() {
      this.isLoading = true;
      try {
        let response = await this.calculatePayrollData.getEmployeePayroll(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          downloadFileFromServer(
            this.language,
            this.userAuthorizeToken,
            response.data.data
          );
          this.calculatePayrollData.setInitialValue();
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
