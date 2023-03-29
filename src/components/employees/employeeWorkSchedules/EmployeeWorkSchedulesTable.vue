<template>
  <div v-if="employeeWorkSchedulesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("workScheduleCode") }}</th>
            <th>{{ $t("employeeName") }}</th>
            <th>{{ $t("workPlanName") }}</th>
            <th>{{ $t("workPlanDetails") }}</th>
            <th>{{ $t("activationStartDate") }}</th>
            <th>{{ $t("activationEndDate") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(workSchedule, index) in employeeWorkSchedulesData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(workSchedule.employeeWorkScheduleCode) }}</td>
            <td>{{ isDataExist(workSchedule.employeeNameCurrent) }}</td>
            <td>
              {{ isDataExist(workSchedule.workPlanNameCurrent) }}
            </td>
            <td>
              <router-link
                :to="`/work-plan-days/${workSchedule.workPlanToken}`"
                :title="$t('info')"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              {{ isDataExist(workSchedule.employeeWorkScheduleActiveStart) }}
            </td>
            <td>
              {{ isDataExist(workSchedule.employeeWorkScheduleActiveEnd) }}
            </td>
            <td>{{ timeToLang(workSchedule.actionDateTime) }}</td>
            <td>{{ isDataExist(workSchedule.employeeWorkScheduleNotes) }}</td>
            <td>
              <button
                v-b-modal.EmployeeWorkScheduleDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setEmployeeWorkScheduleData(workSchedule)"
              >
                <img src="@/assets/images/trash.svg" class="icon-lg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "EmployeeWorkSchedulesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["employeeWorkSchedulesData", "employeeWorkScheduleData"],
  methods: {
    setEmployeeWorkScheduleData(employeeWorkScheduleData) {
      this.$emit("setEmployeeWorkScheduleData", employeeWorkScheduleData);
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
