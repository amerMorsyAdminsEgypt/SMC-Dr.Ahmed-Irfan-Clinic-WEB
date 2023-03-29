<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateReservationMedia()"
    >
      <div class="row">
        <div class="col-md-12">
          <VueFileAgent
            ref="vueFileAgent"
            :theme="'grid'"
            :multiple="false"
            :deletable="true"
            :meta="true"
            :helpText="$t('uploadMedia')"
            @select="filesSelected($event)"
            @beforedelete="onBeforeDelete($event)"
            @delete="fileDeleted($event)"
            v-model="fileRecords"
          ></VueFileAgent>
        </div>
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'reservationToken'"
            :value="reservationMediaData.reservationToken"
            :options="reservationTokenOptions"
            v-on:changeValue="reservationMediaData.reservationToken = $event"
            :title="$t('reservationsMedias.pleaseSelectReservation')"
            :imgName="'services-reservations.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'reservationMediaNameAr'"
            :value="reservationMediaData.reservationMediaNameAr"
            v-on:changeValue="
              reservationMediaData.reservationMediaNameAr = $event
            "
            :title="$t('reservationsMedias.nameAr')"
            :imgName="'media.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'reservationMediaNameEn'"
            :value="reservationMediaData.reservationMediaNameEn"
            v-on:changeValue="
              reservationMediaData.reservationMediaNameEn = $event
            "
            :title="$t('reservationsMedias.nameEn')"
            :imgName="'media.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'reservationMediaNameUnd'"
            :value="reservationMediaData.reservationMediaNameUnd"
            v-on:changeValue="
              reservationMediaData.reservationMediaNameUnd = $event
            "
            :title="$t('reservationsMedias.nameUnd')"
            :imgName="'media.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'reservationMediaDescriptionAr'"
            :value="reservationMediaData.reservationMediaDescriptionAr"
            v-on:changeValue="
              reservationMediaData.reservationMediaDescriptionAr = $event
            "
            :title="$t('reservationsMedias.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'reservationMediaDescriptionEn'"
            :value="reservationMediaData.reservationMediaDescriptionEn"
            v-on:changeValue="
              reservationMediaData.reservationMediaDescriptionEn = $event
            "
            :title="$t('reservationsMedias.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'reservationMediaDescriptionUnd'"
            :value="reservationMediaData.reservationMediaDescriptionUnd"
            v-on:changeValue="
              reservationMediaData.reservationMediaDescriptionUnd = $event
            "
            :title="$t('reservationsMedias.descriptionUnd')"
            :imgName="'description.svg'"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link
          :to="`/reservations-medias/${reservationMediaData.clientToken}`"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import {
  STATUS,
  IMAGE_EXTENSIONS,
  VIDEO_EXTENSIONS,
  AUDIO_EXTENSIONS,
  PDF_EXTENSIONS,
  EXCEL_EXTENSIONS,
  WORD_EXTENSIONS,
  POWER_POINT_EXTENSIONS,
  NEWS_MEDIA_TYPE_TOKEN_IMAGE,
  NEWS_MEDIA_TYPE_TOKEN_VIDEO,
  NEWS_MEDIA_TYPE_TOKEN_AUDIO,
  NEWS_MEDIA_TYPE_TOKEN_PDF,
  NEWS_MEDIA_TYPE_TOKEN_EXCEL,
  NEWS_MEDIA_TYPE_TOKEN_WORD,
  NEWS_MEDIA_TYPE_TOKEN_POWER_POINT,
} from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/media.svg";
import TextArea from "@/components/general/TextArea.vue";
import createToastMixin from "@/utils/create-toast-mixin";
import Reservation from "@/models/servicesReservations/ServicesReservation";

