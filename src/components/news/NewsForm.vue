<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off">
      <div class="row">
        <div class="col-md-12 image-container">
          <div class="imgView" @click="selectMedia">
            <img
              v-if="newsData.newsMediaTypeToken == imageToken"
              :src="src"
              :onerror="`this.src='${defaultImg}'`"
              alt="Image"
              class="fit-container"
            />
            <video
              v-if="newsData.newsMediaTypeToken == videoToken"
              class="fit-container"
            >
              <source
                :src="src"
                type="video/mp4"
                :onerror="`this.src='${defaultImg}'`"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <!-- @input="pickFile" -->
          <input
            ref="fileInput"
            type="file"
            v-on:change="pickFile"
            class="d-none"
            accept=".jpg, .jpeg, .png, .mov, .avi, .wmv, .mp4, .m4p, .m4v, .ogg, .mpg, .mp2, .mpeg, .mpe, .mpv, .3gp, .flv"
          />
        </div>
      </div>
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="newsData.newsCategoryToken"
              :options="newsCategoryTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/category.svg" />
          </div>

          <CustomInput
            :className="'col-md-6'"
            :id="'newsCode'"
            :value="newsData.newsCode"
            :title="$t('newsCode')"
            :imgName="'points.svg'"
            v-on:changeValue="newsData.newsCode = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'newsNameAr'"
            :value="newsData.newsNameAr"
            :maxRows="maxRows"
            :title="$t('newsNameAr')"
            :imgName="'news.svg'"
            v-on:changeValue="newsData.newsNameAr = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'newsNameEn'"
            :value="newsData.newsNameEn"
            :maxRows="maxRows"
            :title="$t('newsNameEn')"
            :imgName="'news.svg'"
            v-on:changeValue="newsData.newsNameEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'newsNameUnd'"
            :value="newsData.newsNameUnd"
            :maxRows="maxRows"
            :title="$t('newsNameUnd')"
            :imgName="'news.svg'"
            v-on:changeValue="newsData.newsNameUnd = $event"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'publisherNameAr'"
            :value="newsData.publisherNameAr"
            :title="$t('publisherNameAr')"
            :imgName="'man.svg'"
            v-on:changeValue="newsData.publisherNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'publisherNameEn'"
            :value="newsData.publisherNameEn"
            :title="$t('publisherNameEn')"
            :imgName="'man.svg'"
            v-on:changeValue="newsData.publisherNameEn = $event"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'publisherNameUnd'"
            :value="newsData.publisherNameUnd"
            :title="$t('publisherNameUnd')"
            :imgName="'man.svg'"
            v-on:changeValue="newsData.publisherNameUnd = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'newsDescriptionAr'"
            :value="newsData.newsDescriptionAr"
            :maxlength="textAreaMaxLenght"
            :maxRows="maxRows"
            :title="$t('newsDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="newsData.newsDescriptionAr = $event"
          />
          <TextArea
            :className="'col-md-12'"
            :id="'newsDescriptionEn'"
            :value="newsData.newsDescriptionEn"
            :maxlength="textAreaMaxLenght"
            :maxRows="maxRows"
            :title="$t('newsDescriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="newsData.newsDescriptionEn = $event"
          />
          <TextArea
            :className="'col-md-12'"
            :id="'newsDescriptionUnd'"
            :value="newsData.newsDescriptionUnd"
            :maxlength="textAreaMaxLenght"
            :maxRows="maxRows"
            :title="$t('newsDescriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="newsData.newsDescriptionUnd = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'newsNotes'"
            :value="newsData.newsNotes"
            :maxlength="textAreaMaxLenght"
            :maxRows="maxRows"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="newsData.newsNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateNews"
        >
          {{ submitName }}
        </button>
        <router-link to="/news" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import DEFAULT_NEWS_IMG from "@/assets/images/news-defult-img.svg";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import {
  STATUS,
  TEXT_MAX_LENGTH_SUPER,
  MAX_ROWS_TEXTAREA,
} from "@/utils/constants";
import { setDataMultiLang } from "@/utils/functions";
import axios from "axios";
import createToastMixin from "@/utils/create-toast-mixin";
import {
  VIDEO_EXTENSIONS,
  NEWS_MEDIA_TYPE_TOKEN_IMAGE,
  NEWS_MEDIA_TYPE_TOKEN_VIDEO,
} from "@/utils/constants";

export default {
  name: "NewsForm",
  mixins: [createToastMixin],
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
      defaultImg: DEFAULT_NEWS_IMG,
      imageToken: NEWS_MEDIA_TYPE_TOKEN_IMAGE,
      videoToken: NEWS_MEDIA_TYPE_TOKEN_VIDEO,
      videoExtensions: VIDEO_EXTENSIONS,
      textAreaMaxLenght: TEXT_MAX_LENGTH_SUPER,
      maxRows: MAX_ROWS_TEXTAREA,
      src: this.medidaSrc,
      newsCategoryTokenOptions: [],
      listMediaTypes: this.$store.getters.userData.constantLists.listMediaType,
    };
  },
  props: ["newsData", "medidaSrc", "submitName"],
  methods: {
    selectMedia() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let extension = input.files[0].name.split(".").pop().toLowerCase(); //file extension from input file
        let isVideo = this.videoExtensions.indexOf(extension) > -1;
        let reader = new FileReader();
        reader.onload = (e) => {
          if (isVideo) {
            this.newsData.newsMediaTypeToken = this.listMediaTypes[1].itemToken;
          } else {
            this.newsData.newsMediaTypeToken = "MET-1";
          }
          this.src = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
        this.newsData.image = file[0];
      } else {
        this.src = DEFAULT_NEWS_IMG;
        this.newsData.image = "";
      }
    },
    async addOrUpdateNews() {
      this.$emit("addOrUpdateNews", this.newsData);
    },
    async getDialogOfNewsCategories() {
      this.isLoading = true;
      this.newsCategoryTokenOptions = [];
      this.newsCategoryTokenOptions.push({
        value: "",
        text: this.$t("selectNewsCategory"),
      });
      try {
        const response = await axios.get(
          `/NewsCategories/GetDialogOfNewsCategories?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.newsCategoryTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.newsCategoryTokenOptions = null;
      }
      this.isLoading = false;
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  computed: {},
  watch: {},
  async created() {
    this.getDialogOfNewsCategories();
  },
};
</script>

<style lang="scss" scoped>
.fit-container {
  height: -webkit-fill-available;
  width: -webkit-fill-available;
  height: -moz-available;
  width: -moz-available;
}
.videoInsert {
  position: absolute;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  background-size: cover;
  overflow: hidden;
}
</style>
