<template>
  <b-modal id="ExpenseInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/expenses.svg" class="icon-lg" />
        {{ $t("expenseData") }}
      </h3>
    </template>
    <div class="img-info">
      <img
        :src="expenseData.imageSrc"
        :onerror="`this.src='${defaultImg}'`"
        alt="Image"
      />
    </div>

    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="expenseData.expensesCode"
        :title="$t('expenseCode')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="expenseData.expensesMoneyValue + $t('EGP')"
        :title="$t('money')"
        :imgName="'money.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="expenseData.treasuryNameCurrent"
        :title="$t('treasuryName')"
        :imgName="'treasuries.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="expenseData.branchNameCurrent"
        :title="$t('branchName')"
        :imgName="'branches.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="expenseData.expensesTypeNameCurrent"
        :title="$t('expenseType')"
        :imgName="'expenses-types.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="expenseData.userNameCurrent"
        :title="$t('userMakeAction')"
        :imgName="'man.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(expenseData.expensesDateTimeAction)"
        :title="$t('dateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="isDataExist(expenseData.expensesNotes)"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        v-if="expenseData.expensesReturnedStatus"
        :className="'col-lg-6'"
        :value="isDataExist(expenseData.userNameCurrentReturned)"
        :title="$t('userMakeRefund')"
        :imgName="'man.svg'"
      />
      <DataLabelGroup
        v-if="expenseData.expensesReturnedStatus"
        :className="'col-lg-6'"
        :value="timeToLang(expenseData.expensesReturnedDateTime)"
        :title="$t('dateTimeRefund')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        v-if="expenseData.expensesReturnedStatus"
        :className="'col-lg-12'"
        :value="isDataExist(expenseData.expensesReturnedNote)"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DEFAULT_IMG_EXPENSE from "@/assets/images/expenses.svg";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "ExpenseInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG_EXPENSE,
    };
  },
  props: ["expenseData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
};
</script>

<style scoped lang="scss"></style>
