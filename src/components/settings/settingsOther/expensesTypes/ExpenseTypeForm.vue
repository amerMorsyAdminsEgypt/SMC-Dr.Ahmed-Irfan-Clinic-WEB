<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateExpenseType"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'expensesTypeNameAr'"
            :value="expenseTypeData.expensesTypeNameAr"
            :title="$t('nameAr')"
            :imgName="'expenses-types.svg'"
            v-on:changeValue="expenseTypeData.expensesTypeNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'expensesTypeNameEn'"
            :value="expenseTypeData.expensesTypeNameEn"
            :title="$t('nameEn')"
            :imgName="'expenses-types.svg'"
            v-on:changeValue="expenseTypeData.expensesTypeNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'expensesTypeNameUnd'"
            :value="expenseTypeData.expensesTypeNameUnd"
            :title="$t('nameUnd')"
            :imgName="'expenses-types.svg'"
            v-on:changeValue="expenseTypeData.expensesTypeNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'expensesTypeNotes'"
            :value="expenseTypeData.expensesTypeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="expenseTypeData.expensesTypeNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/expenses-types" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "ExpenseTypeForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    TextArea,
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
    };
  },
  props: ["expenseTypeData", "submitName"],
  methods: {
    async addOrUpdateExpenseType() {
      this.$emit("addOrUpdateExpenseType");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {},
};
</script>

<style lang="scss"></style>
