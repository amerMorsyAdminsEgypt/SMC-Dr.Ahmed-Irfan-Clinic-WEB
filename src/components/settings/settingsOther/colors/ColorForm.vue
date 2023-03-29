<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off" method="post" @submit.prevent="addOrUpdateColor()">
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'colorNameAr'"
            :value="colorData.colorNameAr"
            :title="$t('nameAr')"
            :imgName="'colors.svg'"
            v-on:changeValue="colorData.colorNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'colorNameEn'"
            :value="colorData.colorNameEn"
            :title="$t('nameEn')"
            :imgName="'colors.svg'"
            v-on:changeValue="colorData.colorNameEn = $event"
          />
          <CustomInputColor
            :className="'col-md-6'"
            :id="'colorHexFromat'"
            :value="colorData.colorHexFromat"
            v-on:changeValue="colorData.colorHexFromat = $event"
            :title="$t('colors.select')"
            :imgName="'colors.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'colorNotes'"
            :value="colorData.colorNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="colorData.colorNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'Colors' }" class="btn btn-cancel">
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
import CustomInputColor from "@/components/general/CustomInputColor.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "ColorForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    CustomInputColor,
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
  props: ["colorData", "submitName"],
  methods: {
    async addOrUpdateColor() {
      this.$emit("addOrUpdateColor");
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
