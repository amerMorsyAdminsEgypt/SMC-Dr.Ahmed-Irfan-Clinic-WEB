<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label">
          <router-link :to="'/add-attendance-employee/' + employeeToken">
            {{ $t("attendanceAdd") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link :to="'/add-attendance-employee/' + employeeToken">
            <img src="@/assets/images/plus.svg" />
          </router-link>
        </div>
      </li>
      <li v-if="!linksOnly">
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
            :placeholder="$t('date')"
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
            :placeholder="$t('date')"
            :locale="language"
            today-button
            reset-button
            class="form-control"
          ></b-form-datepicker>
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
export default {
  name: "EmployeeAttendanceFloatBtns",
  props: {
    employeeToken: {
      type: String,
      default: "",
    },
    dateFrom: {
      type: String,
      default: "",
    },
    dateTo: {
      type: String,
      default: "",
    },
    linksOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      theDateFrom: this.dateFrom.replace(/\//g, "-"),
      theDateTo: this.dateTo.replace(/\//g, "-"),
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
        this.theDateFrom.replace(/-/g, "/"),
        this.theDateTo.replace(/-/g, "/")
      );
    },
  },
};
</script>
