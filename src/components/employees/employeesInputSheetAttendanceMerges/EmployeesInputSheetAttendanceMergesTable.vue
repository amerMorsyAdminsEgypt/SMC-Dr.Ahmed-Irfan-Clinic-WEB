<template>
  <div v-if="employeesInputSheetAttendanceMergesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("mergeCode") }}</th>
            <th>{{ $t("mergeYear") }}</th>
            <th>{{ $t("mergeMonth") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("caseOfProblems") }}</th>
            <th>{{ $t("downloadCausesOfProblems") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(merge, index) in employeesInputSheetAttendanceMergesData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(merge.mergeCode) }}</td>
            <td>{{ isDataExist(merge.mergeYear) }}</td>
            <td>{{ isDataExist(merge.mergeMonth) }}</td>
            <td>{{ timeToLang(merge.mergeDateTimeAtion) }}</td>
            <td>{{ isDataExist(merge.mergeNote) }}</td>
            <td>
              {{ merge.sheetExptionStatus === true ? $t("yes") : $t("no") }}
            </td>
            <td>
              <button
                v-if="merge.sheetExptionStatus === true"
                class="btn p-0"
                :title="$t('download')"
                @click="downloadFile(merge.sheetExptionPath)"
              >
                <img src="@/assets/images/sheets.svg" class="icon-lg" />
              </button>
              <span v-else>-</span>
            </td>
            <td>
              <button
                v-b-modal.EmployeesInputSheetAttendanceMergeDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setEmployeesInputSheetAttendanceMergeData(merge)"
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
import {
  setDataMultiLang,
  timeToLang,
  isDataExist,
  downloadFileFromServer,
} from "@/utils/functions";

export default {
  name: "EmployeesInputSheetAttendanceMergesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
    };
  },
  props: [
    "employeesInputSheetAttendanceMergesData",
    "employeesInputSheetAttendanceMergeData",
  ],
  methods: {
    setEmployeesInputSheetAttendanceMergeData(
      employeesInputSheetAttendanceMergeData
    ) {
      this.$emit(
        "setEmployeesInputSheetAttendanceMergeData",
        employeesInputSheetAttendanceMergeData
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
    downloadFile(filePath) {
      return downloadFileFromServer(
        this.language,
        this.userAuthorizeToken,
        filePath
      );
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
