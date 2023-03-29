<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addEmployeesInputSheetAttendanceMerge"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'mergeMonth'"
            :value="employeesInputSheetAttendanceMergeData.mergeMonth"
            v-on:changeValue="
              employeesInputSheetAttendanceMergeData.mergeMonth = $event
            "
            :title="$t('mergeMonth')"
            :imgName="'date.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'mergeYear'"
            :value="employeesInputSheetAttendanceMergeData.mergeYear"
            v-on:changeValue="
              employeesInputSheetAttendanceMergeData.mergeYear = $event
            "
            :title="$t('mergeYear')"
            :imgName="'year.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'mergeCode'"
            :value="employeesInputSheetAttendanceMergeData.mergeCode"
            v-on:changeValue="
              employeesInputSheetAttendanceMergeData.mergeCode = $event
            "
            :title="$t('mergeCode')"
            :imgName="'number.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'mergeNote'"
            :value="employeesInputSheetAttendanceMergeData.mergeNote"
            v-on:changeValue="
              employeesInputSheetAttendanceMergeData.mergeNote = $event
            "
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link
          to="/employees-input-sheet-attendance-merges"
          class="btn btn-cancel"
        >
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
  name: "EmployeesInputSheetAttendanceMergeForm",
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
  props: ["employeesInputSheetAttendanceMergeData", "submitName"],
  methods: {
    async addEmployeesInputSheetAttendanceMerge() {
      this.$emit("addEmployeesInputSheetAttendanceMerge");
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
