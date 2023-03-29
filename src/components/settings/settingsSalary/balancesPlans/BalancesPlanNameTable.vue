<template>
  <div v-if="balancesPlanData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>{{ $t("balancesPlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{{ isDataExist(balancesPlanData.balancesPlansCode) }}</th>
            <th>
              {{ isDataExist(balancesPlanData.balancesPlansNameCurrent) }}
            </th>
            <th>{{ timeToLang(balancesPlanData.dateTimeActionAdd) }}</th>
            <th>{{ isDataExist(balancesPlanData.balancesPlansNote) }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "BalancesPlanNameTable",
  data() {
    return {};
  },
  props: ["balancesPlanData"],
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
