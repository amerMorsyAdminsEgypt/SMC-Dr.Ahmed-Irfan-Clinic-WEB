<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <EmployeesInputSheetAttendanceForm
      v-if="!isLoading"
      :employeesInputSheetAttendanceData="employeesInputSheetAttendanceData"
      :submitName="$t('upload')"
      v-on:addEmployeesInputSheetAttendance="addEmployeesInputSheetAttendance"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import { downloadFileFromServer } from "@/utils/functions";
import EmployeesInputSheetAttendanceForm from "@/components/employees/employeesInputSheetsAttendance/EmployeesInputSheetAttendanceForm.vue";
import EmployeesInputSheetAttendance from "@/models/employees/employeesInputSheetsAttendance/EmployeesInputSheetAttendance";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BranchAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeesInputSheetAttendanceForm,
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
      employeesInputSheetAttendanceData: new EmployeesInputSheetAttendance(),
    };
  },
  methods: {
    async addEmployeesInputSheetAttendance() {
      this.isLoading = true;
      try {
        let response =
          await this.employeesInputSheetAttendanceData.addEmployeesInputSheetAttendance(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.employeesInputSheetAttendanceData.setInitialValue();
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          if (response.data.sheetExptionStatus === true) {
            downloadFileFromServer(
              this.language,
              this.userAuthorizeToken,
              response.data.sheetExptionPath
            );
          }
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
