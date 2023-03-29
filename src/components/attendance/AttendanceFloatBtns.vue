<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label" @click="open">
          {{ $t("filter") }}
        </span>
        <div class="fab-icon-holder" @click="open">
          <img src="@/assets/images/filter.svg" />
        </div>
      </li>
    </ul>

    <vue-bottom-sheet ref="EmployeeBottomSheet">
      <div class="row">
        <div class="form-label-group col-12">
          <b-form-datepicker
            v-model="theDateFrom"
            :date-format-options="{
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            }"
            v-bind="labels[language] || {}"
            :placeholder="$t('from')"
            :locale="language"
            today-button
            reset-button
            class="form-control"
          ></b-form-datepicker>
        </div>

        <div class="form-label-group col-12">
          <b-form-datepicker
            v-model="theDateTo"
            :date-format-options="{
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            }"
            v-bind="labels[language] || {}"
            :placeholder="$t('to')"
            :locale="language"
            today-button
            reset-button
            class="form-control"
          ></b-form-datepicker>
        </div>

        <div class="form-label-group col-12">
          <b-form-select
            v-model="employeeTypeToken"
            :options="employeeTypeTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/man.svg" />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="search"
        >
          {{ $t("search") }}
        </button>
        <button class="btn btn-cancel" @click.prevent="close">
          {{ $t("cancel") }}
        </button>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import { date2slash, date2dash, setDataMultiLang } from "@/utils/functions";

export default {
  name: "AttendanceFloatBtns",
  props: {
    typeToken: {
      type: String,
      default: "",
    },
    dateSearchFrom: {
      type: String,
      default: "",
    },
    dateSearchTo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      employeeTypeToken: this.typeToken,
      theDateFrom: date2dash(this.dateSearchFrom),
      theDateTo: date2dash(this.dateSearchTo),
      employeeTypeTokenOptions: [],
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
        },
      },
    };
  },
  components: {},
  methods: {
    open() {
      this.$refs.EmployeeBottomSheet.open();
    },
    close() {
      this.$refs.EmployeeBottomSheet.close();
    },
    search() {
      this.close();
      this.$emit(
        "search",
        this.employeeTypeToken,
        date2slash(this.theDateFrom),
        date2slash(this.theDateTo)
      );
    },
    async getDialogOfEmployeeTypes() {
      this.isLoading = true;
      this.employeeTypeTokenOptions = [];
      this.employeeTypeTokenOptions.push({
        value: "",
        text: this.$t("selectEmployeeType"),
      });
      let items = this.$store.getters.userData.constantLists.listEmployeeType;
      for (let item in items) {
        this.employeeTypeTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  async created() {
    this.getDialogOfEmployeeTypes();
  },
};
</script>
