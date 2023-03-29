<template>
  <div v-if="monthAllowancesPlanData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>{{ $t("monthAllowancesPlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              {{
                isDataExist(monthAllowancesPlanData.monthAllowancesPlansCode)
              }}
            </th>
            <th>
              {{
                isDataExist(
                  monthAllowancesPlanData.monthAllowancesPlansNameCurrent
                )
              }}
            </th>
            <th>{{ timeToLang(monthAllowancesPlanData.dateTimeActionAdd) }}</th>
            <th>
              {{
                isDataExist(monthAllowancesPlanData.monthAllowancesPlansNote)
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
  name: "MonthAllowancesPlanNameTable",
  data() {
    return {};
  },
  props: ["monthAllowancesPlanData"],
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
