<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <EmployeeSalarySettingForm
      v-if="!isLoading"
      :employeeSalarySettingData="employeeSalarySettingData"
      :submitName="$t('add')"
      v-on:addOrUpdateEmployeeSalarySetting="addEmployeeSalarySetting"
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
  name: "EmployeeSalarySettingAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeSalarySettingForm,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      employeeSalarySettingData: new EmployeeSalarySetting(),
    };
  },
  methods: {
    async addEmployeeSalarySetting() {
      this.isLoading = true;
      try {
        let response =
          await this.employeeSalarySettingData.addOrUpdateEmployeeSalarySetting(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.employeeSalarySettingData.setInitialValue();
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
  computed: {},
  async created() {},
};
</script>

<style scoped lang="scss"></style>
