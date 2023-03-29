<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ExpenseForm
      v-if="!isLoading"
      :expenseData="expenseData"
      :imageSrc="imageSrc"
      :submitName="$t('add')"
      v-on:addExpense="addExpense"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import DEFAULT_IMG_EXPENSE from "@/assets/images/expenses.svg";
import ExpenseForm from "@/components/finance/expenses/ExpenseForm.vue";
import Expense from "@/models/finance/expenses/Expense";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ExpenseAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ExpenseForm,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      imageSrc: DEFAULT_IMG_EXPENSE,
      expenseData: new Expense(),
    };
  },
  methods: {
    async addExpense() {
      this.isLoading = true;
      try {
        let response = await this.expenseData.addExpense(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.expenseData.setInitialValue();
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  async created() {},
};
</script>

<style scoped lang="scss"></style>
