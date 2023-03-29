<template>
  <b-modal
    id="NewsImgZoom"
    dialog-class="full-screen-modal"
    scrollable
    size="xl"
    centered
    hide-footer
    hide-header
  >
    <!-- <template #modal-title>
      <h3>
        <img src="@/assets/images/news.svg" class="icon-lg" />
        {{ $t("newsData") }}
      </h3>
    </template> -->
    <div @dblclick="setDefualt($event)" class="row overlay">
      <div class="zoom_outer">
        <div
          :style="style"
          id="zoom"
          ref="zoom"
          @mousedown="onmousedown($event)"
          @mouseup="onmouseup()"
          @mousemove="onmousemove($event)"
          @wheel="onwheel($event)"
        >
          <img :src="src" alt="zoom" />
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { setDataMultiLang, timeToLang } from "@/utils/functions";

export default {
  name: "NewsImgZoom",
  components: {},
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      scale: 1,
      panning: false,
      pointX: 0,
      pointY: 0,
      start: {
        x: 0,
        y: 0,
      },
      zoom: this.$refs.zoom,
    };
  },
  computed: {
    style() {
      return {
        transform:
          "translate(" +
          this.pointX +
          "px, " +
          this.pointY +
          "px) scale(" +
          this.scale +
          ")",
      };
    },
  },
  props: ["src"],
  mounted() {
    // let zoomImageScript = document.createElement("script");
    // zoomImageScript.setAttribute("src", "@/assets/js/imgZoom.js");
    // document.head.appendChild(zoomImageScript);
  },
  methods: {
    setDefualt(e) {
      e.view.window.getSelection().removeAllRanges();
      this.scale = 1;
      this.panning = false;
      this.pointX = 0;
      this.pointY = 0;
      this.start = {
        x: 0,
        y: 0,
      };
    },
    onmousedown(e) {
      e.preventDefault();
      this.start = { x: e.clientX - this.pointX, y: e.clientY - this.pointY };
      this.panning = true;
    },
    onmouseup() {
      this.panning = false;
    },
    onmousemove(e) {
      e.preventDefault();
      if (!this.panning) {
        return;
      }
      this.pointX = e.clientX - this.start.x;
      this.pointY = e.clientY - this.start.y;
      // this.setTransform();
    },
    onwheel(e) {
      e.preventDefault();
      var xs = (e.clientX - this.pointX) / this.scale,
        ys = (e.clientY - this.pointY) / this.scale,
        delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
      delta > 0 ? (this.scale *= 1.2) : (this.scale /= 1.2);
      this.pointX = e.clientX - xs * this.scale;
      this.pointY = e.clientY - ys * this.scale;

      // this.setTransform();
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  outline: 0;
  overflow: hidden;
}
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#zoom {
  width: 100%;
  height: 100%;
  transform-origin: 0px 0px;
  transform: scale(1) translate(0px, 0px);
  cursor: grab;
}
div#zoom > img {
  /* width: 100%;
  height: auto; */
  max-width: 100%;
  height: initial;
  max-height: 100vh;
  width: 100%;
}

.overlay {
  width: 100%;
  height: 100%;
  background-color: #2d3436;
  background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
}

.full-screen-modal {
  width: 90% !important;
  max-width: 90% !important;
}
.zoom_outer {
  width: 100% !important;
}
</style>
