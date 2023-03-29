<template>
  <div class="carousel-container">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="@/assets/images/slider1.gif"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="@/assets/images/slider2.gif"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="@/assets/images/slider3.gif"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="@/assets/images/slider4.gif"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "Slider",
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style scoped lang="scss">
.carousel-container {
  // height: calc(100vh - 3.3rem);
  // height: 50%;
  overflow: hidden;
  .carousel {
    height: 100%;
  }
}
.carousel-caption {
  background: #00000066 !important;
  color: #fff !important;
  p,
  h1,
  h3 {
    background: #00000066 !important;
    color: #fff !important;
  }
}
</style>
