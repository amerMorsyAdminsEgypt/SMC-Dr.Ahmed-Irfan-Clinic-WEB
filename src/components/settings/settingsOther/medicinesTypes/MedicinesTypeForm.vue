<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateMedicinesType()"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'medicinesTypeNameAr'"
            :value="medicinesTypeData.medicinesTypeNameAr"
            :title="$t('nameAr')"
            :imgName="'medicines-types.svg'"
            v-on:changeValue="medicinesTypeData.medicinesTypeNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'medicinesTypeNameEn'"
            :value="medicinesTypeData.medicinesTypeNameEn"
            :title="$t('nameEn')"
            :imgName="'medicines-types.svg'"
            v-on:changeValue="medicinesTypeData.medicinesTypeNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'medicinesTypeNameUnd'"
            :value="medicinesTypeData.medicinesTypeNameUnd"
            :title="$t('nameUnd')"
            :imgName="'medicines-types.svg'"
            v-on:changeValue="medicinesTypeData.medicinesTypeNameUnd = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'medicinesTypeNotes'"
            :value="medicinesTypeData.medicinesTypeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="medicinesTypeData.medicinesTypeNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/medicines-types" class="btn btn-cancel">
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
  name: "MedicinesTypeForm",
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
  props: ["medicinesTypeData", "submitName"],
  methods: {
    async addOrUpdateMedicinesType() {
      this.$emit("addOrUpdateMedicinesType");
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
