<template>
  <div v-if="workPlanDaysData" class="">
    <div v-for="(workPlanDay, index) in workPlanDaysData" :key="index">
      <b-button v-b-toggle="'id' + index" class="btn btn-lg btn-collapse">
        {{
          `${workPlanDay.dayNameCurrent} ( ${workPlanDay.dayStatusNameCurrent} )`
        }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse :id="'id' + index">
        <div class="table-container">
          <table class="my-table">
            <thead>
              <tr>
                <th>{{ $t("dayName") }}</th>
                <th>{{ $t("dayStatus") }}</th>
                <th>{{ $t("edit") }}</th>
                <th>{{ $t("WorkPlanShiftsAdd") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ isDataExist(workPlanDay.dayNameCurrent) }}</td>
                <td>{{ isDataExist(workPlanDay.dayStatusNameCurrent) }}</td>
                <td>
                  <button
                    v-b-modal.WorkPlanDayEdit
                    class="btn p-0"
                    :title="$t('info')"
                    @click="setWorkPlanDayData(workPlanDay)"
                  >
                    <img src="@/assets/images/pencil.svg" class="icon-lg" />
                  </button>
                </td>
                <td>
                  <button
                    v-b-modal.WorkPlanShiftsAdd
                    class="btn p-0"
                    :title="$t('WorkPlanShiftsAdd')"
                    @click="setWorkPlanDayData(workPlanDay)"
                  >
                    <img src="@/assets/images/plus.svg" class="icon-lg" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="table-container"
          v-if="workPlanDay.WorkPlansShiftsData.length != 0"
        >
          <table class="my-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{{ $t("workShiftName") }}</th>
                <th>{{ $t("workShiftTimeFrom") }}</th>
                <th>{{ $t("workShiftTimeTo") }}</th>
                <th>{{ $t("edit") }}</th>
                <th>{{ $t("delete") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(
                  workPlanShift, index2
                ) in workPlanDay.WorkPlansShiftsData"
                :key="index2"
              >
                <td>{{ ++index2 }}</td>
                <td>{{ isDataExist(workPlanShift.workShiftNameCurrent) }}</td>
                <td>{{ timeToLang(workPlanShift.workShiftTimeFrom) }}</td>
                <td>{{ timeToLang(workPlanShift.workShiftTimeTo) }}</td>
                <td>
                  <button
                    v-b-modal.WorkPlanShiftEdit
                    class="btn p-0"
                    :title="$t('edit')"
                    @click="setWorkPlanShiftData(workPlanShift)"
                  >
                    <img src="@/assets/images/pencil.svg" class="icon-lg" />
                  </button>
                </td>
                <td>
                  <button
                    v-b-modal.WorkPlanShiftDelete
                    class="btn p-0"
                    :title="$t('delete')"
                    @click="setWorkPlanShiftData(workPlanShift)"
                  >
                    <img src="@/assets/images/trash.svg" class="icon-lg" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "WorkPlanDaysTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["workPlanDaysData", "workPlanDayData"],
  methods: {
    setWorkPlanDayData(workPlanDayData) {
      this.$emit("setWorkPlanDayData", workPlanDayData);
    },
    setWorkPlanShiftData(workPlanShiftData) {
      this.$emit("setWorkPlanShiftData", workPlanShiftData);
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
