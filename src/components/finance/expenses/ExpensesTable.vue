<template>
  <div v-if="expensesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("expenseCode") }}</th>
            <th>{{ $t("money") }}</th>
            <th>{{ $t("treasuryName") }}</th>
            <th>{{ $t("branchName") }}</th>
            <th>{{ $t("expenseType") }}</th>
            <th>{{ $t("userMakeAction") }}</th>
            <th>{{ $t("dateTime") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("refund") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(expense, index) in expensesData"
            :key="expense.expensesToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(expense.expensesCode) }}</td>
            <td>{{ isDataExist(expense.expensesMoneyValue + $t("EGP")) }}</td>
            <td>{{ isDataExist(expense.treasuryNameCurrent) }}</td>
            <td>{{ isDataExist(expense.branchNameCurrent) }}</td>
            <td>{{ isDataExist(expense.expensesTypeNameCurrent) }}</td>
            <td>{{ isDataExist(expense.userNameCurrent) }}</td>
            <td>{{ timeToLang(expense.expensesDateTimeAction) }}</td>
            <td>
              <button
                v-b-modal.ExpenseInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setExpenseData(expense)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td v-if="!expense.expensesReturnedStatus">
              <button
                v-b-modal.ExpenseRefund
                class="btn p-0"
                :title="$t('refund')"
                @click="setExpenseData(expense)"
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
  name: "ExpensesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["expensesData", "expenseData"],
  methods: {
    setExpenseData(expenseData) {
      this.$emit("setExpenseData", expenseData);
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
