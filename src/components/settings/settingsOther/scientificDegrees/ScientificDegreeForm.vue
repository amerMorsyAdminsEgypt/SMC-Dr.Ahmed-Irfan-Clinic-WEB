<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateScientificDegree()"
    >
      <div class="my-card">
        <div class="row">
          <TextArea
            :className="'col-md-6'"
            :id="'scientificDegreeNameAr'"
            :value="scientificDegreeData.scientificDegreeNameAr"
            :title="$t('nameAr')"
            :imgName="'scientific-degrees.svg'"
            v-on:changeValue="
              scientificDegreeData.scientificDegreeNameAr = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'scientificDegreeNameEn'"
            :value="scientificDegreeData.scientificDegreeNameEn"
            :title="$t('nameEn')"
            :imgName="'scientific-degrees.svg'"
            v-on:changeValue="
              scientificDegreeData.scientificDegreeNameEn = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'scientificDegreeNameUnd'"
            :value="scientificDegreeData.scientificDegreeNameUnd"
            :title="$t('nameUnd')"
            :imgName="'scientific-degrees.svg'"
            v-on:changeValue="
              scientificDegreeData.scientificDegreeNameUnd = $event
            "
          />

          <TextArea
            :className="'col-md-6'"
            :id="'scientificDegreeDescriptionAr'"
            :value="scientificDegreeData.scientificDegreeDescriptionAr"
            :title="$t('scientificDegreeDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="
              scientificDegreeData.scientificDegreeDescriptionAr = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'scientificDegreeDescriptionEn'"
            :value="scientificDegreeData.scientificDegreeDescriptionEn"
            :title="$t('scientificDegreeDescriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="
              scientificDegreeData.scientificDegreeDescriptionEn = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'scientificDegreeDescriptionUnd'"
            :value="scientificDegreeData.scientificDegreeDescriptionUnd"
            :title="$t('scientificDegreeDescriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="
              scientificDegreeData.scientificDegreeDescriptionUnd = $event
            "
          />

          <TextArea
            :className="'col-md-12'"
            :id="'scientificDegreeNotes'"
            :value="scientificDegreeData.scientificDegreeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="
              scientificDegreeData.scientificDegreeNotes = $event
            "
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/scientific-degrees" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
// import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "ScientificDegreeForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    // CustomInput,
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
  props: ["scientificDegreeData", "submitName"],
  methods: {
    async addOrUpdateScientificDegree() {
      this.$emit("addOrUpdateScientificDegree");
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
