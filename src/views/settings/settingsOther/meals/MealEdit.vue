<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MealForm
      v-if="!isLoading"
      :mealData="mealData"
      :submitName="$t('edit')"
      :imageSrc="imageSrc"
      v-on:addOrUpdateMeal="addOrUpdateMeal"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MealForm from "@/components/settings/settingsOther/meals/MealForm.vue";
import Meal from "@/models/settings/settingsOther/meals/Meal";
import createToastMixin from "@/utils/create-toast-mixin";
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/anatomy.svg";

export default {
  name: "MealEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MealForm,
  },
  props: ["mealToken"],
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      mealData: new Meal(),
    };
  },
  methods: {
    async getMealDetails() {
      this.isLoading = true;
      this.mealData.mealToken = this.mealToken;
      try {
        let response = await this.mealData.getMealDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.mealData.fillData(response.data.mealData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.mealData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.mealData = null;
      }
      this.isLoading = false;
    },
    async addOrUpdateMeal() {
      this.isLoading = true;
      try {
        let response = await this.mealData.addOrUpdateMeal(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push({ name: "Meals" });
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  computed: {
    imageSrc: function () {
      if (this.mealData && this.mealData.mealImagePath) {
        return BASE_URL + this.mealData.mealImagePath;
      }
      return DEFAULT_IMG;
    },
  },
  async created() {
    this.getMealDetails();
  },
};
</script>

<style scoped lang="scss"></style>
