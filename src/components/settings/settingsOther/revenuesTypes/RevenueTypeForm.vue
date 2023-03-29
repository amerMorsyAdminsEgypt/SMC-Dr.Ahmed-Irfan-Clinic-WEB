<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateRevenueType"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'revenuesTypeNameAr'"
            :value="revenueTypeData.revenuesTypeNameAr"
            :title="$t('nameAr')"
            :imgName="'revenues-types.svg'"
            v-on:changeValue="revenueTypeData.revenuesTypeNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'revenuesTypeNameEn'"
            :value="revenueTypeData.revenuesTypeNameEn"
            :title="$t('nameEn')"
            :imgName="'revenues-types.svg'"
            v-on:changeValue="revenueTypeData.revenuesTypeNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'revenuesTypeNameUnd'"
            :value="revenueTypeData.revenuesTypeNameUnd"
            :title="$t('nameUnd')"
            :imgName="'revenues-types.svg'"
            v-on:changeValue="revenueTypeData.revenuesTypeNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'revenuesTypeNotes'"
            :value="revenueTypeData.revenuesTypeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="revenueTypeData.revenuesTypeNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/revenues-types" class="btn btn-cancel">
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
  name: "RevenueTypeForm",
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
  props: ["revenueTypeData", "submitName"],
  methods: {
    async addOrUpdateRevenueType() {
      this.$emit("addOrUpdateRevenueType");
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
