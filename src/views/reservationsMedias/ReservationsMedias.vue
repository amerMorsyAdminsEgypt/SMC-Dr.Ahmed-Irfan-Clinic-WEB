<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <b-tabs v-if="mediaTypesOptions" content-class="mt-4" fill>
      <b-tab
        v-for="(option, index) in mediaTypesOptions"
        :key="index"
        @click="filterBy(option.itemToken)"
        title-item-class="tab-container-media"
      >
        <template #title>
          <span v-b-popover.hover.bottomright="`${option.itemName}`">
            <b-badge variant="danger" class="count-notifications">{{
              option.itemTotalInnerCount
            }}</b-badge>
            <img
              :src="baseUrl + option.itemImagePath"
              :onerror="`this.src='${defaultImg}'`"
              class="icon-tab"
            />
            <span>{{ option.itemName }}</span>
            <!-- <span class="count-number">{{ option.itemTotalInnerCount }}</span> -->
          </span>
        </template>
      </b-tab>
    </b-tabs>

    <div v-if="reservationsMedias.reservationsMediasData">
      <div class="row">
        <div
          v-for="(media, index) in reservationsMedias.reservationsMediasData"
          :key="index"
          :class="isDoc"
        >
          <ReservationMediaCard
            v-if="
              media.mediaTypeToken == imageToken ||
              media.mediaTypeToken == videoToken
            "
            :reservationMediaData="media"
            v-on:setReservationMediaData="setReservationMediaData($event)"
          />

          <CustomAudioPlayer
            v-if="media.mediaTypeToken == audioToken"
            :id="media.reservationMediaToken"
            :name="media.reservationMediaNameCurrent"
            :artist="media.reservationMediaCode"
            :audioSrc="media.reservationMediaPath"
            :image="defualtImage"
            :reservationMediaData="media"
            v-on:setReservationMediaData="setReservationMediaData($event)"
          />
          <div
            v-if="
              media.mediaTypeToken == exlToken ||
              media.mediaTypeToken == wordToken ||
              media.mediaTypeToken == powToken
            "
            class="row container-collapse-with-btns"
          >
            <b-button
              v-b-toggle="`item${index}`"
              class="btn btn-lg btn-collapse collapse-data"
            >
              <div class="row collapse-title">
                <div class="col-md-12 col-lg-12">
                  {{ media.reservationMediaNameCurrent }}
                </div>
              </div>
              <div class="collapse-icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </div>
            </b-button>
            <div class="collapse-actions btn-collapse">
              <div class="">
                <router-link
                  :to="{
                    name: 'ReservationMediaEdit',
                    params: {
                      clientToken: media.clientToken,
                      reservationMediaToken: media.reservationMediaToken,
                    },
                  }"
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" class="icon-lg" />
                </router-link>
              </div>
              <div class="">
                <button
                  v-b-modal.ReservationMediaDelete
                  class="btn p-0"
                  :title="$t('delete')"
                  @click="setReservationMediaData(media)"
                >
                  <img src="@/assets/images/trash.svg" class="icon-lg" />
                </button>
              </div>
            </div>
            <b-collapse :id="`item${index}`" class="col-md-12 col-lg-12">
              <VueDocPreview
                :url="baseUrl + media.reservationMediaPath"
                :type="`office`"
              />
            </b-collapse>
          </div>
          <div
            v-if="media.mediaTypeToken == pdfToken"
            class="row container-collapse-with-btns"
          >
            <b-button
              v-b-toggle="`item${index}`"
              class="btn btn-lg btn-collapse collapse-data"
            >
              <div class="row collapse-title">
                <div class="col-md-12 col-lg-12">
                  {{ media.reservationMediaNameCurrent }}
                </div>
              </div>
              <div class="collapse-icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </div>
            </b-button>
            <div class="collapse-actions btn-collapse">
              <div class="">
                <router-link
                  :to="{
                    name: 'ReservationMediaEdit',
                    params: {
                      clientToken: media.clientToken,
                      reservationMediaToken: media.reservationMediaToken,
                    },
                  }"
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" class="icon-lg" />
                </router-link>
              </div>
              <div class="">
                <button
                  v-b-modal.ReservationMediaDelete
                  class="btn p-0"
                  :title="$t('delete')"
                  @click="setReservationMediaData(media)"
                >
                  <img src="@/assets/images/trash.svg" class="icon-lg" />
                </button>
              </div>
            </div>
            <b-collapse :id="`item${index}`" class="col-md-12 col-lg-12">
              <vue-pdf-app
                style="height: 100vh"
                :pdf="baseUrl + media.reservationMediaPath"
                theme="dark"
              ></vue-pdf-app>
            </b-collapse>
          </div>
        </div>
      </div>

      <Pagination
        v-if="!isLoading"
        :paginationData="reservationsMedias.pagination"
        v-on:changePage="changePage"
      />
      <NewsImgZoom :src="src" />
      <VideoShowModal :src="src" />
      <ReservationMediaDelete
        :reservationMediaData="reservationMediaData"
        v-on:refresh="getAllReservationsMedias()"
      />
    </div>
    <ExceptionWithImg v-else :msg="exceptionMsg" />

    <ReservationMediaFloatBtns
      :theFilterData="reservationsMedias.filterData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import NewsImgZoom from "@/components/news/NewsImgZoom.vue";
