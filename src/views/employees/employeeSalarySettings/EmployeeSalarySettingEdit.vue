<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <EmployeeSalarySettingForm
      v-if="!isLoading"
      :employeeSalarySettingData="employeeSalarySettingData"
      :submitName="$t('edit')"
      v-on:addOrUpdateEmployeeSalarySetting="updateEmployeeSalarySetting"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import EmployeeSalarySettingForm from "@/components/employees/employeeSalarySettings/EmployeeSalarySettingForm.vue";
import EmployeeSalarySetting from "@/models/employees/employeeSalarySettings/EmployeeSalarySetting";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeeSalarySettingEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeSalarySettingForm,
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
      employeeSalarySettingData: new EmployeeSalarySetting(),
      employeeSalarySettingToken: this.$route.params.employeeSalarySettingToken,
    };
  },
  methods: {
    async getEmployeeSalarySettingDetails() {
      this.isLoading = true;
      this.employeeSalarySettingData.employeeSalarySettingToken =
        this.employeeSalarySettingToken;
      try {
        let response =
          await this.employeeSalarySettingData.getEmployeeSalarySettingDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.employeeSalarySettingData.fillData(
            response.data.employeeSalarySettingData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.employeeSalarySettingData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeeSalarySettingData = null;
      }
      this.isLoading = false;
    },
    async updateEmployeeSalarySetting() {
      this.isLoading = true;
      try {
        let response =
          await this.employeeSalarySettingData.addOrUpdateEmployeeSalarySetting(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push(
            "/employee-salary-settings/" +
              this.employeeSalarySettingData.employeeToken
          );
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
    this.getEmployeeSalarySettingDetails();
  },
};
</script>

<style scoped lang="scss"></style>
