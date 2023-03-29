<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateBodyAnatomyType"
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
          accept=".jpg, .jpeg, .png"
        />
      </div>
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'bodyAnatomyTypeNameAr'"
            :value="bodyAnatomyTypeData.bodyAnatomyTypeNameAr"
            :title="$t('nameAr')"
            :imgName="'anatomy-types.svg'"
            v-on:changeValue="
              bodyAnatomyTypeData.bodyAnatomyTypeNameAr = $event
            "
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'bodyAnatomyTypeNameEn'"
            :value="bodyAnatomyTypeData.bodyAnatomyTypeNameEn"
            :title="$t('nameEn')"
            :imgName="'anatomy-types.svg'"
            v-on:changeValue="
              bodyAnatomyTypeData.bodyAnatomyTypeNameEn = $event
            "
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'bodyAnatomyTypeNameUnd'"
            :value="bodyAnatomyTypeData.bodyAnatomyTypeNameUnd"
            :title="$t('nameUnd')"
            :imgName="'anatomy-types.svg'"
            v-on:changeValue="
              bodyAnatomyTypeData.bodyAnatomyTypeNameUnd = $event
            "
          />

          <TextArea
            :className="'col-md-6'"
            :id="'bodyAnatomyTypeDescriptionAr'"
            :value="bodyAnatomyTypeData.bodyAnatomyTypeDescriptionAr"
            :title="$t('descriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="
              bodyAnatomyTypeData.bodyAnatomyTypeDescriptionAr = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'bodyAnatomyTypeDescriptionEn'"
            :value="bodyAnatomyTypeData.bodyAnatomyTypeDescriptionEn"
            :title="$t('descriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="
              bodyAnatomyTypeData.bodyAnatomyTypeDescriptionEn = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'bodyAnatomyTypeDescriptionUnd'"
            :value="bodyAnatomyTypeData.bodyAnatomyTypeDescriptionUnd"
            :title="$t('descriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="
              bodyAnatomyTypeData.bodyAnatomyTypeDescriptionUnd = $event
            "
          />

          <TextArea
            :className="'col-md-12'"
            :id="'bodyAnatomyTypeNotes'"
            :value="bodyAnatomyTypeData.bodyAnatomyTypeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="bodyAnatomyTypeData.bodyAnatomyTypeNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/body-anatomy-types" class="btn btn-cancel">
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
import DEFAULT_IMG from "@/assets/images/anatomy-types.svg";

export default {
  name: "BodyAnatomyTypeForm",
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

  props: ["bodyAnatomyTypeData", "imageSrc", "submitName"],
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
        this.bodyAnatomyTypeData.image = file[0];
      } else {
        this.src = this.defaultImg;
        this.bodyAnatomyTypeData.image = "";
      }
      // console.log(this.imageSrc);
    },
    async addOrUpdateBodyAnatomyType() {
      this.$emit("addOrUpdateBodyAnatomyType");
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
