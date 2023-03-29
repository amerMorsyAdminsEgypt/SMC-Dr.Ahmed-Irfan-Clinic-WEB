<template>
  <b-form-group
    class="form-label-group my-radio"
    :class="className"
    :label="title ? title : $t('notFound')"
    v-slot="{ ariaDescribedby }"
  >
    <b-form-radio-group
      :name="id"
      v-model="theValue"
      :options="options"
      :aria-describedby="ariaDescribedby"
    ></b-form-radio-group>
  </b-form-group>
</template>

<script>
export default {
  name: "CustomRadio",
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
    options: {
      type: Array,
      // default: [],
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
