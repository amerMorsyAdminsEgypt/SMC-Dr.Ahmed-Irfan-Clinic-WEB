<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />
    <div v-if="!isLoading">
      <div class="container-flud">
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <div
              @mouseover="showInfo"
              @mouseleave="hideInfo"
              class="row img-row"
            >
              <b-img
                v-if="offerData.offerMediaTypeToken == imageToken"
                :src="imgSrc"
                :onerror="`this.src='${defaultImg}'`"
                alt="Image"
                class="news-image"
                fluid-grow
                v-b-modal.OfferImgZoom
                ref="img"
                @click="setSrc"
              >
              </b-img>
              <video
                v-if="offerData.offerMediaTypeToken == videoToken"
                class="video-container"
                controls
                style="cursor: pointer"
              >
                <source
                  :src="imgSrc"
                  type="video/mp4"
                  :onerror="`this.src='${defaultImg}'`"
                />
                Your browser does not support the video tag.
              </video>
              <button
                v-show="showInfoIcon"
                v-b-modal.OfferInfo
                class="btn p-0 top-right"
                :title="$t('info')"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </div>
            <div class="news-data">
              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-12">
                  <p class="news-date h6 mb-2">
                    <b-icon
                      icon="tags"
                      animation="throb"
                      variant="info"
                      scale="1.2"
                      class="margin"
                    ></b-icon
                    >{{ $t("servicePriceInOffer") }}:
                    {{ offerData.servicePriceInOffer }}
                  </p>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12">
                  <p class="news-date h6 mb-2">
                    <b-icon
                      icon="calendar2-check"
                      animation="throb"
                      variant="success"
                      scale="1.2"
                      class="margin"
                    ></b-icon
                    >{{ $t("offerStartDate") }}: {{ offerData.offerStartDate }}
                  </p>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 end">
                  <p class="news-date h6 mb-2">
                    <b-icon
                      icon="calendar2-check"
                      animation="throb"
                      variant="danger"
                      scale="1.2"
                      class="margin"
                    ></b-icon
                    >{{ $t("offerEndDate") }}: {{ offerData.offerEndDate }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <h1 class="h5 mb-2">
                    {{ offerData.offerTitleCurrent }}
                  </h1>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="">
                    {{ offerData.offerDescriptionCurrent }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-md-3 col-sm-12 sidebar">sidebar</div> -->
        </div>
      </div>
      <OfferInfo :offerData="offerData" />
      <OfferImgZoom :src="src" />
    </div>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import {
  STATUS,
  NEWS_MEDIA_TYPE_TOKEN_IMAGE,
  NEWS_MEDIA_TYPE_TOKEN_VIDEO,
} from "@/utils/constants";
import { BASE_URL } from "@/utils/constants";
import { timeToLang } from "@/utils/functions";
import DEFAULT_OFFERS_IMG from "@/assets/images/offers.svg";
import OfferInfo from "@/components/offers/OfferInfo.vue";
import OfferImgZoom from "@/components/offers/OfferImgZoom.vue";
import Offer from "@/models/offers/Offer";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OfferItem",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfferInfo,
    OfferImgZoom,
  },
  data() {
    return {
      isLoading: true,
      showInfoIcon: false,
      exceptionMsg: null,
      exceptionImg: null,
      imageToken: NEWS_MEDIA_TYPE_TOKEN_IMAGE,
      videoToken: NEWS_MEDIA_TYPE_TOKEN_VIDEO,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      listMediaTypes: this.$store.getters.userData.constantLists.listMediaType,
      defaultImg: DEFAULT_OFFERS_IMG,
      offerData: new Offer(),
      offerToken: this.$route.params.offerToken,
      src: "",
    };
  },
  methods: {
    async getOfferDetails() {
      this.isLoading = true;
      this.offerData.offerToken = this.offerToken;
      try {
        let response = await this.offerData.getOfferDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.offerData.fillData(response.data.offerData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.offerData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.offerData = null;
      }
      this.isLoading = false;
    },
    setSrc() {
      this.src = this.$refs.img.src;
    },
    showInfo() {
      this.showInfoIcon = true;
    },
    hideInfo() {
      this.showInfoIcon = false;
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
  },
  computed: {
    imgSrc: function () {
      return BASE_URL + this.offerData.offerMediaPath;
    },
  },
  async created() {
    this.getOfferDetails();
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  background-color: #000;
  color: #fff;
}
.img-row {
  margin-bottom: 15px;
  position: relative;
  height: 40vh;
}
.news-image {
  height: 50vh;
  max-height: 70vh;
}
.news-data {
  background-color: #dadee21a;
  padding: 0 10px;
}
.news-data .news-title {
  font-weight: bold;
  text-transform: capitalize;
  margin: 15px;
}
.news-data .news-description {
  background-color: aqua;
}
.margin {
  margin: 0 5px;
}
.center {
  margin: 0 auto;
}
.flex {
  display: flex;
  justify-content: center;
}
.end {
  text-align: end;
}
.top-right {
  position: absolute;
  left: 5px;
  top: 5px;
}
.video-container {
  width: -webkit-fill-available;
  height: -webkit-fill-available;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .img-row {
    height: 30vh;
  }
  .news-image {
    height: 30vh;
    max-height: 70vh;
  }
  .end {
    text-align: start;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .img-row {
    height: 35vh;
  }
  .news-image {
    height: 40vh;
    max-height: 70vh;
  }
  .end {
    text-align: start;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .img-row {
    height: 45vh;
  }
  .news-image {
    height: 45vh;
    max-height: 70vh;
  }
  .end {
    text-align: end;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .img-row {
    height: 45vh;
  }
  .news-image {
    height: 45vh;
    max-height: 70vh;
  }
  .end {
    text-align: end;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .img-row {
    height: 45vh;
  }
  .news-image {
    height: 45vh;
    max-height: 70vh;
  }
  .end {
    text-align: end;
  }
}
</style>
