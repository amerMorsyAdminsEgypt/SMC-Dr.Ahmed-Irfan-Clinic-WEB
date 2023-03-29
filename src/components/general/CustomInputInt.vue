<template>
  <div class="form-label-group" :class="className">
    <input
      :name="id"
      :id="id"
      type="text"
      v-model="theValue"
      class="form-control"
      v-on:keypress="isInt($event)"
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
import { isValidInteger } from "@/utils/validationHelper";

export default {
  name: "CustomInputInt",
  data() {
    return {
      theValue: this.value,
    };
  },
  methods: {
    isInt(e) {
      let char = String.fromCharCode(e.keyCode);
      if (isValidInteger(numberToEn(char))) return true;
      else e.preventDefault();
    },
    handlePaste(e) {
      let char = (e.clipboardData || window.clipboardData).getData("text");
      if (isValidInteger(numberToEn(char))) return true;
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
      default: "222",
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
    value: function (val) {
      this.theValue = numberToEn(val);
    },
    theValue: function (val) {
      if (this.value != val)
        this.$emit(
          "changeValue",
          !val
            ? 0
            : isNaN(Number(numberToEn(val)))
            ? 0
            : Number(numberToEn(val))
        );
    },
  },
};
</script>
