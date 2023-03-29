<template>
  <div class="form-label-group" :class="className">
    <input
      :name="id"
      :id="id"
      type="text"
      v-model="theValue"
      class="form-control"
      @keypress="isFloat($event)"
      @paste="handlePaste($event)"
      placeholder=" "
      :maxlength="maxlength"
    />
    <label :for="id">{{ title ? title : $t("notFound") }}</label>
    <img :src="require('@/assets/images/' + imgName)" />
  </div>
</template>

<script>
import { numberToEn } from "@/utils/functions";
import { isValidFloat } from "@/utils/validationHelper";

export default {
  name: "CustomInputFloat",
  data() {
    return {
      theValue: this.value,
    };
  },
  methods: {
    isFloat($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      // only allow number and one dot
      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 || this.value.indexOf(".") != -1)
      ) {
        // 46 is dot
        $event.preventDefault();
      }

      // restrict to 2 decimal places
      // if (
      //   this.value != null &&
      //   this.value.indexOf(".") > -1 &&
      //   this.value.split(".")[1].length > this.digitsNumAfterDot
      // ) {
      //   $event.preventDefault();
      // }
    },
    handlePaste(e) {
      let char = (e.clipboardData || window.clipboardData).getData("text");
      if (isValidFloat(numberToEn(char))) return true;
      else e.preventDefault();
    },
  },
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
    digitsNumAfterDot: {
      type: Number,
      default: 4,
    },
  },
  watch: {
    value: function (val) {
      this.theValue = numberToEn(val);
    },
    theValue: function (val) {
      if (this.value != val) this.$emit("changeValue", numberToEn(val));
    },
  },
};
</script>
