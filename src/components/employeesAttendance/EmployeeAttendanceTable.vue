<template>
  <div v-if="employeesAttendanceData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>{{ $t("employeeCode") }}</th>
            <th>{{ $t("employeeName") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ employeeData.employeeCode }}</td>
            <td>{{ employeeData.employeeName }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th rowspan="3">#</th>
            <th rowspan="3">{{ $t("totalWorkHours") }}</th>
            <th rowspan="3">{{ $t("startWorkTime") }}</th>
            <th rowspan="3">{{ $t("endWorkTime") }}</th>
            <th colspan="9">{{ $t("dataOfStart") }}</th>
            <th colspan="9">{{ $t("dataOfEnd") }}</th>
            <th rowspan="3">{{ $t("edit") }}</th>
            <th rowspan="3">{{ $t("delete") }}</th>
            <th rowspan="3">{{ $t("movement") }}</th>
          </tr>
          <tr>
            <th rowspan="2">{{ $t("date") }}</th>
            <th rowspan="2">{{ $t("time") }}</th>
            <th rowspan="2" class="cell-md">{{ $t("attendedByUserName") }}</th>
            <th rowspan="2">{{ $t("earlyAttendanceHours") }}</th>
            <th rowspan="2">{{ $t("lateAttendanceHours") }}</th>
            <th rowspan="2" class="cell-md">{{ $t("placeName") }}</th>
            <th rowspan="2" class="cell-md">{{ $t("notes") }}</th>
            <th colspan="2">{{ $t("mockLocationStatus") }}</th>
            <th rowspan="2">{{ $t("date") }}</th>
            <th rowspan="2">{{ $t("time") }}</th>
            <th rowspan="2" class="cell-md">{{ $t("departureByUserName") }}</th>
            <th rowspan="2">{{ $t("earlyDepartureHours") }}</th>
            <th rowspan="2">{{ $t("lateDepartureHours") }}</th>
            <th rowspan="2" class="cell-md">{{ $t("placeName") }}</th>
            <th rowspan="2" class="cell-md">{{ $t("notes") }}</th>
            <th colspan="2">{{ $t("mockLocationStatus") }}</th>
          </tr>
          <tr>
            <th>{{ $t("status") }}</th>
            <th>{{ $t("informations") }}</th>
            <th>{{ $t("status") }}</th>
            <th>{{ $t("informations") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employeesAttendanceData" :key="index">
            <td>{{ ++index }}</td>
            <td>{{ employee.totalWorkHours }}</td>
            <td>
              {{
                employee.standardStartWorkTime
                  ? employee.standardStartWorkTime
                  : $t("notFound")
              }}
            </td>
            <td>
              {{
                employee.standardEndWorkTime
                  ? employee.standardEndWorkTime
                  : $t("notFound")
              }}
            </td>
            <td>
              {{
                setDataMultiLang(
                  language,
                  employee.attendedDayNameAr,
                  employee.attendedDayNameEn
                ) +
                " " +
                employee.attendedDate
              }}
            </td>
            <td>
              {{
                setDataMultiLang(
                  language,
                  timeE2A(employee.attendedTime),
                  employee.attendedTime
                )
              }}
            </td>
            <td>
              {{
                setDataMultiLang(
                  language,
                  employee.attendedByUserNameAr,
                  employee.attendedByUserNameEn
                )
              }}
            </td>
            <td>
              {{
                employee.earlyAttendaceWorkingHours
                  ? employee.earlyAttendaceWorkingHours
                  : $t("notFound")
              }}
            </td>
            <td>
              {{
                employee.lateAttendaceWorkingHours
                  ? employee.lateAttendaceWorkingHours
                  : $t("notFound")
              }}
            </td>
            <td>
              {{
                employee.attendedPlaceName
                  ? employee.attendedPlaceName
                  : $t("notFound")
              }}
            </td>
            <td>
              {{
                employee.attendedNote ? employee.attendedNote : $t("notFound")
              }}
            </td>
            <td>
              {{ employee.attendedMockLocationStatus ? $t("yes") : $t("no") }}
            </td>
            <td>
              {{
                employee.attendedMockLocationNote
                  ? employee.attendedMockLocationNote
                  : $t("notFound")
              }}
            </td>
            <td v-if="employee.departureDateTime">
              {{
                setDataMultiLang(
                  language,
                  employee.departureDayNameAr,
                  employee.departureDayNameEn
                ) +
                " " +
                employee.departureDate
              }}
            </td>
            <td v-else>{{ $t("notFound") }}</td>
            <td v-if="employee.departureDateTime">
              {{
                setDataMultiLang(
                  language,
                  timeE2A(employee.departureTime),
                  employee.departureTime
                )
              }}
            </td>
            <td v-else>{{ $t("notFound") }}</td>
            <td v-if="employee.departureDateTime">
              {{
                setDataMultiLang(
                  language,
                  employee.departureByUserNameAr,
                  employee.departureByUserNameEn
                )
              }}
            </td>
            <td v-else>{{ $t("notFound") }}</td>
            <td>
              {{
                employee.earlyDepartureWorkingHours
                  ? employee.earlyDepartureWorkingHours
                  : $t("notFound")
              }}
            </td>
            <td>
              {{
                employee.lateDepartureWorkingHours
                  ? employee.lateDepartureWorkingHours
                  : $t("notFound")
              }}
            </td>
            <td>
              {{
                employee.departurePlaceName
                  ? employee.departurePlaceName
                  : $t("notFound")
              }}
            </td>
            <td>
              {{
                employee.departureNote ? employee.departureNote : $t("notFound")
              }}
            </td>
            <td>
              {{ employee.departureMockLocationStatus ? $t("yes") : $t("no") }}
            </td>
            <td>
              {{
                employee.departureMockLocationNote
                  ? employee.departureMockLocationNote
                  : $t("notFound")
              }}
            </td>
            <td>
              <router-link
                :to="`/edit-attendance-employee/${employee.employeeToken}/${employee.attendanceToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.EmployeeAttendanceDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setAttendanceData(employee)"
              >
                <img src="@/assets/images/trash.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/movement-employee/${employee.attendanceToken}`"
                :title="$t('movement')"
              >
                <img src="@/assets/images/movement.svg" class="icon-lg" />
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttendanceTables",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["employeesAttendanceData", "employeeData"],
  methods: {
    setAttendanceData(employee) {
      this.$emit("setAttendanceData", employee);
    },
    timeE2A(time) {
      if (time.indexOf("AM") > -1) return time.replace("AM", "ص");
      else if (time.indexOf("PM") > -1) return time.replace("PM", "م");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
