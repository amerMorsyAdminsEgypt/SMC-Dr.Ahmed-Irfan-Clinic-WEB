<template>
  <div v-if="officialHolidaysPlanData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>{{ $t("officialHolidaysPlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              {{
                isDataExist(officialHolidaysPlanData.officialHolidaysPlansCode)
              }}
            </th>
            <th>
              {{
                isDataExist(
                  officialHolidaysPlanData.officialHolidaysPlansNameCurrent
                )
              }}
            </th>
            <th>
              {{ timeToLang(officialHolidaysPlanData.dateTimeActionAdd) }}
            </th>
            <th>
              {{
                isDataExist(officialHolidaysPlanData.officialHolidaysPlansNote)
              }}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "OfficialHolidaysPlanNameTable",
  data() {
    return {};
  },
  props: ["officialHolidaysPlanData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
