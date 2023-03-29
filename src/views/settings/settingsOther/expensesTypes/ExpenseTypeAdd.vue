<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ExpenseTypeForm
      v-if="!isLoading"
      :expenseTypeData="expenseTypeData"
      :submitName="$t('add')"
      v-on:addOrUpdateExpenseType="addExpenseType"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ExpenseTypeForm from "@/components/settings/settingsOther/expensesTypes/ExpenseTypeForm.vue";
import ExpenseType from "@/models/settings/settingsOther/expensesTypes/ExpenseType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ExpenseTypeAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ExpenseTypeForm,
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
      expenseTypeData: new ExpenseType(),
    };
  },
  methods: {
    async addExpenseType() {
      this.isLoading = true;
      try {
        let response = await this.expenseTypeData.addOrUpdateExpenseType(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.expenseTypeData.setInitialValue();
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
