<template>
  <div v-if="expensesTypesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("nameAr") }}</th>
            <th>{{ $t("nameEn") }}</th>
            <th>{{ $t("nameUnd") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(expenseType, index) in expensesTypesData"
            :key="expenseType.expensesTypeToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(expenseType.expensesTypeNameAr) }}</td>
            <td>{{ isDataExist(expenseType.expensesTypeNameEn) }}</td>
            <td>{{ isDataExist(expenseType.expensesTypeNameUnd) }}</td>
            <td>{{ isDataExist(expenseType.expensesTypeNotes) }}</td>
            <td>
              <router-link
                :to="`/edit-expense-type/${expenseType.expensesTypeToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.ExpenseTypeDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setExpenseTypeData(expenseType)"
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
  name: "ExpensesTypesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["expensesTypesData", "expenseTypeData"],
  methods: {
    setExpenseTypeData(expenseTypeData) {
      this.$emit("setExpenseTypeData", expenseTypeData);
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
