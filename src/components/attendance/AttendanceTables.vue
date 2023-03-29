<template>
  <div v-if="employeesData" class="">
    <!-- #region employeesAttend -->
    <b-button v-b-toggle.employeesAttend class="btn btn-lg btn-collapse">
      {{ `${$t("employeesAttend")} ( ${employeesData.countAttendEmployees} )` }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse
      v-if="employeesData.countAttendEmployees > 0"
      id="employeesAttend"
      class="table-container"
    >
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("employeeCode") }}</th>
            <th>{{ $t("employeeName") }}</th>
            <th>{{ $t("date") }}</th>
            <th>{{ $t("time") }}</th>
            <th>{{ $t("attendedByUserName") }}</th>
            <th class="cell-md">{{ $t("placeName") }}</th>
            <th class="cell-md">{{ $t("notes") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(employee, index) in employeesData.employeesAttend"
            :key="employee.attendanceToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ employee.employeeCode }}</td>
            <td>
              {{
                language == "ar"
                  ? employee.employeeNameAr
                  : employee.employeeNameEn
              }}
            </td>
            <td>
              {{
                (language == "ar"
                  ? employee.attendedDayNameAr
                  : employee.attendedDayNameEn) +
                " " +
                employee.attendedDate
              }}
            </td>
            <td>
              {{
                language == "ar"
                  ? timeE2A(employee.attendedTime)
                  : employee.attendedTime
              }}
            </td>
            <td>
              {{
                language == "ar"
                  ? employee.attendedByUserNameAr
                  : employee.attendedByUserNameEn
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
          </tr>
        </tbody>
      </table>
    </b-collapse>
    <!-- #endregion employeesAttend -->

    <!-- #region employeesDeparture -->
    <b-button v-b-toggle.employeesDeparture class="btn btn-lg btn-collapse">
      {{
        `${$t("employeesDeparture")} ( ${
          employeesData.countDepartureEmployees
        } ) `
      }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse
      v-if="employeesData.countDepartureEmployees > 0"
      id="employeesDeparture"
      class="table-container"
    >
      <table class="my-table">
        <thead>
          <tr>
            <th rowspan="2">#</th>
            <th rowspan="2">{{ $t("employeeCode") }}</th>
            <th rowspan="2" class="cell-md">{{ $t("employeeName") }}</th>
            <th rowspan="2">{{ $t("totalWorkHours") }}</th>
            <th colspan="5">{{ $t("attendance") }}</th>
            <th colspan="5">{{ $t("departure") }}</th>
          </tr>
          <tr>
            <th>{{ $t("date") }}</th>
            <th>{{ $t("time") }}</th>
            <th class="cell-md">{{ $t("attendedByUserName") }}</th>
            <th class="cell-md">{{ $t("placeName") }}</th>
            <th class="cell-md">{{ $t("notes") }}</th>
            <th>{{ $t("date") }}</th>
            <th>{{ $t("time") }}</th>
            <th class="cell-md">{{ $t("departureByUserName") }}</th>
            <th class="cell-md">{{ $t("placeName") }}</th>
            <th class="cell-md">{{ $t("notes") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(employee, index) in employeesData.employeesDeparture"
            :key="employee.attendanceToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ employee.employeeCode }}</td>
            <td>
              {{
                language == "ar"
                  ? employee.employeeNameAr
                  : employee.employeeNameEn
              }}
            </td>
            <td>{{ employee.totalWorkHours }}</td>
            <td>
              {{
                (language == "ar"
                  ? employee.attendedDayNameAr
                  : employee.attendedDayNameEn) +
                " " +
                employee.attendedDate
              }}
            </td>
            <td>
              {{
                language == "ar"
                  ? timeE2A(employee.attendedTime)
                  : employee.attendedTime
              }}
            </td>
            <td>
              {{
                language == "ar"
                  ? employee.attendedByUserNameAr
                  : employee.attendedByUserNameEn
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
              {{
                (language == "ar"
                  ? employee.departureDayNameAr
                  : employee.departureDayNameEn) +
                " " +
                employee.departureDate
              }}
            </td>
            <td>
              {{
                language == "ar"
                  ? timeE2A(employee.departureTime)
                  : employee.departureTime
              }}
            </td>
            <td>
              {{
                language == "ar"
                  ? employee.departureByUserNameAr
                  : employee.departureByUserNameEn
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
          </tr>
        </tbody>
      </table>
    </b-collapse>
    <!-- #endregion employeesDeparture -->

    <!-- #region employeesUnKnown -->
    <b-button v-b-toggle.employeesUnKnown class="btn btn-lg btn-collapse">
      {{
        `${$t("employeesUnKnown")} ( ${employeesData.countUnKnownEmployees} ) `
      }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse
      v-if="employeesData.countUnKnownEmployees > 0"
      id="employeesUnKnown"
      class="table-container"
    >
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("employeeCode") }}</th>
            <th>{{ $t("employeeName") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(employee, index) in employeesData.employeesUnKnown"
            :key="employee.employeeToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ employee.employeeCode }}</td>
            <td>
              {{
                language == "ar"
                  ? employee.employeeNameAr
                  : employee.employeeNameEn
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </b-collapse>
    <!-- #endregion employeesUnKnown -->
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
  props: ["employeesData"],
  methods: {
    setEmployeeData() {
      this.$emit("setEmployeeData", this.employeeData);
    },
    timeE2A(time) {
      if (time.indexOf("AM") > -1) return time.replace("AM", "ص");
      else if (time.indexOf("PM") > -1) return time.replace("PM", "م");
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
