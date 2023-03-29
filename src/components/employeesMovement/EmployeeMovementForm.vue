<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <div class="col-12 text-center">
            <label>{{ $t("moveFromData") }}</label>
          </div>
          <div class="form-label-group col-md-6">
            <b-form-datepicker
              v-model="employeeData.moveFromDate"
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
          <div class="form-label-group col-md-6">
            <b-form-timepicker
              v-model="employeeData.moveFromTime"
              v-bind="labels[language] || {}"
              :placeholder="$t('time')"
              :locale="language"
              now-button
              reset-button
              no-close-button
            ></b-form-timepicker>
          </div>
          <TextArea
            :className="'col-12'"
            :id="'moveFromPlaceName'"
            :value="employeeData.moveFromPlaceName"
            :title="$t('placeName')"
            :imgName="'movement.svg'"
            v-on:changeValue="employeeData.moveFromPlaceName = $event"
          />
          <TextArea
            :className="'col-12'"
            :id="'moveFromNote'"
            :value="employeeData.moveFromNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="employeeData.moveFromNote = $event"
          />

          <div class="col-12 text-center">
            <label>{{ $t("accessToData") }}</label>
          </div>
          <div class="form-label-group col-md-6">
            <b-form-datepicker
              v-model="employeeData.accessToDate"
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
          <div class="form-label-group col-md-6">
            <b-form-timepicker
              v-model="employeeData.accessToTime"
              v-bind="labels[language] || {}"
              :placeholder="$t('time')"
              :locale="language"
              now-button
              reset-button
              no-close-button
            ></b-form-timepicker>
          </div>
          <TextArea
            :className="'col-12'"
            :id="'accessToPlaceName'"
            :value="employeeData.accessToPlaceName"
            :title="$t('placeName')"
            :imgName="'movement.svg'"
            v-on:changeValue="employeeData.accessToPlaceName = $event"
          />
          <TextArea
            :className="'col-12'"
            :id="'accessToNote'"
            :value="employeeData.accessToNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="employeeData.accessToNote = $event"
          />

          <div class="form-label-group col-12">
            <input
              name="kilometerDifference"
              id="kilometerDifference"
              type="text"
              v-model="employeeData.kilometerDifference"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label for="kilometerDifference">{{
              $t("kilometerDifference")
            }}</label>
            <img src="@/assets/images/number.svg" />
          </div>
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateEmployeeMovement"
        >
          {{ submitName }}
        </button>
        <router-link to="/employees" class="btn btn-cancel">
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

export default {
  name: "EmployeeMovementForm",
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
  props: ["employeeData", "submitName"],
  methods: {
    async addOrUpdateEmployeeMovement() {
      this.$emit("addOrUpdateEmployeeMovement");
    },
  },
  async created() {},
};
</script>

<style scoped; lang="scss"></style>
