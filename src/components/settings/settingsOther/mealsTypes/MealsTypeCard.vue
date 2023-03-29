<template>
  <div class="flip-card col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="imgSrc" :onerror="`this.src='${defaultImg}'`" alt="Image" />
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="$t('mealsTypes.name')">
            {{ mealsTypeData.mealsTypeNameCurrent }}
          </h4>
        </div>
      </div>
      <div class="flip-card-back">
        <router-link
          :to="{
            name: 'Meals',
            params: {
              mealsTypeToken: mealsTypeData.mealsTypeToken,
            },
          }"
          :title="$t('meals.modelName')"
        >
          <img src="@/assets/images/meal.svg" class="icon-lg" />
        </router-link>
        <div class="flip-card-back-icons">
          <button
            v-b-modal.MealsTypeInfo
            class="btn p-0"
            :title="$t('info')"
            @click="setMealsTypeData(mealsTypeData)"
          >
            <img src="@/assets/images/info.svg" class="icon-lg" />
          </button>
          <router-link
            :to="{
              name: 'MealsTypeEdit',
              params: {
                mealsTypeToken: mealsTypeData.mealsTypeToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
          <button
            v-b-modal.MealsTypeDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setMealsTypeData(mealsTypeData)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
          <!-- <br /> -->
        </div>
        <router-link
          :to="{
            name: 'Meals',
            params: {
              mealsTypeToken: mealsTypeData.mealsTypeToken,
            },
          }"
          :title="$t('meals.modelName')"
        >
          <div class="flip-card-title">
            <h4 class="cut-1line" :title="$t('meals.modelName')">
              {{ mealsTypeData.mealsTypeNameCurrent }}
            </h4>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/meals-types.svg";

export default {
  name: "MealsTypeCard",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG,
    };
  },
  props: ["mealsTypeData"],
  methods: {
    setMealsTypeData() {
      this.$emit("setMealsTypeData", this.mealsTypeData);
    },
  },
  computed: {
    imgSrc: function () {
      if (this.mealsTypeData.mealsTypeImagePath) {
        return BASE_URL + this.mealsTypeData.mealsTypeImagePath;
      }
      return DEFAULT_IMG;
    },
  },
};
</script>

<style lang="scss"></style>
