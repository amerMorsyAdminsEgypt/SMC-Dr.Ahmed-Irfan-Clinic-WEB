<template>
  <div class="flip-card col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="imgSrc" :onerror="`this.src='${defaultImg}'`" alt="Image" />
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="employeeName">{{ employeeName }}</h4>
        </div>
        <span class="employee-status" :class="employeeStatus"></span>
      </div>
      <div class="flip-card-back">
        <div class="flip-card-title-top">
          <h6 class="cut-1line">{{ employeeData.employeeCode }}</h6>
        </div>
        <div class="flip-card-back-icons">
          <button
            v-b-modal.EmployeeInfo
            class="btn p-0"
            :title="$t('info')"
            @click="setEmployeeData"
          >
            <img src="@/assets/images/info.svg" class="icon-lg" />
          </button>
          <router-link
            :to="'/edit-employee/' + employeeData.employeeToken"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
          <button
            v-b-modal.EmployeeDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setEmployeeData"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
          <router-link
            :to="{
              name: 'ServiceResponsibleBonuses',
              params: {
                employeeToken: employeeData.employeeToken,
              },
            }"
            :title="$t('serviceResponsibleBonuses.modelName')"
          >
            <img
              src="@/assets/images/serviceResponsibleBonuse.svg"
              class="icon-lg"
            />
          </router-link>
          <router-link
            :to="{
              name: 'ServicesReservationEmployeeBenefits',
              params: {
                employeeToken: employeeData.employeeToken,
              },
            }"
            :title="$t('servicesReservationEmployeeBenefits.modelName')"
          >
            <img
              src="@/assets/images/servicesReservationEmployeeBenefit.svg"
              class="icon-lg"
            />
          </router-link>
          <!-- <br /> -->
          <!-- <router-link
            :to="'/attendance-employee/' + employeeData.employeeToken"
            :title="$t('attendanceHistory')"
          >
            <img src="@/assets/images/attendance.svg" class="icon-lg" />
          </router-link> -->
          <!-- <router-link
            :to="'/employee-points/' + employeeData.employeeToken"
            :title="$t('points')"
          >
            <img src="@/assets/images/points.svg" class="icon-lg" />
          </router-link> -->
          <!-- <router-link
            :to="'/employee-slices/' + employeeData.employeeToken"
            :title="$t('slices')"
          >
            <img src="@/assets/images/slices.svg" class="icon-lg" />
          </router-link> -->

          <!-- <router-link
            :to="'/employee-salary-settings/' + employeeData.employeeToken"
            :title="$t('EmployeeSalarySetting')"
          >
            <img
              src="@/assets/images/employee-salary-setting.svg"
              class="icon-lg"
            />
          </router-link>
          <router-link
            :to="'/employee-work-schedules/' + employeeData.employeeToken"
            :title="$t('EmployeeWorkSchedule')"
          >
            <img src="@/assets/images/work-schedule.svg" class="icon-lg" />
          </router-link>
          <router-link
            :to="
              '/employee-official-holidays-plans/' + employeeData.employeeToken
            "
            :title="$t('EmployeeOfficialHolidaysPlans')"
          >
            <img src="@/assets/images/holiday.svg" class="icon-lg" />
          </router-link> -->
        </div>
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="employeeName">{{ employeeName }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/user.jpg";

export default {
  name: "EmployeeCard",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG,
    };
  },
  props: ["employeeData"],
  methods: {
    setEmployeeData() {
      this.$emit("setEmployeeData", this.employeeData);
    },
  },
  computed: {
    employeeName: function () {
      return this.language == "ar"
        ? this.employeeData.employeeNameAr
        : this.employeeData.employeeNameEn;
    },
    employeeStatus: function () {
      if (this.employeeData.lastAttendanceStatusToken == "EAS-1")
        return "status-green";
      else if (this.employeeData.lastAttendanceStatusToken == "EAS-2")
        return "status-red";
      else return "status-yellow";
    },
    imgSrc: function () {
      return BASE_URL + this.employeeData.employeeImagePath;
    },
  },
};
</script>

<style lang="scss"></style>
