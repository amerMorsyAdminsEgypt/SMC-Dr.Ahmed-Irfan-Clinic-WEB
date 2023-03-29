<template>
  <div v-if="allowancesPlanData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>{{ $t("allowancesPlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{{ isDataExist(allowancesPlanData.allowancesPlansCode) }}</th>
            <th>
              {{ isDataExist(allowancesPlanData.allowancesPlansNameCurrent) }}
            </th>
            <th>{{ timeToLang(allowancesPlanData.dateTimeActionAdd) }}</th>
            <th>{{ isDataExist(allowancesPlanData.allowancesPlansNote) }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "AllowancesPlanNameTable",
  data() {
    return {};
  },
  props: ["allowancesPlanData"],
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
