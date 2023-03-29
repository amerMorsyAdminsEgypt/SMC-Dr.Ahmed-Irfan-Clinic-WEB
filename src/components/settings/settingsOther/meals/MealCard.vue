<template>
  <div class="flip-card col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="imgSrc" :onerror="`this.src='${defaultImg}'`" alt="Image" />
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="$t('meals.name')">
            {{ mealData.mealNameCurrent }}
          </h4>
        </div>
      </div>
      <div class="flip-card-back">
        <div class="flip-card-back-icons">
          <button
            v-b-modal.MealInfo
            class="btn p-0"
            :title="$t('info')"
            @click="setMealData(mealData)"
          >
            <img src="@/assets/images/info.svg" class="icon-lg" />
          </button>
          <router-link
            :to="{
              name: 'MealEdit',
              params: {
                mealToken: mealData.mealToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
          <button
            v-b-modal.MealDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setMealData(mealData)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
          <!-- <br /> -->
        </div>
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="$t('meals.name')">
            {{ mealData.mealNameCurrent }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/meal.svg";

export default {
  name: "MealCard",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG,
    };
  },
  props: ["mealData"],
  methods: {
    setMealData() {
      this.$emit("setMealData", this.mealData);
    },
  },
  computed: {
    imgSrc: function () {
      return BASE_URL + this.mealData.mealImagePath;
    },
  },
};
</script>

<style lang="scss"></style>
