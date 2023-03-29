<template>
  <div class="statistics-card">
    <div class="statistics-card-content">
      <h2 class="statistics-card-number">{{ totalNumber }}</h2>
      <h3 class="statistics-card-title">{{ title || $t("notFound") }}</h3>
    </div>
    <div class="statistics-card-icon">
      <img :src="require('@/assets/images/' + icon)" />
    </div>
    <div class="statistics-card-bar">
      <b-progress class="" :max="totalNumber" show-value>
        <b-progress-bar
          :value="data[0].value"
          :title="data[0].title"
          data-color="#e7663f"
        ></b-progress-bar>
        <b-progress-bar
          :value="data[1].value"
          :title="data[1].title"
          data-color="#e7663f"
        ></b-progress-bar>
      </b-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatisticsCard",
  props: {
    icon: {
      type: String,
      default: "number.svg",
    },
    title: {
      type: String,
      default: "",
    },
    totalNumber: {
      type: Number,
      default: 0,
    },
    data: {
      type: Array,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  async created() {},
};
</script>

<style lang="scss"></style>
