<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateWorkShift"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'workShiftNameAr'"
            :value="workShiftData.workShiftNameAr"
            :title="$t('nameAr')"
            :imgName="'work-shifts.svg'"
            v-on:changeValue="workShiftData.workShiftNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'workShiftNameEn'"
            :value="workShiftData.workShiftNameEn"
            :title="$t('nameEn')"
            :imgName="'work-shifts.svg'"
            v-on:changeValue="workShiftData.workShiftNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'workShiftNameUnd'"
            :value="workShiftData.workShiftNameUnd"
            :title="$t('nameUnd')"
            :imgName="'work-shifts.svg'"
            v-on:changeValue="workShiftData.workShiftNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'workShiftNotes'"
            :value="workShiftData.workShiftNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="workShiftData.workShiftNotes = $event"
          />

          <TimePicker
            :className="'col-md-6'"
            :value="workShiftData.workShiftTimeFrom"
            :title="$t('workShiftTimeFrom')"
            :language="language"
            v-on:changeValue="workShiftData.workShiftTimeFrom = $event"
          />
          <TimePicker
            :className="'col-md-6'"
            :value="workShiftData.workShiftTimeTo"
            :title="$t('workShiftTimeTo')"
            :language="language"
            v-on:changeValue="workShiftData.workShiftTimeTo = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/work-shifts" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import TimePicker from "@/components/general/TimePicker.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "WorkShiftForm",
  components: {
    PreLoader,
    ExceptionWithImg,
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
  props: ["workShiftData", "submitName"],
  methods: {
    async addOrUpdateWorkShift() {
      this.$emit("addOrUpdateWorkShift");
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
