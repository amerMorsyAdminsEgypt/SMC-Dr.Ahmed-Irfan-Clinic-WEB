<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <EmployeeAttendanceForm
      v-if="!isLoading"
      :employeeData="employeeData"
      :submitName="$t('edit')"
      v-on:addOrUpdateEmployeeAttendance="editAttendanceManuale"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import EmployeeAttendanceForm from "@/components/employeesAttendance/EmployeeAttendanceForm.vue";

export default {
  name: "EmployeeAttendanceEdit",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeAttendanceForm,
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
      attendanceToken: this.$route.params.attendanceToken,
      employeeData: {
        employeeToken: this.$route.params.employeeToken,
        attendedBranchToken: "",
        attendanceTypeToken: "",
        employeeSalaryEffectToken: "",
        calculationMethodTypeToken: "",
        employeeSalaryEffectFeeTypeToken: "",
        employeeSalaryEffectValue: "",
        employeeSalaryEffectFromSettingStatus: false,
        attendedDate: "",
        attendedTime: "",
        attendedNote: "",
        departureDate: "",
        departureTime: "",
        departureNote: "",
      },
    };
  },
  methods: {
    async getEmployeesAttendanceDetails() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesAttendance/GetEmployeesAttendanceDetails?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&attendanceToken=${this.attendanceToken}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          const theData = response.data.employeesAttendanceData;
          this.employeeData = theData;
          this.employeeData.attendedDate = this.date2dash(theData.attendedDate);
          this.employeeData.attendedTime = this.timeTo24(theData.attendedTime);
          this.employeeData.departureDate = this.date2dash(
            theData.departureDate
          );
          this.employeeData.departureTime = this.timeTo24(
            theData.departureTime
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async editAttendanceManuale() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        employeeToken: this.employeeData.employeeToken,
        attendanceToken: this.attendanceToken,
        attendedBranchToken: this.employeeData.attendedBranchToken,
        attendanceTypeToken: this.employeeData.attendanceTypeToken,
        employeeSalaryEffectToken: this.employeeData.employeeSalaryEffectToken,
        calculationMethodTypeToken:
          this.employeeData.calculationMethodTypeToken,
        employeeSalaryEffectFeeTypeToken:
          this.employeeData.employeeSalaryEffectFeeTypeToken,
        employeeSalaryEffectValue: this.employeeData.employeeSalaryEffectValue,
        employeeSalaryEffectFromSettingStatus:
          this.employeeData.employeeSalaryEffectFromSettingStatus,
        attendedPlaceName: this.$t("addedFromManagment"),
        departurePlaceName: this.employeeData.departureDate
          ? this.$t("addedFromManagment")
          : "",
        attendedDate: this.date2slash(this.employeeData.attendedDate),
        attendedTime: this.timeTo12(this.employeeData.attendedTime),
        attendedNote: this.employeeData.attendedNote,
        departureDate: this.date2slash(this.employeeData.departureDate),
        departureTime: this.timeTo12(this.employeeData.departureTime),
        departureNote: this.employeeData.departureNote,
      };

      try {
        const response = await axios.post(
          `/EmployeesAttendance/UpdateAttendance`,
          data
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push(
            "/attendance-employee/" + this.employeeData.employeeToken
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
    showMsg(msg = "", isSuccess = false) {
      let variant = isSuccess ? "success" : "danger";
      this.$bvToast.toast(`${msg}`, {
        title: this.$t("alert"),
        variant: variant,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 5000,
      });
    },
    date2slash(date) {
      if (date.indexOf("-") > -1) return date.replace(/-/g, "/");
      else return date;
    },
    date2dash(date) {
      if (date.indexOf("/") > -1) return date.replace(/\//g, "-");
      else return date;
    },
    timeTo12(time = "") {
      if (time.length > 1) {
        time = time
          .toString()
          .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? " am" : " pm"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
        time[0] = time[0] < 10 ? "0" + time[0] : time[0];
        time[3] = "";
        return time.join("");
      }
      return time;
    },
    timeTo24(time = "") {
      if (time.length > 1) {
        const [theTime, modifier] = time.split(" ");
        let [hours, minutes] = theTime.split(":");

        if (hours == "12") {
          hours = "00";
        }
        if (modifier == "PM") {
          hours = parseInt(hours, 10) + 12;
        }
        return `${hours}:${minutes}`;
      }
      return time;
    },
  },
  async created() {
    this.getEmployeesAttendanceDetails();
  },
};
</script>

<style scoped lang="scss"></style>
