<template>
  <div v-if="overTimePlanData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>{{ $t("overTimePlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{{ isDataExist(overTimePlanData.overTimePlansCode) }}</th>
            <th>
              {{ isDataExist(overTimePlanData.overTimePlansNameCurrent) }}
            </th>
            <th>{{ timeToLang(overTimePlanData.dateTimeActionAdd) }}</th>
            <th>{{ isDataExist(overTimePlanData.overTimePlansNote) }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "OverTimePlanNameTable",
  data() {
    return {};
  },
  props: ["overTimePlanData"],
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
