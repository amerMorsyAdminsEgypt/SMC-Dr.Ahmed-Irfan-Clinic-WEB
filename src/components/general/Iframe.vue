<template>
  <div>
    <div class="iframe-wrapper">
      <iframe :src="iframe.src" type="application/pdf" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "Iframe",
  data() {
    return {
      loaded: false,
      iframe: {
        src: "http://premco-precast.com/",
      },
    };
  },
};
</script>

<style scoped lang="scss">
.iframe-wrapper {
  width: 100%;
  height: 70vh;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
