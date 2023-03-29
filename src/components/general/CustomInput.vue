<template>
  <div class="form-label-group" :class="className">
    <input
      :name="id"
      :id="id"
      type="text"
      v-model="theValue"
      class="form-control"
      placeholder=" "
      :maxlength="maxlength"
    />
    <label :for="id">{{ title ? title : $t("notFound") }}</label>
    <img :src="require('@/assets/images/' + imgName)" />
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  data() {
    return {
      theValue: this.value,
    };
  },
  methods: {},
  props: {
    className: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "textarea",
    },
    value: {
      default: "",
    },
    title: {
      type: String,
      default: "title",
    },
    imgName: {
      type: String,
      default: "man.svg",
    },
    maxlength: {
      type: Number,
      default: 50,
    },
  },
  watch: {
    theValue: function (val) {
      this.$emit("changeValue", val);
    },
  },
  async created() {},
};
</script>

<style lang="scss" scoped></style>
