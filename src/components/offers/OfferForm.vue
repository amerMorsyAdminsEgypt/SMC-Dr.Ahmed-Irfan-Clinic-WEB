<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off">
      <div class="row">
        <div class="col-md-12 image-container">
          <div class="imgView" @click="selectMedia">
            <img
              v-if="offerData.offerMediaTypeToken == imageToken"
              :src="src"
              :onerror="`this.src='${defaultImg}'`"
              alt="Image"
              class="fit-container"
            />
            <video
              v-if="offerData.offerMediaTypeToken == videoToken"
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
              v-model="offerData.serviceToken"
              :options="serviceTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/services.svg" />
          </div>
          <CustomInput
            :className="'col-md-6'"
            :id="'offerCode'"
            :value="offerData.offerCode"
            :title="$t('offerCode')"
            :imgName="'number.svg'"
            v-on:changeValue="offerData.offerCode = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'offerTitleAr'"
            :value="offerData.offerTitleAr"
            :maxRows="maxRows"
            :title="$t('offerTitleAr')"
            :imgName="'offers.svg'"
            v-on:changeValue="offerData.offerTitleAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'offerTitleEn'"
            :value="offerData.offerTitleEn"
            :maxRows="maxRows"
            :title="$t('offerTitleEn')"
            :imgName="'offers.svg'"
            v-on:changeValue="offerData.offerTitleEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'offerTitleUnd'"
            :value="offerData.offerTitleUnd"
            :maxRows="maxRows"
            :title="$t('offerTitleUnd')"
            :imgName="'offers.svg'"
            v-on:changeValue="offerData.offerTitleUnd = $event"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="'servicePriceInOffer'"
            :value="offerData.servicePriceInOffer"
            :title="$t('servicePriceInOffer')"
            :imgName="'price-offer.svg'"
            v-on:changeValue="offerData.servicePriceInOffer = $event"
          />

          <DatePicker
            :className="'col-md-6'"
            :id="'offerStartDate'"
            :value="offerData.offerStartDate"
            :title="$t('offerStartDate')"
            :language="language"
            v-on:changeValue="offerData.offerStartDate = $event"
          />
          <DatePicker
            :className="'col-md-6'"
            :id="'offerEndDate'"
            :value="offerData.offerEndDate"
            :title="$t('offerEndDate')"
            :language="language"
            v-on:changeValue="offerData.offerEndDate = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'offerDescriptionAr'"
            :value="offerData.offerDescriptionAr"
            :maxlength="textAreaMaxLenght"
            :maxRows="maxRows"
            :title="$t('offerDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="offerData.offerDescriptionAr = $event"
          />
          <TextArea
            :className="'col-md-12'"
            :id="'offerDescriptionEn'"
            :value="offerData.offerDescriptionEn"
            :maxlength="textAreaMaxLenght"
            :maxRows="maxRows"
            :title="$t('offerDescriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="offerData.offerDescriptionEn = $event"
          />
          <TextArea
            :className="'col-md-12'"
            :id="'offerDescriptionUnd'"
            :value="offerData.offerDescriptionUnd"
            :maxlength="textAreaMaxLenght"
            :maxRows="maxRows"
            :title="$t('offerDescriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="offerData.offerDescriptionUnd = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'offerNotes'"
            :value="offerData.offerNotes"
            :maxlength="textAreaMaxLenght"
            :maxRows="maxRows"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="offerData.offerNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateOffer"
        >
          {{ submitName }}
        </button>
        <router-link to="/offers" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import DEFAULT_OFFERS_IMG from "@/assets/images/offers.svg";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import DatePicker from "@/components/general/DatePicker.vue";
import TextArea from "@/components/general/TextArea.vue";
import createToastMixin from "@/utils/create-toast-mixin";
import {
  VIDEO_EXTENSIONS,
  NEWS_MEDIA_TYPE_TOKEN_IMAGE,
  NEWS_MEDIA_TYPE_TOKEN_VIDEO,
} from "@/utils/constants";
import {
  STATUS,
  TEXT_MAX_LENGTH_SUPER,
  MAX_ROWS_TEXTAREA,
} from "@/utils/constants";
import axios from "axios";

export default {
  name: "OfferForm",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    CustomInputFloat,
    DatePicker,
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
      serviceTokenOptions: [],
      defaultImg: DEFAULT_OFFERS_IMG,
      imageToken: NEWS_MEDIA_TYPE_TOKEN_IMAGE,
      videoToken: NEWS_MEDIA_TYPE_TOKEN_VIDEO,
      videoExtensions: VIDEO_EXTENSIONS,
      textAreaMaxLenght: TEXT_MAX_LENGTH_SUPER,
      maxRows: MAX_ROWS_TEXTAREA,
      src: this.medidaSrc,
      listMediaTypes: this.$store.getters.userData.constantLists.listMediaType,
      labels: {
        ar: {
          weekdayHeaderFormat: "narrow",
          labelPrevDecade: "العقد السابق",
          labelPrevYear: "العام السابق",
          labelPrevMonth: "الشهر السابق",
          labelCurrentMonth: "الشهر الحالي",
          labelNextMonth: "الشهر المقبل",
          labelNextYear: "العام المقبل",
          labelNextDecade: "العقد القادم",
          labelToday: "اليوم",
          labelSelected: "التاريخ المحدد",
          labelNoDateSelected: "لم يتم اختيار تاريخ",
          labelCalendar: "التقويم",
          labelNav: "الملاحة التقويم",
          labelHelp: "استخدم مفاتيح المؤشر للتنقل في التواريخ",
          labelTodayButton: "اليوم",
          labelResetButton: "حذف",

          labelHours: "ساعات",
          labelMinutes: "الدقائق",
          labelSeconds: "ثواني",
          labelAmpm: "صباحا مساء",
          labelAm: "ص",
          labelPm: "م",
          labelIncrement: "زيادة",
          labelDecrement: "إنقاص",
          // labelSelected: "الوقت المحدد",
          labelNoTimeSelected: "لم يتم اختيار وقت",
          labelCloseButton: "إغلاق",
          labelNowButton: "الآن",
        },
      },
    };
  },
  props: ["offerData", "medidaSrc", "submitName"],
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
            this.offerData.offerMediaTypeToken = "MET-2";
          } else {
            this.offerData.offerMediaTypeToken = "MET-1";
          }
          this.src = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
        this.offerData.image = file[0];
      } else {
        this.src = DEFAULT_OFFERS_IMG;
        this.offerData.image = "";
      }
    },
    async getDialogOfServices() {
      this.isLoading = true;
      this.serviceTokenOptions = [];
      this.serviceTokenOptions.push({
        value: "",
        text: this.$t("selectService"),
      });
      try {
        const response = await axios.get(
          `/Services/GetDialogOfServices?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.serviceTokenOptions.push({
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
        this.serviceTokenOptions = null;
      }
      this.isLoading = false;
    },
    async addOrUpdateOffer() {
      this.$emit("addOrUpdateOffer", this.offerData);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  computed: {},
  watch: {},
  async created() {
    this.getDialogOfServices();
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
