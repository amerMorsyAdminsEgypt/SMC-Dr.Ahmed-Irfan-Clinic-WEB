<template>
  <div v-if="employeeOfficialHolidaysPlansData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("employeeOfficialHolidaysPlansCode") }}</th>
            <th>{{ $t("employeeName") }}</th>
            <th>{{ $t("officialHolidaysPlansName") }}</th>
            <th>{{ $t("officialHolidaysPlanDetails") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              officialHoliday, index
            ) in employeeOfficialHolidaysPlansData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{
                isDataExist(officialHoliday.employeeOfficialHolidaysPlansCode)
              }}
            </td>
            <td>{{ isDataExist(officialHoliday.employeeNameCurrent) }}</td>
            <td>
              {{
                isDataExist(officialHoliday.officialHolidaysPlansNameCurrent)
              }}
            </td>
            <td>
              <router-link
                :to="`/official-holidays-plan-details/${officialHoliday.officialHolidaysPlansToken}`"
                :title="$t('info')"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>{{ timeToLang(officialHoliday.actionDateTime) }}</td>
            <td>
              {{
                isDataExist(officialHoliday.employeeOfficialHolidaysPlansNotes)
              }}
            </td>
            <td>
              <button
                v-b-modal.EmployeeOfficialHolidaysPlanDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setEmployeeOfficialHolidaysPlanData(officialHoliday)"
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
  name: "EmployeeOfficialHolidaysPlansTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: [
    "employeeOfficialHolidaysPlansData",
    "employeeOfficialHolidaysPlanData",
  ],
  methods: {
    setEmployeeOfficialHolidaysPlanData(employeeOfficialHolidaysPlanData) {
      this.$emit(
        "setEmployeeOfficialHolidaysPlanData",
        employeeOfficialHolidaysPlanData
      );
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
