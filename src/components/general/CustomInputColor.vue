<template>
  <div
    class="form-label-group"
    :class="className + (errors.length == 0 ? '' : ' form-group--error')"
  >
    <b-form-input
      :name="id"
      :id="id"
      v-model="theValue"
      placeholder=""
      type="color"
      class="color-input"
    ></b-form-input>
    <label :for="id">{{ title ? title : $t("notFound") }}</label>
    <img :src="require('@/assets/images/' + imgName)" />
    <span class="error" v-for="(error, index) in errors" :key="index">
      {{ error }}
    </span>
  </div>
</template>

<script>
export default {
  name: "CustomInputColor",
  components: {},
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
    errors: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    value: function (val) {
      this.theValue = val;
    },
    theValue: function (val) {
      if (this.value != val) this.$emit("changeValue", val);
    },
  },
  async created() {},
};
</script>

<style lang="scss" scoped>
.color-input {
  height: calc(1.5em + 0.75rem + 15px) !important;
  padding: 15px 3.25rem 0 !important;
}
</style>
