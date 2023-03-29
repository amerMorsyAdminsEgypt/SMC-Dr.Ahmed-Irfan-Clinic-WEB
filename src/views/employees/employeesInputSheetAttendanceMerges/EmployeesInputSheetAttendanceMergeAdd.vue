<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <EmployeesInputSheetAttendanceMergeForm
      v-if="!isLoading"
      :employeesInputSheetAttendanceMergeData="
        employeesInputSheetAttendanceMergeData
      "
      v-on:addEmployeesInputSheetAttendanceMerge="
        addEmployeesInputSheetAttendanceMerge
      "
      :submitName="$t('add')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import EmployeesInputSheetAttendanceMergeForm from "@/components/employees/employeesInputSheetAttendanceMerges/EmployeesInputSheetAttendanceMergeForm.vue";
import EmployeesInputSheetAttendanceMerge from "@/models/employees/employeesInputSheetAttendanceMerges/EmployeesInputSheetAttendanceMerge";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeesInputSheetAttendanceMergeAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeesInputSheetAttendanceMergeForm,
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
      employeesInputSheetAttendanceMergeData:
        new EmployeesInputSheetAttendanceMerge(),
    };
  },
  methods: {
    async addEmployeesInputSheetAttendanceMerge() {
      this.isLoading = true;
      try {
        let response =
          await this.employeesInputSheetAttendanceMergeData.addEmployeesInputSheetAttendanceMerge(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.employeesInputSheetAttendanceMergeData.setInitialValue();
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
