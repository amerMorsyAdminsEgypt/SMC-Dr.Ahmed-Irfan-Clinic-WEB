<template>
  <div v-if="employeesMovementData" class="">
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
            <th rowspan="3">{{ $t("kilometerDifference") }}</th>
            <th rowspan="3">{{ $t("userMakeAction") }}</th>
            <th colspan="6">{{ $t("moveFrom") }}</th>
            <th colspan="6">{{ $t("accessTo") }}</th>
            <th rowspan="3">{{ $t("edit") }}</th>
            <th rowspan="3">{{ $t("delete") }}</th>
            <th rowspan="3">{{ $t("media") }}</th>
          </tr>
          <tr>
            <th rowspan="2">{{ $t("date") }}</th>
            <th rowspan="2">{{ $t("time") }}</th>
            <th rowspan="2">{{ $t("placeName") }}</th>
            <th rowspan="2">{{ $t("notes") }}</th>
            <th colspan="2">{{ $t("mockLocationStatus") }}</th>
            <th rowspan="2">{{ $t("date") }}</th>
            <th rowspan="2">{{ $t("time") }}</th>
            <th rowspan="2">{{ $t("placeName") }}</th>
            <th rowspan="2">{{ $t("notes") }}</th>
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
          <tr
            v-for="(employee, index) in employeesMovementData"
            :key="employee.movementToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ employee.kilometerDifference }}</td>
            <td>
              {{
                setDataMultiLang(
                  language,
                  employee.addedByUserNameAr,
                  employee.addedByUserNameEn
                )
              }}
            </td>
            <td>{{ employee.moveFromDate }}</td>
            <td>
              {{
                setDataMultiLang(
                  language,
                  timeE2A(employee.moveFromTime),
                  employee.moveFromTime
                )
              }}
            </td>
            <td>{{ employee.moveFromPlaceName }}</td>
            <td>
              {{
                employee.moveFromNote ? employee.moveFromNote : $t("notFound")
              }}
            </td>
            <td>
              {{ employee.moveFromMockLocationStatus ? $t("yes") : $t("no") }}
            </td>
            <td>
              {{
                employee.moveFromMockLocationNote
                  ? employee.moveFromMockLocationNote
                  : $t("notFound")
              }}
            </td>
            <td v-if="employee.accessToDateTime">
              {{ employee.accessToDate }}
            </td>
            <td v-else>{{ $t("notFound") }}</td>
            <td v-if="employee.accessToDateTime">
              {{
                setDataMultiLang(
                  language,
                  timeE2A(employee.accessToTime),
                  employee.accessToTime
                )
              }}
            </td>
            <td v-else>{{ $t("notFound") }}</td>
            <td v-if="employee.accessToDateTime">
              {{ employee.moveFromPlaceName }}
            </td>
            <td v-else>{{ $t("notFound") }}</td>
            <td>
              {{
                employee.accessToNote ? employee.accessToNote : $t("notFound")
              }}
            </td>
            <td>
              {{ employee.accessToMockLocationStatus ? $t("yes") : $t("no") }}
            </td>
            <td>
              {{
                employee.accessToMockLocationNote
                  ? employee.accessToMockLocationNote
                  : $t("notFound")
              }}
            </td>
            <td>
              <router-link
                :to="`/edit-movement-employee/${employee.attendanceToken}/${employee.movementToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.EmployeeMovementDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setMovementData(employee)"
              >
                <img src="@/assets/images/trash.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/employee-movement-media/${employee.movementToken}`"
                :title="$t('media')"
              >
                <img src="@/assets/images/media.svg" class="icon-lg" />
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
  name: "EmployeeMovementTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["employeesMovementData", "employeeData"],
  methods: {
    setMovementData(employee) {
      this.$emit("setMovementData", employee);
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
