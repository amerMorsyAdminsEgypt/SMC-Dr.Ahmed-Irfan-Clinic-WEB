<template>
  <div>
    <figure
      class="card"
      @mouseover="showAllActions"
      @mouseleave="hideAllActions"
    >
      <img
        v-if="
          reservationMediaData.mediaTypeToken == imageToken ||
          reservationMediaData.mediaTypeToken == ''
        "
        class="mainImg"
        :src="mediaSrc"
        :onerror="`this.src='${defaultImg}'`"
        alt="Image"
        v-b-modal.NewsImgZoom
        @click="setReservationMediaData()"
      />
      <b-icon
        v-if="reservationMediaData.mediaTypeToken == videoToken"
        icon="play-circle"
        animation="throb"
        variant="danger"
        scale="0.9"
        font-scale="5"
        id="play-icon"
      ></b-icon>

      <video
        v-if="reservationMediaData.mediaTypeToken == videoToken"
        class="video-container"
        v-b-modal.VideoShowModal
        @click="setReservationMediaData()"
      >
        <source
          :src="mediaSrc"
          type="video/mp4"
          :onerror="`this.src='${defaultImg}'`"
        />
        Your browser does not support the video tag.
      </video>

      <footer v-show="showActions">
        <div class="card-actions">
          <router-link
            :to="{
              name: 'ReservationMediaEdit',
              params: {
                clientToken: clientToken,
                reservationMediaToken:
                  reservationMediaData.reservationMediaToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
          <button
            v-b-modal.ReservationMediaDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setReservationMediaData(reservationMediaData)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
        </div>
      </footer>
      <router-link
        v-if="reservationMediaData.reservationMediaNameCurrent"
        :to="`#`"
        :title="reservationMediaData.reservationMediaNameCurrent"
      >
        <!-- :to="`/reservation-media-item/${reservationMediaData.reservationMediaToken}`" -->
        <figcaption>
          <h3 class="cut-2line">
            {{ reservationMediaData.reservationMediaNameCurrent }}
          </h3>
        </figcaption>
      </router-link>
    </figure>
  </div>
</template>

<script>
import {
  BASE_URL,
  NEWS_MEDIA_TYPE_TOKEN_IMAGE,
  NEWS_MEDIA_TYPE_TOKEN_VIDEO,
  NEWS_MEDIA_TYPE_TOKEN_AUDIO,
} from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/media.svg";

export default {
  name: "ReservationMediaCard",
  components: {},
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG,
      imageToken: NEWS_MEDIA_TYPE_TOKEN_IMAGE,
      videoToken: NEWS_MEDIA_TYPE_TOKEN_VIDEO,
      audioToken: NEWS_MEDIA_TYPE_TOKEN_AUDIO,
      showActions: false,
      clientToken: "",
      src: "",
    };
  },
  props: ["reservationMediaData"],
  methods: {
    setReservationMediaData() {
      this.$emit("setReservationMediaData", this.reservationMediaData);
    },
    showAllActions() {
      this.showActions = true;
    },
    hideAllActions() {
      this.showActions = false;
    },
    setSrc(refrance) {
      console.log(refrance);
      this.src = this.$refs.refrance.src;
      // if (this.$refs.img) {

      // if (this.$refs.img) {
      //   this.src = this.$refs.img.src;
      // } else {
      //   this.src = this.$refs.vieod.src;
      // }
    },
  },
  computed: {
    mediaSrc: function () {
      if (this.reservationMediaData.reservationMediaPath) {
        return BASE_URL + this.reservationMediaData.reservationMediaPath;
      }
      return this.defaultImg;
    },
  },
  async created() {
    this.clientToken = this.$route.params.clientToken
      ? this.$route.params.clientToken
      : "";
  },
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Raleway:400,600,700);
@import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);
figure.card {
  font-family: "Raleway", Arial, sans-serif;
  position: relative;
  overflow: hidden;
  margin: 10px;
  min-width: 250px;
  width: 100%;
  background-color: #ffffff;
  color: #fff;
  font-size: 16px;
  box-shadow: 0 0 5px #00000026;
  height: auto;
  width: 100%;
  height: 300px;
  border-radius: 15px;
  cursor: pointer;
}
figure.card * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
figure.card img.mainImg {
  max-width: 100%;
  vertical-align: top;
  position: relative;
  min-height: 300px;
  height: 100%;
  object-fit: fill;
  width: -webkit-fill-available;
}
figure.card figcaption {
  position: absolute;
  bottom: 0;
  padding: 30px auto;
  background-color: #49505787;
  box-shadow: 1px 1px 7px #495057;
  border-radius: 3px;
  height: 96px;
  overflow: hidden;
  width: 100%;
  padding-top: 30px;
  padding-inline-start: 15px;
}

figure.card h3,
figure.card p {
  margin: 0;
  padding: 0;
  color: #fff;
}
figure.card h3 {
  min-height: 50px;
  margin-bottom: 5px;
}
figure.card p {
  font-size: 0.8em;
  margin-bottom: 20px;
  line-height: 1.6em;
}
figure.card footer {
  background-color: #49505787;
  color: #e6e6e6;
  position: absolute;
  top: 0;
  width: 100%;
  max-height: 55px;
  border-radius: 5px;
  display: flex;
  align-content: flex-start;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
}
figure.card footer .card-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 4px;
  width: 100%;
}
figure.card:hover img,
figure.card.hover img {
  -webkit-transform: scale(1.15);
  transform: scale(1.15);
}
.mainLink {
  height: 100%;
}

#play-icon {
  position: absolute;
  top: 33%;
  left: 42%;
}

.video-container video {
  width: 100%;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  figure.card {
    font-family: "Raleway", Arial, sans-serif;
    position: relative;
    overflow: hidden;
    margin: 10px;
    min-width: 250px;
    width: 100%;
    background-color: #ffffff;
    color: #fff;
    font-size: 16px;
    box-shadow: 0 0 5px #00000026;
    height: auto;
    width: 100%;
    height: 300px;
    border-radius: 15px;
  }
  figure.card img.mainImg {
    min-height: 300px;
    height: 100%;
    -o-object-fit: cover;
    object-fit: fill;
    height: 30px;
    width: 100%;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  figure.card {
    font-family: "Raleway", Arial, sans-serif;
    position: relative;
    overflow: hidden;
    margin: 10px;
    min-width: 250px;
    width: 100%;
    background-color: #ffffff;
    color: #fff;
    font-size: 16px;
    box-shadow: 0 0 5px #00000026;
    height: auto;
    width: 100%;
    height: 300px;
    border-radius: 15px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
}
</style>
