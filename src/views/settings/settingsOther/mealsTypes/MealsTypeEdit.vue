<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MealsTypeForm
      v-if="!isLoading"
      :mealsTypeData="mealsTypeData"
      :submitName="$t('edit')"
      :imageSrc="imageSrc"
      v-on:addOrUpdateMealsType="updateMealsType"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MealsTypeForm from "@/components/settings/settingsOther/mealsTypes/MealsTypeForm.vue";
import MealsType from "@/models/settings/settingsOther/mealsTypes/MealsType";
import createToastMixin from "@/utils/create-toast-mixin";
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/meals-types.svg";

export default {
  name: "MealsTypeEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MealsTypeForm,
  },
  props: ["mealsTypeToken"],
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      mealsTypeData: new MealsType(),
    };
  },
  methods: {
    async getMealsTypeDetails() {
      this.isLoading = true;
      this.mealsTypeData.mealsTypeToken = this.mealsTypeToken;
      try {
        let response = await this.mealsTypeData.getMealsTypeDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.mealsTypeData.fillData(response.data.mealsTypeData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.mealsTypeData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.mealsTypeData = null;
      }
      this.isLoading = false;
    },
    async updateMealsType() {
      this.isLoading = true;
      try {
        let response = await this.mealsTypeData.addOrUpdateMealsType(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push({ name: "MealsTypes" });
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
      if (this.mealsTypeData && this.mealsTypeData.mealsTypeImagePath) {
        return BASE_URL + this.mealsTypeData.mealsTypeImagePath;
      }
      return DEFAULT_IMG;
    },
  },
  async created() {
    this.getMealsTypeDetails();
  },
};
</script>

<style scoped lang="scss"></style>
