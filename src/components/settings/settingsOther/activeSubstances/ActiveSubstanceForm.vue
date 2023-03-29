<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateActiveSubstance()"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'activeSubstanceNameAr'"
            :value="activeSubstanceData.activeSubstanceNameAr"
            :title="$t('nameAr')"
            :imgName="'active-substance.svg'"
            v-on:changeValue="
              activeSubstanceData.activeSubstanceNameAr = $event
            "
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'activeSubstanceNameEn'"
            :value="activeSubstanceData.activeSubstanceNameEn"
            :title="$t('nameEn')"
            :imgName="'active-substance.svg'"
            v-on:changeValue="
              activeSubstanceData.activeSubstanceNameEn = $event
            "
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'activeSubstanceNameUnd'"
            :value="activeSubstanceData.activeSubstanceNameUnd"
            :title="$t('nameUnd')"
            :imgName="'active-substance.svg'"
            v-on:changeValue="
              activeSubstanceData.activeSubstanceNameUnd = $event
            "
          />

          <TextArea
            :className="'col-md-6'"
            :id="'activeSubstanceDescriptionAr'"
            :value="activeSubstanceData.activeSubstanceDescriptionAr"
            :title="$t('descriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="
              activeSubstanceData.activeSubstanceDescriptionAr = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'activeSubstanceDescriptionEn'"
            :value="activeSubstanceData.activeSubstanceDescriptionEn"
            :title="$t('descriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="
              activeSubstanceData.activeSubstanceDescriptionEn = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'activeSubstanceDescriptionUnd'"
            :value="activeSubstanceData.activeSubstanceDescriptionUnd"
            :title="$t('descriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="
              activeSubstanceData.activeSubstanceDescriptionUnd = $event
            "
          />

          <TextArea
            :className="'col-md-12'"
            :id="'activeSubstanceNotes'"
            :value="activeSubstanceData.activeSubstanceNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="activeSubstanceData.activeSubstanceNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'ActiveSubstances' }" class="btn btn-cancel">
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
  name: "ActiveSubstanceForm",
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
  props: ["activeSubstanceData", "submitName"],
  methods: {
    async addOrUpdateActiveSubstance() {
      this.$emit("addOrUpdateActiveSubstance");
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