export default {
  name: "ReservationMediaForm",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    TextArea,
    CustomSelectBox,
  },
  data() {
    return {
      fileRecords: [],
      fileRecordsForUpload: [], // maintain an upload queue
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      defaultImg: DEFAULT_IMG,
      imageExtensions: IMAGE_EXTENSIONS,
      videoExtensions: VIDEO_EXTENSIONS,
      audioExtensions: AUDIO_EXTENSIONS,
      pdfExtensions: PDF_EXTENSIONS,
      exlExtensions: EXCEL_EXTENSIONS,
      wordExtensions: WORD_EXTENSIONS,
      powExtensions: POWER_POINT_EXTENSIONS,
      imageToken: NEWS_MEDIA_TYPE_TOKEN_IMAGE,
      videoToken: NEWS_MEDIA_TYPE_TOKEN_VIDEO,
      audioToken: NEWS_MEDIA_TYPE_TOKEN_AUDIO,
      pdfToken: NEWS_MEDIA_TYPE_TOKEN_PDF,
      exlToken: NEWS_MEDIA_TYPE_TOKEN_EXCEL,
      worToken: NEWS_MEDIA_TYPE_TOKEN_WORD,
      powToken: NEWS_MEDIA_TYPE_TOKEN_POWER_POINT,
      src: this.mediaSrc,
      reservationData: new Reservation(),
      reservationTokenOptions: [],
    };
  },
  props: ["reservationMediaData", "mediaSrc", "submitName"],
  methods: {
    selectMedia() {
      this.$refs.fileInput.click();
    },
    filesSelected: function (fileRecord) {
      if (fileRecord && fileRecord[0]) {
        let extension = fileRecord[0].ext;
        let isImage = this.imageExtensions.indexOf(extension) > -1;
        let isVideo = this.videoExtensions.indexOf(extension) > -1;
        let isAudio = this.audioExtensions.indexOf(extension) > -1;
        let isPdf = this.pdfExtensions.indexOf(extension) > -1;
        let isExl = this.exlExtensions.indexOf(extension) > -1;
        let isWor = this.wordExtensions.indexOf(extension) > -1;
        let isPow = this.powExtensions.indexOf(extension) > -1;

        if (isImage) {
          this.reservationMediaData.mediaTypeToken = this.imageToken;
        } else if (isVideo) {
          this.reservationMediaData.mediaTypeToken = this.videoToken;
        } else if (isAudio) {
          this.reservationMediaData.mediaTypeToken = this.audioToken;
        } else if (isPdf) {
          this.reservationMediaData.mediaTypeToken = this.pdfToken;
        } else if (isExl) {
          this.reservationMediaData.mediaTypeToken = this.exlToken;
        } else if (isWor) {
          this.reservationMediaData.mediaTypeToken = this.worToken;
        } else if (isPow) {
          this.reservationMediaData.mediaTypeToken = this.powToken;
        }

        this.$emit("input", fileRecord[0].file);
        this.reservationMediaData.media = fileRecord[0].file;
      } else {
        this.reservationMediaData.media = "";
      }
    },
    onBeforeDelete: function (fileRecord) {
      this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
    },
    fileDeleted: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      }
    },
    async getDialogOfServicesReservations() {
      this.isLoading = true;
      this.reservationTokenOptions = [];
      try {
        let response =
          await this.reservationData.getDialogOfServicesReservations(
            this.language,
            this.userAuthorizeToken
          );
        const itemsData = response.data.itemsData;

        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.reservationTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser");
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async addOrUpdateReservationMedia() {
      this.$emit("addOrUpdateReservationMedia");
    },
  },
  watch: {},
  async created() {
    this.reservationData.clientToken = this.$route.params.clientToken
      ? this.$route.params.clientToken
      : "";
    this.getDialogOfServicesReservations();

    // fetch("https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg")
    //   .then((res) => res.blob()) // Gets the response and returns it as a blob
    //   .then((blob) => {
    //     const myFile = new File([blob], "fileTest", {
    //       type: blob.type,
    //     });
    //     this.fileRecords.push(myFile);
    //   });
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
