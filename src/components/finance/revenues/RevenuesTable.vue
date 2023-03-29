<template>
  <div v-if="revenuesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("revenueCode") }}</th>
            <th>{{ $t("money") }}</th>
            <th>{{ $t("treasuryName") }}</th>
            <th>{{ $t("branchName") }}</th>
            <th>{{ $t("revenueType") }}</th>
            <th>{{ $t("userMakeAction") }}</th>
            <th>{{ $t("dateTime") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("refund") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(revenue, index) in revenuesData"
            :key="revenue.revenuesToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(revenue.revenuesCode) }}</td>
            <td>{{ isDataExist(revenue.revenuesMoneyValue + $t("EGP")) }}</td>
            <td>{{ isDataExist(revenue.treasuryNameCurrent) }}</td>
            <td>{{ isDataExist(revenue.branchNameCurrent) }}</td>
            <td>{{ isDataExist(revenue.revenuesTypeNameCurrent) }}</td>
            <td>{{ isDataExist(revenue.userNameCurrent) }}</td>
            <td>{{ timeToLang(revenue.revenuesDateTimeAction) }}</td>
            <td>
              <button
                v-b-modal.RevenueInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setRevenueData(revenue)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td v-if="!revenue.revenuesReturnedStatus">
              <button
                v-b-modal.RevenueRefund
                class="btn p-0"
                :title="$t('refund')"
                @click="setRevenueData(revenue)"
              >
                <img src="@/assets/images/cancel.svg" class="icon-lg" />
              </button>
            </td>
            <td v-else>{{ $t("refundDone") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "RevenuesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["revenuesData", "revenueData"],
  methods: {
    setRevenueData(revenueData) {
      this.$emit("setRevenueData", revenueData);
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
