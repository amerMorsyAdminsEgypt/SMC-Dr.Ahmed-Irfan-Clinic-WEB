<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateMealsType"
    >
      <div class="row">
        <div
          class="imgView"
          :style="{ 'background-image': `url(${src})` }"
          :onerror="`this.src='${defaultImg}'`"
          alt="Image"
          @click="selectImage"
        ></div>
        <!-- @input="pickFile" -->
        <input
          ref="fileInput"
          type="file"
          v-on:change="pickFile"
          class="d-none"
        />
      </div>
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-12 col-lg-4'"
            :id="'mealsTypeNameAr'"
            :value="mealsTypeData.mealsTypeNameAr"
            :title="$t('nameAr')"
            :imgName="'meals-types.svg'"
            v-on:changeValue="mealsTypeData.mealsTypeNameAr = $event"
          />

          <CustomInput
            :className="'col-md-12 col-lg-4'"
            :id="'mealsTypeNameEn'"
            :value="mealsTypeData.mealsTypeNameEn"
            :title="$t('nameEn')"
            :imgName="'meals-types.svg'"
            v-on:changeValue="mealsTypeData.mealsTypeNameEn = $event"
          />

          <CustomInput
            :className="'col-md-12 col-lg-4'"
            :id="'mealsTypeNameUnd'"
            :value="mealsTypeData.mealsTypeNameUnd"
            :title="$t('nameUnd')"
            :imgName="'meals-types.svg'"
            v-on:changeValue="mealsTypeData.mealsTypeNameUnd = $event"
          />
          <TextArea
            :className="'col-md-12'"
            :id="'mealsTypeNotes'"
            :value="mealsTypeData.mealsTypeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="mealsTypeData.mealsTypeNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'MealsTypes' }" class="btn btn-cancel">
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
import DEFAULT_IMG from "@/assets/images/meals-types.svg";

export default {
  name: "MealsTypeForm",
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
      src: this.imageSrc,
      defaultImg: DEFAULT_IMG,
    };
  },

  props: ["mealsTypeData", "imageSrc", "submitName"],
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.src = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
        this.mealsTypeData.image = file[0];
      } else {
        this.src = this.defaultImg;
        this.mealsTypeData.image = "";
      }
      // console.log(this.imageSrc);
    },
    async addOrUpdateMealsType() {
      this.$emit("addOrUpdateMealsType");
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
