<template>
  <div v-if="employeesSettlementMovementData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th rowspan="2">#</th>
            <th rowspan="2" v-if="!noEmployeeData">{{ $t("employeeCode") }}</th>
            <th rowspan="2" v-if="!noEmployeeData">{{ $t("employeeName") }}</th>
            <th rowspan="2">{{ $t("year") }}</th>
            <th rowspan="2">{{ $t("month") }}</th>
            <th rowspan="2">{{ $t("totalPoints") }}</th>
            <th rowspan="2">{{ $t("totalKilometer") }}</th>
            <th colspan="6">{{ $t("settlement") }}</th>
            <th rowspan="2">
              {{ $t("settlement") + " / " + $t("cancelSettlement") }}
            </th>
            <th rowspan="2">
              {{ $t("info") }}
            </th>
          </tr>
          <tr>
            <th>{{ $t("settlementStatus") }}</th>
            <th>{{ $t("userMakeAction") }}</th>
            <th>{{ $t("dateTime") }}</th>
            <th>{{ $t("settlementTypeName") }}</th>
            <th>{{ $t("settlementValue") }}</th>
            <th>{{ $t("notes") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              employeesSettlement, index
            ) in employeesSettlementMovementData"
            :key="employeesSettlement.settlementToken"
          >
            <td>{{ ++index }}</td>
            <td v-if="!noEmployeeData">
              {{ employeesSettlement.employeeCode }}
            </td>
            <td v-if="!noEmployeeData">
              {{
                setDataMultiLang(
                  language,
                  employeesSettlement.employeeNameAr,
                  employeesSettlement.employeeNameEn
                )
              }}
            </td>
            <td>{{ employeesSettlement.settlementYear }}</td>
            <td>{{ employeesSettlement.settlementMonth }}</td>
            <td>{{ employeesSettlement.totalPoints }}</td>
            <td>{{ employeesSettlement.totalKilometer }}</td>
            <td>
              {{
                !employeesSettlement.settlementStatus
                  ? $t("notDone")
                  : $t("done")
              }}
            </td>
            <td>
              {{
                !employeesSettlement.settlementStatus
                  ? $t("notFound")
                  : setDataMultiLang(
                      language,
                      employeesSettlement.settlementByUserNameAr,
                      employeesSettlement.settlementByUserNameEn
                    )
              }}
            </td>
            <td>
              {{
                !employeesSettlement.settlementStatus
                  ? $t("notFound")
                  : setDataMultiLang(
                      language,
                      timeE2A(employeesSettlement.settlementDateTime),
                      employeesSettlement.settlementDateTime
                    )
              }}
            </td>
            <td>
              {{
                !employeesSettlement.settlementStatus
                  ? $t("notFound")
                  : setDataMultiLang(
                      language,
                      employeesSettlement.settlementTypeNameAr,
                      employeesSettlement.settlementTypeNameEn
                    )
              }}
            </td>
            <td>
              {{
                !employeesSettlement.settlementStatus
                  ? $t("notFound")
                  : employeesSettlement.settlementValue
              }}
            </td>
            <td>
              {{
                !employeesSettlement.settlementStatus
                  ? $t("notFound")
                  : employeesSettlement.settlementNote
              }}
            </td>
            <td>
              <button
                v-if="employeesSettlement.settlementStatus"
                v-b-modal.EmployeesSettlementCancel
                class="btn p-0"
                :title="$t('cancelSettlement')"
                @click="setSettlementData(employeesSettlement)"
              >
                <img src="@/assets/images/cancel.svg" class="icon-lg" />
              </button>
              <button
                v-else
                v-b-modal.EmployeesSettlementDone
                class="btn p-0"
                :title="$t('settlement')"
                @click="setSettlementData(employeesSettlement)"
              >
                <img src="@/assets/images/checkmark.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <button
                v-b-modal.EmployeesSettlementInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setSettlementData(employeesSettlement)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
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
  props: [
    "employeesSettlementMovementData",
    "employeeSettlementData",
    "noEmployeeData",
  ],
  methods: {
    setSettlementData(employeesSettlement) {
      this.$emit("setSettlementData", employeesSettlement);
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
