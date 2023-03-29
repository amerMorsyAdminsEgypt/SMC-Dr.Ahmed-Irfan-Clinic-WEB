<template>
  <div class="data-label-group" :class="className">
    <p>{{ value || value === 0 ? value : $t("notFound") }}</p>
    <label>{{ title ? title : $t("notFound") }}</label>
    <img :src="require('@/assets/images/' + imgName)" />
  </div>
</template>

<script>
export default {
  name: "DataLabelGroup",
  data() {
    return {};
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    value: {
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    imgName: {
      type: String,
      default: "man.svg",
    },
  },
};
</script>

<style lang="scss" scoped></style>
