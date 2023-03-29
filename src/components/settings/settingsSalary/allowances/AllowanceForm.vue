<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateAllowance"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'allowanceNameAr'"
            :value="allowanceData.allowanceNameAr"
            :title="$t('nameAr')"
            :imgName="'allowances.svg'"
            v-on:changeValue="allowanceData.allowanceNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'allowanceNameEn'"
            :value="allowanceData.allowanceNameEn"
            :title="$t('nameEn')"
            :imgName="'allowances.svg'"
            v-on:changeValue="allowanceData.allowanceNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'allowanceNameUnd'"
            :value="allowanceData.allowanceNameUnd"
            :title="$t('nameUnd')"
            :imgName="'allowances.svg'"
            v-on:changeValue="allowanceData.allowanceNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'allowanceDescriptionAr'"
            :value="allowanceData.allowanceDescriptionAr"
            :title="$t('allowanceDescriptionAr')"
            :imgName="'notes.svg'"
            v-on:changeValue="allowanceData.allowanceDescriptionAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'allowanceDescriptionEn'"
            :value="allowanceData.allowanceDescriptionEn"
            :title="$t('allowanceDescriptionEn')"
            :imgName="'notes.svg'"
            v-on:changeValue="allowanceData.allowanceDescriptionEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'allowanceDescriptionUnd'"
            :value="allowanceData.allowanceDescriptionUnd"
            :title="$t('allowanceDescriptionUnd')"
            :imgName="'notes.svg'"
            v-on:changeValue="allowanceData.allowanceDescriptionUnd = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'allowanceNotes'"
            :value="allowanceData.allowanceNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="allowanceData.allowanceNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/allowances" class="btn btn-cancel">
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
  name: "AllowanceForm",
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
  props: ["allowanceData", "submitName"],
  methods: {
    async addOrUpdateAllowance() {
      this.$emit("addOrUpdateAllowance");
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
