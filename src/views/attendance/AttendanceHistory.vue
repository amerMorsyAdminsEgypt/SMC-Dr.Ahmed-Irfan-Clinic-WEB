<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <AttendanceTables v-if="employeesData" :employeesData="employeesData" />

    <AttendanceFloatBtns
      :typeToken="typeToken"
      :dateSearchFrom="dateSearchFrom"
      :dateSearchTo="dateSearchTo"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import { mapGetters } from "vuex";
import AttendanceTables from "@/components/attendance/AttendanceTables.vue";
import AttendanceFloatBtns from "@/components/attendance/AttendanceFloatBtns.vue";

export default {
  name: "AttendanceHistory",
  components: {
    PreLoader,
    ExceptionWithImg,
    AttendanceTables,
    AttendanceFloatBtns,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      typeToken: "",
      dateSearchFrom: this.getNow(),
      dateSearchTo: this.getNow(),
      employeesData: {},
      employeeData: {},
    };
  },
  methods: {
    search(employeeTypeToken, date) {
      this.typeToken = employeeTypeToken;
      this.dateSearchFrom = date;
      this.getFollowUpEmployeesAttendance();
    },
    async getFollowUpEmployeesAttendance() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesAttendance/GetFollowUpEmployeesAttendanceSpecified?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&dateSearchFrom=${this.dateSearchFrom}&dateSearchTo=${this.dateSearchTo}&filterStatus=true&employeeTypeToken=${this.typeToken}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.employeesData =
            response.data.followUpEmployeesAttendanceSpecified;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesData = null;
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
    getNow: function () {
      var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("/");
    },
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  async created() {
    this.getFollowUpEmployeesAttendance();
  },
};
</script>
