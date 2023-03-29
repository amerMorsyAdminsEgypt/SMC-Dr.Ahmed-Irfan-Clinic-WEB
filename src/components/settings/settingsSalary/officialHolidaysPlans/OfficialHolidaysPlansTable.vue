<template>
  <div v-if="officialHolidaysPlansData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("officialHolidaysPlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(officialHolidaysPlan, index) in officialHolidaysPlansData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(officialHolidaysPlan.officialHolidaysPlansCode) }}
            </td>
            <td>
              {{
                isDataExist(
                  officialHolidaysPlan.officialHolidaysPlansNameCurrent
                )
              }}
            </td>
            <td>{{ timeToLang(officialHolidaysPlan.dateTimeActionAdd) }}</td>
            <td>
              {{ isDataExist(officialHolidaysPlan.officialHolidaysPlansNote) }}
            </td>
            <td>
              <router-link
                :to="`/official-holidays-plan-details/${officialHolidaysPlan.officialHolidaysPlansToken}`"
                :title="$t('info')"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <router-link
                :to="`/edit-official-holidays-plan/${officialHolidaysPlan.officialHolidaysPlansToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.OfficialHolidaysPlanDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setOfficialHolidaysPlanData(officialHolidaysPlan)"
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
  name: "OfficialHolidaysPlansTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["officialHolidaysPlansData", "officialHolidaysPlanData"],
  methods: {
    setOfficialHolidaysPlanData(officialHolidaysPlanData) {
      this.$emit("setOfficialHolidaysPlanData", officialHolidaysPlanData);
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
