<template>
  <div v-if="employeeSalarySettingsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("name") }}</th>
            <th class="cell-sm">{{ $t("description") }}</th>
            <th class="cell-sm">{{ $t("actionDateTime") }}</th>
            <th class="cell-sm">{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(salarySetting, index) in employeeSalarySettingsData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(salarySetting.employeeSalarySettingNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(
                  salarySetting.employeeSalarySettingDescriptionCurrent
                )
              }}
            </td>
            <td>{{ timeToLang(salarySetting.actionDateTime) }}</td>
            <td>{{ isDataExist(salarySetting.employeeSalarySettingNotes) }}</td>
            <td>
              <button
                v-b-modal.EmployeeSalarySettingInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setEmployeeSalarySettingData(salarySetting)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-employee-salary-setting/${salarySetting.employeeSalarySettingToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.EmployeeSalarySettingDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setEmployeeSalarySettingData(salarySetting)"
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
  getTimeFormatInMinSec,
  isDataExist,
} from "@/utils/functions";

export default {
  name: "EmployeeSalarySettingsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["employeeSalarySettingsData", "employeeSalarySettingData"],
  methods: {
    setEmployeeSalarySettingData(employeeSalarySettingData) {
      this.$emit("setEmployeeSalarySettingData", employeeSalarySettingData);
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
    getTimeFormatInMinSec(seconds = "", minutes = "") {
      return getTimeFormatInMinSec(seconds, minutes);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
