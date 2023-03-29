<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6">
            <input
              name="settingNameAr"
              id="settingNameAr"
              type="text"
              v-model="settingData.settingNameAr"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label for="settingNameAr">{{ $t("settingNameAr") }}</label>
            <img src="@/assets/images/settings.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <input
              name="settingNameEn"
              id="settingNameEn"
              type="text"
              v-model="settingData.settingNameEn"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label for="settingNameEn">{{ $t("settingNameEn") }}</label>
            <img src="@/assets/images/settings.svg" />
          </div>

          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="settingData.settingDayStartOrEnd"
              :options="settingDayStartOrEndOptions"
              @change="changeLabel()"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/type.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <input
              name="settingDay"
              id="settingDay"
              type="text"
              v-model="settingData.settingDay"
              class="form-control"
              placeholder=" "
              maxlength="2"
            />
            <label for="settingDay">{{ settingDayStartOrEndLabel }}</label>
            <img src="@/assets/images/date.svg" />
          </div>

          <div class="form-label-group col-md-6">
            <b-form-datepicker
              id="settingActiveStart"
              v-model="settingData.settingActiveStart"
              :date-format-options="{
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                weekday: 'short',
              }"
              v-bind="labels[language] || {}"
              :placeholder="$t('settingActiveStart')"
              :locale="language"
              today-button
              reset-button
              class="form-control"
            ></b-form-datepicker>
          </div>
          <TextArea
            :className="'col-md-6'"
            :id="'settingNotes'"
            :value="settingData.settingNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="settingData.settingNotes = $event"
          />
        </div>
      </div>
      <!-- </b-collapse> -->

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addEstablishmentSetting"
        >
          {{ submitName }}
        </button>
        <router-link to="/months-establishment-settings" class="btn btn-cancel">
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
  name: "SettingsGeneralForm",
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
      settingDayStartOrEndLabel: this.$t("fixedDayOfTheMonth"),
      settingDayStartOrEndOptions: [
        { value: "", text: this.$t("selectSettingType") },
        { value: "1", text: this.$t("fixedDayOfTheMonth") },
        { value: "2", text: this.$t("subtractNumberOfDaysFromEndOfTheMonth") },
      ],

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
  props: ["settingData", "submitName"],
  methods: {
    changeLabel() {
      if (this.settingData.settingDayStartOrEnd == 2)
        this.settingDayStartOrEndLabel = this.$t(
          "subtractNumberOfDaysFromEndOfTheMonth"
        );
      else this.settingDayStartOrEndLabel = this.$t("fixedDayOfTheMonth");
    },
    async addEstablishmentSetting() {
      this.$emit("addEstablishmentSetting");
    },
  },
  async created() {},
};
</script>

<style scoped lang="scss"></style>
