<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateMethodPaid()"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'methodPaidNameAr'"
            :value="methodPaidData.methodPaidNameAr"
            :title="$t('nameAr')"
            :imgName="'method-paids.svg'"
            v-on:changeValue="methodPaidData.methodPaidNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'methodPaidNameEn'"
            :value="methodPaidData.methodPaidNameEn"
            :title="$t('nameEn')"
            :imgName="'method-paids.svg'"
            v-on:changeValue="methodPaidData.methodPaidNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'methodPaidNameUnd'"
            :value="methodPaidData.methodPaidNameUnd"
            :title="$t('nameUnd')"
            :imgName="'method-paids.svg'"
            v-on:changeValue="methodPaidData.methodPaidNameUnd = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'methodPaidNotes'"
            :value="methodPaidData.methodPaidNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="methodPaidData.methodPaidNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/method-paids" class="btn btn-cancel">
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
  name: "MethodPaidForm",
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
  props: ["methodPaidData", "submitName"],
  methods: {
    async addOrUpdateMethodPaid() {
      this.$emit("addOrUpdateMethodPaid");
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
