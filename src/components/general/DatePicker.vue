<template>
  <div
    class="form-label-group"
    :class="className"
    :title="title ? title : $t('notFound')"
  >
    <b-form-datepicker
      :id="id"
      v-model="theValue"
      :date-format-options="{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
      }"
      v-bind="labels[language] || {}"
      :placeholder="title ? title : $t('notFound')"
      :locale="language"
      today-button
      reset-button
      class="form-control"
    ></b-form-datepicker>
  </div>
</template>

<script>
import { date2slash, date2dash } from "@/utils/functions";

export default {
  name: "DatePicker",
  data() {
    return {
      theValue: date2dash(this.value),
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
  methods: {},
  props: {
    className: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "textarea",
    },
    value: {
      default: "",
    },
    title: {
      type: String,
      default: "title",
    },
    language: {
      type: String,
      default: "ar",
    },
  },
  watch: {
    theValue: function (val) {
      this.$emit("changeValue", date2slash(val));
    },
  },
};
</script>

<style lang="scss" scoped></style>
