<template>
  <div
    class="custom-checkbox-container"
    :class="
      className +
      (withOutTitle ? ' with-out-title' : '') +
      (centerStatus ? ' check-box-center' : '')
    "
  >
    <b-form-checkbox
      v-model="theValue"
      name="check-button"
      :disabled="isDisabled || showAsInfo"
    >
      <span class="checked" :style="`--color: ${colorChecked}`">
        <svg
          id="SvgjsSvg1011"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
        >
          <defs id="SvgjsDefs1012"></defs>
          <g id="SvgjsG1013">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 1792 1792"
            >
              <path
                d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"
                :fill="colorChecked"
                class="color000 svgShape"
              ></path>
            </svg>
          </g>
        </svg>
      </span>
      <span class="unchecked" :style="`--color: ${colorUnchecked}`">
        <svg
          id="SvgjsSvg1026"
          width="18"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
        >
          <defs id="SvgjsDefs1027"></defs>
          <g id="SvgjsG1028">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 512 512"
              viewBox="0 0 512 512"
              width="18"
              height="18"
            >
              <path
                :fill="colorUnchecked"
                d="M339.7,258.8l156.4-156.4c22.4-22.4,22.4-58.6,0-81c-22.4-22.4-58.6-22.4-81,0L258.8,177.8l-161-161
	c-22.4-22.4-58.6-22.4-81,0c-22.4,22.4-22.4,58.6,0,81l161,161L22.3,414.3c-22.4,22.4-22.4,58.6,0,81C33.5,506.4,48.1,512,62.8,512
	s29.3-5.6,40.5-16.8l155.5-155.5l150.9,150.9c11.2,11.2,25.8,16.8,40.5,16.8c14.7,0,29.3-5.6,40.5-16.8c22.4-22.4,22.4-58.6,0-81
	L339.7,258.8z"
                class="color231f20 svgShape"
              ></path>
            </svg>
          </g>
        </svg>
      </span>
      <span v-if="!withOutTitle" class="text">{{ title }}</span>
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "CustomCheckbox",
  data() {
    return {
      colorChecked: "#0075ff",
      colorUnchecked: "#f44336",
      theValue: this.value,
    };
  },
  methods: {},
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
    withOutTitle: {
      type: Boolean,
      default: false,
    },
    centerStatus: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    showAsInfo: {
      type: Boolean,
      default: false,
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
