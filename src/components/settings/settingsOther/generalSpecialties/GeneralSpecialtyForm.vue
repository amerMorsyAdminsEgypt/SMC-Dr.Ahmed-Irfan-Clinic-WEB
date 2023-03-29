<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateGeneralSpecialty()"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'generalSpecialtyNameAr'"
            :value="generalSpecialtyData.generalSpecialtyNameAr"
            :title="$t('nameAr')"
            :imgName="'general-specialities.svg'"
            v-on:changeValue="
              generalSpecialtyData.generalSpecialtyNameAr = $event
            "
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'generalSpecialtyNameEn'"
            :value="generalSpecialtyData.generalSpecialtyNameEn"
            :title="$t('nameEn')"
            :imgName="'general-specialities.svg'"
            v-on:changeValue="
              generalSpecialtyData.generalSpecialtyNameEn = $event
            "
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'generalSpecialtyNameUnd'"
            :value="generalSpecialtyData.generalSpecialtyNameUnd"
            :title="$t('nameUnd')"
            :imgName="'general-specialities.svg'"
            v-on:changeValue="
              generalSpecialtyData.generalSpecialtyNameUnd = $event
            "
          />

          <TextArea
            :className="'col-md-6'"
            :id="'generalSpecialtyDescriptionAr'"
            :value="generalSpecialtyData.generalSpecialtyDescriptionAr"
            :title="$t('generalSpecialtyDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="
              generalSpecialtyData.generalSpecialtyDescriptionAr = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'generalSpecialtyDescriptionEn'"
            :value="generalSpecialtyData.generalSpecialtyDescriptionEn"
            :title="$t('generalSpecialtyDescriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="
              generalSpecialtyData.generalSpecialtyDescriptionEn = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'generalSpecialtyDescriptionUnd'"
            :value="generalSpecialtyData.generalSpecialtyDescriptionUnd"
            :title="$t('generalSpecialtyDescriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="
              generalSpecialtyData.generalSpecialtyDescriptionUnd = $event
            "
          />

          <TextArea
            :className="'col-md-12'"
            :id="'generalSpecialtyNotes'"
            :value="generalSpecialtyData.generalSpecialtyNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="
              generalSpecialtyData.generalSpecialtyNotes = $event
            "
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/general-specialties" class="btn btn-cancel">
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
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "GeneralSpecialtyForm",
  components: {
    PreLoader,
    ExceptionWithImg,
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
  props: ["generalSpecialtyData", "submitName"],
  methods: {
    async addOrUpdateGeneralSpecialty() {
      this.$emit("addOrUpdateGeneralSpecialty");
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
