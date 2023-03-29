<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateEstablishmentYearSetting"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'establishmentYearSettingNameAr'"
            :value="establishmentYearSettingData.establishmentYearSettingNameAr"
            v-on:changeValue="
              establishmentYearSettingData.establishmentYearSettingNameAr =
                $event
            "
            :title="$t('nameAr')"
            :imgName="'year-settings.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'establishmentYearSettingNameEn'"
            :value="establishmentYearSettingData.establishmentYearSettingNameEn"
            v-on:changeValue="
              establishmentYearSettingData.establishmentYearSettingNameEn =
                $event
            "
            :title="$t('nameEn')"
            :imgName="'year-settings.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'establishmentYearSettingNameUnd'"
            :value="
              establishmentYearSettingData.establishmentYearSettingNameUnd
            "
            v-on:changeValue="
              establishmentYearSettingData.establishmentYearSettingNameUnd =
                $event
            "
            :title="$t('nameUnd')"
            :imgName="'year-settings.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'establishmentYearSettingCode'"
            :value="establishmentYearSettingData.establishmentYearSettingCode"
            v-on:changeValue="
              establishmentYearSettingData.establishmentYearSettingCode = $event
            "
            :title="$t('establishmentYearSettingCode')"
            :imgName="'number.svg'"
          />

          <DatePicker
            :className="'col-md-6'"
            :id="'employeeYearStart'"
            :value="establishmentYearSettingData.employeeYearStart"
            v-on:changeValue="
              establishmentYearSettingData.employeeYearStart = $event
            "
            :title="$t('employeeYearStart')"
            :language="language"
          />
          <DatePicker
            :className="'col-md-6'"
            :id="'employeeYearEnd'"
            :value="establishmentYearSettingData.employeeYearEnd"
            v-on:changeValue="
              establishmentYearSettingData.employeeYearEnd = $event
            "
            :title="$t('employeeYearEnd')"
            :language="language"
          />

          <DatePicker
            :className="'col-md-6'"
            :id="'financialYearStart'"
            :value="establishmentYearSettingData.financialYearStart"
            v-on:changeValue="
              establishmentYearSettingData.financialYearStart = $event
            "
            :title="$t('financialYearStart')"
            :language="language"
          />
          <DatePicker
            :className="'col-md-6'"
            :id="'financialYearEnd'"
            :value="establishmentYearSettingData.financialYearEnd"
            v-on:changeValue="
              establishmentYearSettingData.financialYearEnd = $event
            "
            :title="$t('financialYearEnd')"
            :language="language"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'year'"
            :value="establishmentYearSettingData.year"
            v-on:changeValue="establishmentYearSettingData.year = $event"
            :title="$t('year')"
            :imgName="'year.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'establishmentYearSettingNote'"
            :value="establishmentYearSettingData.establishmentYearSettingNote"
            v-on:changeValue="
              establishmentYearSettingData.establishmentYearSettingNote = $event
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
        <router-link to="/year-establishment-settings" class="btn btn-cancel">
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
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "EstablishmentYearSettingForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    DatePicker,
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
  props: ["establishmentYearSettingData", "submitName"],
  methods: {
    async addOrUpdateEstablishmentYearSetting() {
      this.$emit("addOrUpdateEstablishmentYearSetting");
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
