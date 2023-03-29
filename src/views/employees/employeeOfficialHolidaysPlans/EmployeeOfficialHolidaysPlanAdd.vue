<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <EmployeeOfficialHolidaysPlanForm
      v-if="!isLoading"
      :employeeOfficialHolidaysPlanData="employeeOfficialHolidaysPlanData"
      :submitName="$t('add')"
      v-on:addEmployeeOfficialHolidaysPlans="addEmployeeOfficialHolidaysPlans"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import EmployeeOfficialHolidaysPlanForm from "@/components/employees/employeeOfficialHolidaysPlans/EmployeeOfficialHolidaysPlanForm.vue";
import EmployeeOfficialHolidaysPlan from "@/models/employees/employeeOfficialHolidaysPlans/EmployeeOfficialHolidaysPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeeOfficialHolidaysPlanAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeOfficialHolidaysPlanForm,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      employeeOfficialHolidaysPlanData: new EmployeeOfficialHolidaysPlan(),
    };
  },
  methods: {
    async addEmployeeOfficialHolidaysPlans() {
      this.isLoading = true;
      try {
        let response =
          await this.employeeOfficialHolidaysPlanData.addEmployeeOfficialHolidaysPlans(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.employeeOfficialHolidaysPlanData.setInitialValue();
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
