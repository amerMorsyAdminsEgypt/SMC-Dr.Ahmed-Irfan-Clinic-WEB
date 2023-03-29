<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateBranchTime"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="brancTimehData.dayToken"
              :options="dayTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/date.svg" />
          </div>

          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="brancTimehData.branchToken"
              :options="branchTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/branches.svg" />
          </div>

          <div class="form-label-group col-md-6">
            <b-form-timepicker
              v-model="brancTimehData.branchOpenTime"
              v-bind="labels[language] || {}"
              :placeholder="$t('startWorkTime')"
              :locale="language"
              now-button
              reset-button
              no-close-button
            ></b-form-timepicker>
          </div>
          <div class="form-label-group col-md-6">
            <b-form-timepicker
              v-model="brancTimehData.branchCloseTime"
              v-bind="labels[language] || {}"
              :placeholder="$t('endWorkTime')"
              :locale="language"
              now-button
              reset-button
              no-close-button
            ></b-form-timepicker>
          </div>

          <TextArea
            :className="'col-md-12'"
            :id="'branchTimeNotes'"
            :value="brancTimehData.branchTimeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="brancTimehData.branchTimeNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/branches-times" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import TextArea from "@/components/general/TextArea.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import { setDataMultiLang } from "@/utils/functions";

export default {
  name: "BranchTimeForm",
  components: {
    PreLoader,
    ExceptionWithImg,
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
      dayTokenOptions: [],
      branchTokenOptions: [],

      labels: {
        ar: {
          weekdayHeaderFormat: "narrow",
          labelPrevDecade: "العقد السابق",
          labelPrevYear: "العام السابق",
          labelPrevMonth: "الشهر السابق",
          labelCurrentMonth: "الشهر الحالي",
          labelNextMonth: "الشهر المقبل",
          labelNextYear: "العام المقبل",
          labelNextDecade: "العقد القادم",
          labelToday: "اليوم",
          labelSelected: "التاريخ المحدد",
          labelNoDateSelected: "لم يتم اختيار تاريخ",
          labelCalendar: "التقويم",
          labelNav: "الملاحة التقويم",
          labelHelp: "استخدم مفاتيح المؤشر للتنقل في التواريخ",
          labelTodayButton: "اليوم",
          labelResetButton: "حذف",

          labelHours: "ساعات",
          labelMinutes: "الدقائق",
          labelSeconds: "ثواني",
          labelAmpm: "صباحا مساء",
          labelAm: "ص",
          labelPm: "م",
          labelIncrement: "زيادة",
          labelDecrement: "إنقاص",
          // labelSelected: "الوقت المحدد",
          labelNoTimeSelected: "لم يتم اختيار وقت",
          labelCloseButton: "إغلاق",
          labelNowButton: "الآن",
        },
      },
    };
  },
  props: ["brancTimehData", "submitName"],
  methods: {
    async addOrUpdateBranchTime() {
      this.$emit("addOrUpdateBranchTime");
    },
    async getDialogOfDays() {
      this.isLoading = true;
      this.dayTokenOptions = [];
      this.dayTokenOptions.push({
        value: "",
        text: this.$t("selectDay"),
      });
      let days = this.$store.getters.userData.constantLists.listDaysOfWeekData;
      for (let item in days) {
        this.dayTokenOptions.push({
          value: days[item]["itemToken"],
          text: setDataMultiLang(
            this.language,
            days[item]["itemNameAr"],
            days[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfBranches() {
      this.isLoading = true;
      this.branchTokenOptions = [];
      this.branchTokenOptions.push({
        value: "",
        text: this.$t("selectBranch"),
      });
      try {
        const response = await axios.get(
          `/Branches/GetDialogOfBranches?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.branchTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    // setDataMultiLang(lang, dataAr, dataEn) {
    //   return setDataMultiLang(lang, dataAr, dataEn);
    // },
  },
  watch: {},
  async created() {
    this.getDialogOfDays();
    this.getDialogOfBranches();
  },
};
</script>

<style lang="scss"></style>
