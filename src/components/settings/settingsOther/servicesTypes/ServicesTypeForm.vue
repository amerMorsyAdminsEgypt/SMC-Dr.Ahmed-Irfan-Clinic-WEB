<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateServicesType"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'serviceTypeNameAr'"
            :value="servicesTypeData.serviceTypeNameAr"
            :title="$t('nameAr')"
            :imgName="'services-types.svg'"
            v-on:changeValue="servicesTypeData.serviceTypeNameAr = $event"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'serviceTypeNameEn'"
            :value="servicesTypeData.serviceTypeNameEn"
            :title="$t('nameEn')"
            :imgName="'services-types.svg'"
            v-on:changeValue="servicesTypeData.serviceTypeNameEn = $event"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'serviceTypeNameUnd'"
            :value="servicesTypeData.serviceTypeNameUnd"
            :title="$t('nameUnd')"
            :imgName="'services-types.svg'"
            v-on:changeValue="servicesTypeData.serviceTypeNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'serviceTypeDescriptionAr'"
            :value="servicesTypeData.serviceTypeDescriptionAr"
            :title="$t('serviceTypeDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="
              servicesTypeData.serviceTypeDescriptionAr = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'serviceTypeDescriptionEn'"
            :value="servicesTypeData.serviceTypeDescriptionEn"
            :title="$t('serviceTypeDescriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="
              servicesTypeData.serviceTypeDescriptionEn = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'serviceTypeDescriptionUnd'"
            :value="servicesTypeData.serviceTypeDescriptionUnd"
            :title="$t('serviceTypeDescriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="
              servicesTypeData.serviceTypeDescriptionUnd = $event
            "
          />

          <TextArea
            :className="'col-md-12'"
            :id="'serviceTypeNotes'"
            :value="servicesTypeData.serviceTypeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="servicesTypeData.serviceTypeNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/services-types" class="btn btn-cancel">
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
  name: "ServicesTypeForm",
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

  props: ["servicesTypeData", "submitName"],
  methods: {
    async addOrUpdateServicesType() {
      this.$emit("addOrUpdateServicesType");
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

<style scoped></style>
