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
                v-if="newsData.newsMediaTypeToken == imageToken"
                :src="imgSrc"
                :onerror="`this.src='${defaultImg}'`"
                alt="Image"
                class="news-image"
                fluid-grow
                v-b-modal.NewsImgZoom
                ref="img"
                @click="setSrc"
              >
              </b-img>
              <video
                v-if="newsData.newsMediaTypeToken == videoToken"
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
                v-b-modal.NewsInfo
                class="btn p-0 top-right"
                :title="$t('info')"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </div>
            <div class="news-data">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <p class="news-date h6 mb-2">
                    <b-icon
                      icon="calendar2-check"
                      animation="throb"
                      variant="success"
                      scale="1.2"
                      class="margin"
                    ></b-icon
                    >{{ timeToLang(newsData.actionDateTime) }}
                  </p>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 end">
                  <p class="news-date h6 mb-2">
                    <b-icon
                      icon="person-fill"
                      animation="throb"
                      variant="info"
                      scale="1.2"
                      class="margin"
                    ></b-icon
                    >{{ $t("publisherName") }}:
                    {{
                      newsData.publisherNameCurrent ||
                      newsData.publisherNameCurrent === 0
                        ? newsData.publisherNameCurrent
                        : $t("notFound")
                    }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <h1 class="h5 mb-2">
                    {{ newsData.newsNameCurrent }}
                  </h1>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="">
                    {{ newsData.newsDescriptionCurrent }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-md-3 col-sm-12 sidebar">sidebar</div> -->
        </div>
      </div>
      <NewsInfo :newsData="newsData" />
      <NewsImgZoom :src="src" />
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
import DEFAULT_NEWS_IMG from "@/assets/images/news-defult-img.svg";
import NewsInfo from "@/components/news/NewsInfo.vue";
import NewsImgZoom from "@/components/news/NewsImgZoom.vue";
import News from "@/models/news/News";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "NewsItem",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    NewsInfo,
    NewsImgZoom,
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
      defaultImg: DEFAULT_NEWS_IMG,
      newsData: new News(),
      newsToken: this.$route.params.newsToken,
      src: "",
    };
  },
  methods: {
    async getNewsDetails() {
      this.isLoading = true;
      this.newsData.newsToken = this.newsToken;
      try {
        let response = await this.newsData.getNewsDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.newsData.fillData(response.data.newsData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.newsData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.newsData = null;
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
      return BASE_URL + this.newsData.newsMediaPath;
    },
  },
  async created() {
    this.getNewsDetails();
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
