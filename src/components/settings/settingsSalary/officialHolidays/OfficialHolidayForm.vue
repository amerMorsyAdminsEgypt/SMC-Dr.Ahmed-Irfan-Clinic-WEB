<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateOfficialHoliday"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'officialHolidayNameAr'"
            :value="officialHolidayData.officialHolidayNameAr"
            v-on:changeValue="
              officialHolidayData.officialHolidayNameAr = $event
            "
            :title="$t('nameAr')"
            :imgName="'holiday.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'officialHolidayNameEn'"
            :value="officialHolidayData.officialHolidayNameEn"
            v-on:changeValue="
              officialHolidayData.officialHolidayNameEn = $event
            "
            :title="$t('nameEn')"
            :imgName="'holiday.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'officialHolidayNameUnd'"
            :value="officialHolidayData.officialHolidayNameUnd"
            v-on:changeValue="
              officialHolidayData.officialHolidayNameUnd = $event
            "
            :title="$t('nameUnd')"
            :imgName="'holiday.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'officialHolidayWorkHourPrice'"
            :value="officialHolidayData.officialHolidayWorkHourPrice"
            v-on:changeValue="
              officialHolidayData.officialHolidayWorkHourPrice = $event
            "
            :title="$t('officialHolidayWorkHourPrice')"
            :imgName="'number.svg'"
          />

          <DatePicker
            :className="'col-md-6'"
            :id="'officialHolidayStartDate'"
            :value="officialHolidayData.officialHolidayStartDate"
            v-on:changeValue="
              officialHolidayData.officialHolidayStartDate = $event
            "
            :title="$t('officialHolidayStartDate')"
            :language="language"
          />
          <TimePicker
            :className="'col-md-6'"
            :value="officialHolidayData.officialHolidayStartTime"
            v-on:changeValue="
              officialHolidayData.officialHolidayStartTime = $event
            "
            :title="$t('officialHolidayStartTime')"
            :language="language"
          />

          <DatePicker
            :className="'col-md-6'"
            :id="'officialHolidayEndDate'"
            :value="officialHolidayData.officialHolidayEndDate"
            v-on:changeValue="
              officialHolidayData.officialHolidayEndDate = $event
            "
            :title="$t('officialHolidayEndDate')"
            :language="language"
          />
          <TimePicker
            :className="'col-md-6'"
            :value="officialHolidayData.officialHolidayEndTime"
            v-on:changeValue="
              officialHolidayData.officialHolidayEndTime = $event
            "
            :title="$t('officialHolidayEndTime')"
            :language="language"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'officialHolidayDescriptionAr'"
            :value="officialHolidayData.officialHolidayDescriptionAr"
            :title="$t('officialHolidayDescriptionAr')"
            :imgName="'notes.svg'"
            v-on:changeValue="
              officialHolidayData.officialHolidayDescriptionAr = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'officialHolidayDescriptionEn'"
            :value="officialHolidayData.officialHolidayDescriptionEn"
            :title="$t('officialHolidayDescriptionEn')"
            :imgName="'notes.svg'"
            v-on:changeValue="
              officialHolidayData.officialHolidayDescriptionEn = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'officialHolidayDescriptionUnd'"
            :value="officialHolidayData.officialHolidayDescriptionUnd"
            :title="$t('officialHolidayDescriptionUnd')"
            :imgName="'notes.svg'"
            v-on:changeValue="
              officialHolidayData.officialHolidayDescriptionUnd = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'officialHolidayNotes'"
            :value="officialHolidayData.officialHolidayNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="officialHolidayData.officialHolidayNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/official-holidays" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import DatePicker from "@/components/general/DatePicker.vue";
import TimePicker from "@/components/general/TimePicker.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "OfficialHolidayForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    DatePicker,
    TimePicker,
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
  props: ["officialHolidayData", "submitName"],
  methods: {
    async addOrUpdateOfficialHoliday() {
      this.$emit("addOrUpdateOfficialHoliday");
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
