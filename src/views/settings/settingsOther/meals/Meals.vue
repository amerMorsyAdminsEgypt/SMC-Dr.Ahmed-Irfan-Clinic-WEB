<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="mealsData">
      <div class="row">
        <MealCard
          v-for="meal in mealsData"
          :key="meal.mealToken"
          :mealData="meal"
          v-on:setMealData="mealData.fillData($event)"
        />
      </div>

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <MealInfo :mealData="mealData" />
      <MealDelete :mealData="mealData" v-on:refresh="getAllMeals()" />
    </div>

    <MealBtns
      :textSearch="textSearch"
      :mealsTypeToken="mealData.filter.mealsTypeToken"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MealCard from "@/components/settings/settingsOther/meals/MealCard.vue";
import MealInfo from "@/components/settings/settingsOther/meals/MealInfo.vue";
import MealDelete from "@/components/settings/settingsOther/meals/MealDelete.vue";
import MealBtns from "@/components/settings/settingsOther/meals/MealBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Meal from "@/models/settings/settingsOther/meals/Meal";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Meals",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MealCard,
    MealInfo,
    MealDelete,
    MealBtns,
    Pagination,
  },
  props: ["mealsTypeToken"],
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      mealsData: null,
      mealData: new Meal(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllMeals();
    },
    search(type, text) {
      this.mealData.filter.mealsTypeToken = type;
      this.textSearch = text;
      this.getAllMeals();
    },
    async getAllMeals() {
      this.isLoading = true;
      try {
        const response = await this.mealData.getAllMeals(
          this.language,
          this.userAuthorizeToken,
          this.selfPage,
          this.textSearch
        );

        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.mealsPagination.totalPages,
            totalItems: response.data.mealsPagination.totalItems,
            countItemsInPage: response.data.mealsPagination.countItemsInPage,
            selfPage: response.data.mealsPagination.selfPage,
          };
          this.mealsData = response.data.mealsPagination.mealsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.mealsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.mealsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.mealsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.mealsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.mealData.filter.mealsTypeToken = this.mealsTypeToken || "";
    this.getAllMeals();
  },
};
</script>
