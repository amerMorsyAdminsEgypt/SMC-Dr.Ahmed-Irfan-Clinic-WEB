<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateNewsCategory()"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'newsCategoryNameAr'"
            :value="newsCategoryData.newsCategoryNameAr"
            :title="$t('nameAr')"
            :imgName="'category.svg'"
            v-on:changeValue="newsCategoryData.newsCategoryNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'newsCategoryNameEn'"
            :value="newsCategoryData.newsCategoryNameEn"
            :title="$t('nameEn')"
            :imgName="'category.svg'"
            v-on:changeValue="newsCategoryData.newsCategoryNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'newsCategoryNameUnd'"
            :value="newsCategoryData.newsCategoryNameUnd"
            :title="$t('nameUnd')"
            :imgName="'category.svg'"
            v-on:changeValue="newsCategoryData.newsCategoryNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'newsCategoryDescriptionAr'"
            :value="newsCategoryData.newsCategoryDescriptionAr"
            :title="$t('newsCategoryDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="
              newsCategoryData.newsCategoryDescriptionAr = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'newsCategoryDescriptionEn'"
            :value="newsCategoryData.newsCategoryDescriptionEn"
            :title="$t('newsCategoryDescriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="
              newsCategoryData.newsCategoryDescriptionEn = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'newsCategoryDescriptionUnd'"
            :value="newsCategoryData.newsCategoryDescriptionUnd"
            :title="$t('newsCategoryDescriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="
              newsCategoryData.newsCategoryDescriptionUnd = $event
            "
          />

          <TextArea
            :className="'col-md-12'"
            :id="'newsCategoryNotes'"
            :value="newsCategoryData.newsCategoryNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="newsCategoryData.newsCategoryNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/news-categories" class="btn btn-cancel">
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
  name: "NewsCategoryForm",
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
  props: ["newsCategoryData", "submitName"],
  methods: {
    async addOrUpdateNewsCategory() {
      this.$emit("addOrUpdateNewsCategory");
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
