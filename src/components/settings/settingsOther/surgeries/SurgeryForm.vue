<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateSurgery()"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'surgeryNameAr'"
            :value="surgeryData.surgeryNameAr"
            :title="$t('nameAr')"
            :imgName="'medical-operations.svg'"
            v-on:changeValue="surgeryData.surgeryNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'surgeryNameEn'"
            :value="surgeryData.surgeryNameEn"
            :title="$t('nameEn')"
            :imgName="'medical-operations.svg'"
            v-on:changeValue="surgeryData.surgeryNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'surgeryNameUnd'"
            :value="surgeryData.surgeryNameUnd"
            :title="$t('nameUnd')"
            :imgName="'medical-operations.svg'"
            v-on:changeValue="surgeryData.surgeryNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'surgeryDescriptionAr'"
            :value="surgeryData.surgeryDescriptionAr"
            :title="$t('descriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="surgeryData.surgeryDescriptionAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'surgeryDescriptionEn'"
            :value="surgeryData.surgeryDescriptionEn"
            :title="$t('descriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="surgeryData.surgeryDescriptionEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'surgeryDescriptionUnd'"
            :value="surgeryData.surgeryDescriptionUnd"
            :title="$t('descriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="surgeryData.surgeryDescriptionUnd = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'surgeryNotes'"
            :value="surgeryData.surgeryNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="surgeryData.surgeryNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'Surgeries' }" class="btn btn-cancel">
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
  name: "SurgeryForm",
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
  props: ["surgeryData", "submitName"],
  methods: {
    async addOrUpdateSurgery() {
      this.$emit("addOrUpdateSurgery");
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
