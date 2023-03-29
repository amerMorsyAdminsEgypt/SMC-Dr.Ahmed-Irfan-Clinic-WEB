<template>
  <div v-if="absencePlanData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>{{ $t("absencePlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{{ isDataExist(absencePlanData.absencePlansCode) }}</th>
            <th>
              {{ isDataExist(absencePlanData.absencePlansNameCurrent) }}
            </th>
            <th>{{ timeToLang(absencePlanData.dateTimeActionAdd) }}</th>
            <th>{{ isDataExist(absencePlanData.absencePlansNote) }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "AbsencePlanNameTable",
  data() {
    return {};
  },
  props: ["absencePlanData"],
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
