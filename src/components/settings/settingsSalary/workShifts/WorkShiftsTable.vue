<template>
  <div v-if="workShiftsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("workShiftTimeFrom") }}</th>
            <th>{{ $t("workShiftTimeTo") }}</th>
            <th>{{ $t("workShiftDuration") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(workShift, index) in workShiftsData"
            :key="workShift.workShiftToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(workShift.workShiftNameCurrent) }}</td>
            <td>{{ timeToLang(workShift.workShiftTimeFrom) }}</td>
            <td>{{ timeToLang(workShift.workShiftTimeTo) }}</td>
            <td>{{ isDataExist(workShift.workShiftDuration) }}</td>
            <td>{{ isDataExist(workShift.workShiftNotes) }}</td>
            <td>
              <button
                v-b-modal.WorkShiftInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setWorkShiftData(workShift)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-work-shift/${workShift.workShiftToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.WorkShiftDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setWorkShiftData(workShift)"
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
  name: "WorkShiftsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["workShiftsData", "workShiftData"],
  methods: {
    setWorkShiftData(workShiftData) {
      this.$emit("setWorkShiftData", workShiftData);
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
