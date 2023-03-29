<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateCountry()"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'alpha2Code'"
            :value="countryData.alpha2Code"
            :title="$t('countries.alpha2Code')"
            :imgName="'country.svg'"
            v-on:changeValue="countryData.alpha2Code = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'alpha3Code'"
            :value="countryData.alpha3Code"
            :title="$t('countries.alpha3Code')"
            :imgName="'country.svg'"
            v-on:changeValue="countryData.alpha3Code = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'CountryNameAr'"
            :value="countryData.countryNameAr"
            :title="$t('countries.nameAr')"
            :imgName="'country.svg'"
            v-on:changeValue="countryData.countryNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'CountryNameEn'"
            :value="countryData.countryNameEn"
            :title="$t('countries.nameEn')"
            :imgName="'country.svg'"
            v-on:changeValue="countryData.countryNameEn = $event"
          />
          <CustomInput
            :className="'col-md-12'"
            :id="'CountryNameUnd'"
            :value="countryData.countryNameUnd"
            :title="$t('countries.nameUnd')"
            :imgName="'country.svg'"
            v-on:changeValue="countryData.countryNameUnd = $event"
          />

          <!-- <TextArea
            :className="'col-md-6'"
            :id="'CountryDescriptionAr'"
            :value="countryData.nationalityAr"
            :title="$t('countries.nationalityAr')"
            :imgName="'nationality.svg'"
            v-on:changeValue="countryData.nationalityAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'CountryDescriptionEn'"
            :value="countryData.nationalityEn"
            :title="$t('countries.nationalityEn')"
            :imgName="'nationality.svg'"
            v-on:changeValue="countryData.nationalityEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'CountryDescriptionUnd'"
            :value="countryData.nationalityUnd"
            :title="$t('countries.nationalityUnd')"
            :imgName="'nationality.svg'"
            v-on:changeValue="countryData.nationalityUnd = $event"
          /> 

          <TextArea
            :className="'col-md-6'"
            :id="'CountryNotes'"
            :value="countryData.countryNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="countryData.countryNotes = $event"
          /> -->
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/countries" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInput from "@/components/general/CustomInput.vue";
// import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "CountryForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    // TextArea,
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
  props: ["countryData", "submitName"],
  methods: {
    async addOrUpdateCountry() {
      this.$emit("addOrUpdateCountry");
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
