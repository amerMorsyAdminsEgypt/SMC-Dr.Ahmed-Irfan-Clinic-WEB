<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateQuestionsType"
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
            :id="'questionsTypeNameAr'"
            :value="questionsTypeData.questionsTypeNameAr"
            :title="$t('nameAr')"
            :imgName="'questions.svg'"
            v-on:changeValue="questionsTypeData.questionsTypeNameAr = $event"
          />

          <CustomInput
            :className="'col-md-12 col-lg-4'"
            :id="'questionsTypeNameEn'"
            :value="questionsTypeData.questionsTypeNameEn"
            :title="$t('nameEn')"
            :imgName="'questions.svg'"
            v-on:changeValue="questionsTypeData.questionsTypeNameEn = $event"
          />

          <CustomInput
            :className="'col-md-12 col-lg-4'"
            :id="'questionsTypeNameUnd'"
            :value="questionsTypeData.questionsTypeNameUnd"
            :title="$t('nameUnd')"
            :imgName="'questions.svg'"
            v-on:changeValue="questionsTypeData.questionsTypeNameUnd = $event"
          />
          <TextArea
            :className="'col-md-12'"
            :id="'questionsTypeNotes'"
            :value="questionsTypeData.questionsTypeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="questionsTypeData.questionsTypeNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'QuestionsTypes' }" class="btn btn-cancel">
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
import DEFAULT_IMG from "@/assets/images/questions.svg";

export default {
  name: "QuestionsTypeForm",
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

  props: ["questionsTypeData", "imageSrc", "submitName"],
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
        this.questionsTypeData.image = file[0];
      } else {
        this.src = this.defaultImg;
        this.questionsTypeData.image = "";
      }
      // console.log(this.imageSrc);
    },
    async addOrUpdateQuestionsType() {
      this.$emit("addOrUpdateQuestionsType");
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
