<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateBloodType()"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'bloodTypeNameAr'"
            :value="bloodTypeData.bloodTypeNameAr"
            :title="$t('nameAr')"
            :imgName="'blood-types.svg'"
            v-on:changeValue="bloodTypeData.bloodTypeNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'bloodTypeNameEn'"
            :value="bloodTypeData.bloodTypeNameEn"
            :title="$t('nameEn')"
            :imgName="'blood-types.svg'"
            v-on:changeValue="bloodTypeData.bloodTypeNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'bloodTypeNameUnd'"
            :value="bloodTypeData.bloodTypeNameUnd"
            :title="$t('nameUnd')"
            :imgName="'blood-types.svg'"
            v-on:changeValue="bloodTypeData.bloodTypeNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'bloodTypeDescriptionAr'"
            :value="bloodTypeData.bloodTypeDescriptionAr"
            :title="$t('bloodTypeDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="bloodTypeData.bloodTypeDescriptionAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'bloodTypeDescriptionEn'"
            :value="bloodTypeData.bloodTypeDescriptionEn"
            :title="$t('bloodTypeDescriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="bloodTypeData.bloodTypeDescriptionEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'bloodTypeDescriptionUnd'"
            :value="bloodTypeData.bloodTypeDescriptionUnd"
            :title="$t('bloodTypeDescriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="bloodTypeData.bloodTypeDescriptionUnd = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'bloodTypeNotes'"
            :value="bloodTypeData.bloodTypeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="bloodTypeData.bloodTypeNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/blood-types" class="btn btn-cancel">
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
  name: "BloodTypeForm",
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
  props: ["bloodTypeData", "submitName"],
  methods: {
    async addOrUpdateBloodType() {
      this.$emit("addOrUpdateBloodType");
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
