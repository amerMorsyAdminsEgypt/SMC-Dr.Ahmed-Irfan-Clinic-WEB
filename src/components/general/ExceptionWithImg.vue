<template>
  <div>
    <img class="icon-err" :src="require('@/assets/images/' + image)" />
    <p class="p-err">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "ExceptionWithImg",
  props: {
    msg: {
      type: String,
    },
    image: {
      type: String,
      default: "illustrator-noData.svg",
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-err {
  width: 100%;
  height: 60vh;
}
.p-err {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  text-align: center !important;
  font-size: xx-large;
  color: #e8505b;
}
</style>
