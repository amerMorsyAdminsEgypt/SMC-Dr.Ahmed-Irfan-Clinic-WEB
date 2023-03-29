<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <EmployeeMovementForm
      v-if="!isLoading"
      :employeeData="employeeData"
      :submitName="$t('edit')"
      v-on:addOrUpdateEmployeeMovement="editEmployeeMovement"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import EmployeeMovementForm from "@/components/employeesMovement/EmployeeMovementForm.vue";

export default {
  name: "EmployeeMovementEdit",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeMovementForm,
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
      movementToken: this.$route.params.movementToken,
      employeeData: {
        moveFromDate: "",
        moveFromTime: "",
        moveFromPlaceName: "",
        moveFromNote: "",
        accessToDate: "",
        accessToTime: "",
        accessToPlaceName: "",
        accessToNote: "",
        kilometerDifference: "",
      },
    };
  },
  methods: {
    async getMovementDetails() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesMovement/GetMovementDetails?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&movementToken=${this.movementToken}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          const theData = response.data.employeesMovementData;
          this.employeeData = theData;
          this.employeeData.moveFromDate = this.date2dash(theData.moveFromDate);
          this.employeeData.moveFromTime = this.timeTo24(theData.moveFromTime);
          this.employeeData.accessToDate = this.date2dash(theData.accessToDate);
          this.employeeData.accessToTime = this.timeTo24(theData.accessToTime);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async editEmployeeMovement() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        attendanceToken: this.attendanceToken,
        movementToken: this.movementToken,
        moveFromDate: this.date2slash(this.employeeData.moveFromDate),
        moveFromTime: this.timeTo12(this.employeeData.moveFromTime),
        moveFromPlaceName: this.employeeData.moveFromPlaceName,
        moveFromNote: this.employeeData.moveFromNote,
        accessToDate: this.date2slash(this.employeeData.accessToDate),
        accessToTime: this.timeTo12(this.employeeData.accessToTime),
        accessToPlaceName: this.employeeData.accessToPlaceName,
        accessToNote: this.employeeData.accessToNote,
        kilometerDifference: this.employeeData.kilometerDifference,
      };

      try {
        const response = await axios.post(
          `/EmployeesMovement//UpdateEmployeeMovement`,
          data
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.employeeData = {
            moveFromDate: "",
            moveFromTime: "",
            moveFromPlaceName: "",
            moveFromNote: "",
            accessToDate: "",
            accessToTime: "",
            accessToPlaceName: "",
            accessToNote: "",
            kilometerDifference: "",
          };
          this.$router.push("/movement-employee/" + this.attendanceToken);
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
    this.getMovementDetails();
  },
};
</script>

<style scoped lang="scss"></style>
