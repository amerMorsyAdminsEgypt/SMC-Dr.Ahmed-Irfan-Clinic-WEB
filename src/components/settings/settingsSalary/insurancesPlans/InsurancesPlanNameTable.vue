<template>
  <div v-if="insurancesPlanData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>{{ $t("insurancesPlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{{ isDataExist(insurancesPlanData.insurancesPlansCode) }}</th>
            <th>
              {{ isDataExist(insurancesPlanData.insurancesPlansNameCurrent) }}
            </th>
            <th>{{ timeToLang(insurancesPlanData.dateTimeActionAdd) }}</th>
            <th>{{ isDataExist(insurancesPlanData.insurancesPlansNote) }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "InsurancesPlanNameTable",
  data() {
    return {};
  },
  props: ["insurancesPlanData"],
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
