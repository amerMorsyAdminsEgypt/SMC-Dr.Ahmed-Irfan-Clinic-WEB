<template>
  <div v-if="officialHolidaysData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("officialHolidayCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("dateTimeStart") }}</th>
            <th>{{ $t("dateTimeEnd") }}</th>
            <th>{{ $t("officialHolidayDurationTime") }}</th>
            <th>{{ $t("officialHolidayWorkHourPrice") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(officialHoliday, index) in officialHolidaysData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(officialHoliday.officialHolidayCode) }}</td>
            <td>
              {{ isDataExist(officialHoliday.officialHolidayNameCurrent) }}
            </td>
            <td>
              {{ timeToLang(officialHoliday.officialHolidayStartDateTime) }}
            </td>
            <td>
              {{ timeToLang(officialHoliday.officialHolidayEndDateTime) }}
            </td>
            <td>
              {{ isDataExist(officialHoliday.officialHolidayDurationTime) }}
            </td>
            <td>
              {{ isDataExist(officialHoliday.officialHolidayWorkHourPrice) }}
            </td>
            <td>
              <button
                v-b-modal.OfficialHolidayInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setOfficialHolidayData(officialHoliday)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-official-holiday/${officialHoliday.officialHolidayToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.OfficialHolidayDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setOfficialHolidayData(officialHoliday)"
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
  name: "OfficialHolidaysTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["officialHolidaysData", "officialHolidayData"],
  methods: {
    setOfficialHolidayData(officialHolidayData) {
      this.$emit("setOfficialHolidayData", officialHolidayData);
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