import VideoShowModal from "@/components/general/VideoShowModal.vue";
import VueDocPreview from "vue-doc-preview";
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";
import {
  BASE_URL,
  STATUS,
  NEWS_MEDIA_TYPE_TOKEN_IMAGE,
  NEWS_MEDIA_TYPE_TOKEN_VIDEO,
  NEWS_MEDIA_TYPE_TOKEN_AUDIO,
  NEWS_MEDIA_TYPE_TOKEN_PDF,
  NEWS_MEDIA_TYPE_TOKEN_EXCEL,
  NEWS_MEDIA_TYPE_TOKEN_WORD,
  NEWS_MEDIA_TYPE_TOKEN_POWER_POINT,
} from "@/utils/constants";
import ReservationMediaCard from "@/components/reservationsMedias/ReservationMediaCard.vue";
// import ReservationMediaInfo from "@/components/reservationsMedias/ReservationMediaInfo.vue";
import ReservationMediaDelete from "@/components/reservationsMedias/ReservationMediaDelete.vue";
import ReservationMediaFloatBtns from "@/components/reservationsMedias/ReservationMediaFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import ReservationsMedias from "@/models/reservationsMedias/ReservationsMedias";
import ReservationMedia from "@/models/reservationsMedias/ReservationMedia";
import CustomAudioPlayer from "@/components/general/CustomAudioPlayer.vue";
import DefualtImage from "@/assets/images/media.svg";
import DEFAULT_IMG from "@/assets/images/media.svg";

export default {
  name: "ReservationsMedias",
  components: {
    PreLoader,
    ExceptionWithImg,
    ReservationMediaCard,
    // ReservationMediaInfo,
    ReservationMediaDelete,
    ReservationMediaFloatBtns,
    Pagination,
    CustomAudioPlayer,
    NewsImgZoom,
    VueDocPreview,
    VideoShowModal,
    VuePdfApp,
  },
  props: ["clientToken", "reservationToken"],
  data() {
    return {
      mediaTypesOptions: null,
      isLoading: true,
      isNoContent: false,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      reservationsMedias: new ReservationsMedias(),
      reservationMediaData: new ReservationMedia(),
      defualtImage: DefualtImage,
      imageToken: NEWS_MEDIA_TYPE_TOKEN_IMAGE,
      videoToken: NEWS_MEDIA_TYPE_TOKEN_VIDEO,
      audioToken: NEWS_MEDIA_TYPE_TOKEN_AUDIO,
      pdfToken: NEWS_MEDIA_TYPE_TOKEN_PDF,
      exlToken: NEWS_MEDIA_TYPE_TOKEN_EXCEL,
      wordToken: NEWS_MEDIA_TYPE_TOKEN_WORD,
      powToken: NEWS_MEDIA_TYPE_TOKEN_POWER_POINT,
      baseUrl: BASE_URL,
      defaultImg: DEFAULT_IMG,
      src: "",
      currentTab: "",
    };
  },
  methods: {
    setReservationMediaData(data) {
      this.reservationMediaData.fillData(data);
      if (this.reservationMediaData.reservationMediaPath) {
        this.src = BASE_URL + this.reservationMediaData.reservationMediaPath;
      } else {
        this.src = this.defaultImg;
      }
    },
    filterBy(mediaTypeToken) {
      this.currentTab = mediaTypeToken;
      this.reservationsMedias.filterData.mediaTypeToken = mediaTypeToken;
      this.getAllReservationsMedias();
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
    changePage(page) {
      this.reservationsMedias.pagination.selfPage = page;
      this.getAllReservationsMedias();
    },
    search(data) {
      this.reservationsMedias.filterData.fillData(data);
      this.reservationsMedias.reservationsMediasData = null;
      this.getDialogOfMediaTypes();
      this.getAllReservationsMedias();
    },
    async getDialogOfMediaTypes() {
      this.isLoading = true;
      try {
        const response =
          await this.reservationsMedias.reservationMedia.getDialogOfMediaTypes(
            this.language,
            this.userAuthorizeToken,
            this.reservationsMedias.filterData
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.mediaTypesOptions = response.data.generalStaticList;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.mediaTypesOptions = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.mediaTypesOptions = null;
          this.$store.dispatch("logoutUser");
          this.$router.push("/").catch(() => {});
        } else {
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.mediaTypesOptions = null;
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
    async getAllReservationsMedias() {
      this.isLoading = true;
      try {
        const response =
          await this.reservationsMedias.reservationMedia.getAllReservationsMedias(
            this.language,
            this.userAuthorizeToken,
            this.reservationsMedias.pagination,
            this.reservationsMedias.filterData
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.reservationsMedias.fillData(response.data);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.reservationsMedias.reservationsMediasData = null;
          this.isNoContent = true;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.reservationsMedias.reservationsMediasData = null;
          this.$store.dispatch("logoutUser");
          this.$router.push("/").catch(() => {});
        } else {
          this.reservationsMedias.reservationsMediasData = null;
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.reservationsMedias.reservationsMediasData = null;
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
    setFilter() {
      this.reservationMediaData.clientToken = this.clientToken
        ? this.clientToken
        : "";
      this.reservationsMedias.filterData.clientToken = this.clientToken
        ? this.clientToken
        : "";
      this.reservationsMedias.filterData.reservationToken = this
        .reservationToken
        ? this.reservationToken
        : "";
      this.reservationsMedias.filterData.mediaTypeToken = this.mediaTypeToken
        ? this.mediaTypeToken
        : "";
    },
  },
  computed: {
    isDoc: function () {
      if (
        this.currentTab == this.mediaTypesOptions[0].itemToken ||
        this.currentTab == this.mediaTypesOptions[1].itemToken ||
        this.currentTab == this.mediaTypesOptions[2].itemToken
      ) {
        return "col-md-6";
      } else {
        return "col-md-12";
      }
    },
  },
  async created() {
    this.setFilter();
    await this.getDialogOfMediaTypes();
    this.currentTab = this.mediaTypesOptions[0].itemToken;
    this.reservationsMedias.filterData.mediaTypeToken = this.currentTab;
    this.getAllReservationsMedias();
  },
};
</script>
