<template>
  <div v-if="employeesInputSheetsAttendanceData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("inputSheetAttendaceCode") }}</th>
            <th>{{ $t("mainColumnName") }}</th>
            <th>{{ $t("sheetTypeStatusName") }}</th>
            <th>{{ $t("inputSheetAttendaceMonth") }}</th>
            <th>{{ $t("inputSheetAttendaceYear") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("download") }}</th>
            <!-- <th>{{ $t("info") }}</th> -->
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(sheet, index) in employeesInputSheetsAttendanceData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(sheet.inputSheetAttendaceCode) }}</td>
            <td>{{ isDataExist(sheet.mainColumnNameCurrent) }}</td>
            <td>{{ isDataExist(sheet.sheetTypeStatusNameCurrent) }}</td>
            <td>{{ isDataExist(sheet.inputSheetAttendaceMonth) }}</td>
            <td>{{ isDataExist(sheet.inputSheetAttendaceYear) }}</td>
            <td>{{ timeToLang(sheet.dateTimeUpload) }}</td>
            <td>
              <button
                class="btn p-0"
                :title="$t('download')"
                @click="downloadFile(sheet.inputSheetPath)"
              >
                <img src="@/assets/images/sheets.svg" class="icon-lg" />
              </button>
            </td>
            <!-- <td>
              <button
                v-b-modal.EmployeesInputSheetAttendanceInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setEmployeesInputSheetAttendanceData(sheet)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td> -->
            <td>
              <button
                v-b-modal.EmployeesInputSheetAttendanceDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setEmployeesInputSheetAttendanceData(sheet)"
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
  name: "WorkShiftsTable",
  data() {
    return {
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: [
    "employeesInputSheetsAttendanceData",
    "employeesInputSheetAttendanceData",
  ],
  methods: {
    setEmployeesInputSheetAttendanceData(employeesInputSheetAttendanceData) {
      this.$emit(
        "setEmployeesInputSheetAttendanceData",
        employeesInputSheetAttendanceData
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
