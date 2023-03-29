<template>
  <b-modal id="VideoShowModal" size="xl" centered hide-footer hide-header>
    <div class="video-container">
      <video controls>
        <source :src="src" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "VideoShowModal",
  components: {},
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  computed: {},
  props: ["src"],
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.video-container {
  width: 100%;
}
</style>
