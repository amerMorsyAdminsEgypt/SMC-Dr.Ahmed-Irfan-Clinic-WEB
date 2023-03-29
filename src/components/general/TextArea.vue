<template>
  <div class="form-label-group" :class="className">
    <b-form-textarea
      :id="id"
      v-model="theValue"
      placeholder=" "
      rows="1"
      :max-rows="maxRows"
      :maxlength="maxlength"
    ></b-form-textarea>
    <label :for="id">{{ title ? title : $t("notFound") }}</label>
    <img :src="require('@/assets/images/' + imgName)" />
  </div>
</template>

<script>
export default {
  name: "TextArea",
  data() {
    return {
      // theValue: this.value,
      theValue: "",
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
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "title",
    },
    imgName: {
      type: String,
      default: "notes.svg",
    },
    maxlength: {
      default: "500",
    },
    maxRows: {
      default: "5",
    },
  },
  watch: {
    theValue: function (val) {
      this.$emit("changeValue", val);
    },
  },
  async created() {
    this.theValue = this.value;
  },
};
</script>

<style lang="scss" scoped></style>
