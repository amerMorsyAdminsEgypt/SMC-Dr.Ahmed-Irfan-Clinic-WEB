<template>
  <div
    class="form-label-group"
    :class="className"
    :title="title ? title : $t('notFound')"
  >
    <b-form-timepicker
      v-model="theValue"
      v-bind="labels[language] || {}"
      :placeholder="title ? title : $t('notFound')"
      :locale="language"
      show-seconds
      now-button
      reset-button
      no-close-button
      class="form-control"
    ></b-form-timepicker>
  </div>
</template>

<script>
import { timeTo12, timeTo24 } from "@/utils/functions";

export default {
  name: "TimePicker",
  data() {
    return {
      theValue: timeTo24(this.value),
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
      this.$emit("changeValue", timeTo12(val));
    },
  },
};
</script>

<style lang="scss" scoped></style>
