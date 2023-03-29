<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MealsTypeForm
      v-if="!isLoading"
      :mealsTypeData="mealsTypeData"
      :imageSrc="imageSrc"
      :submitName="$t('add')"
      v-on:addOrUpdateMealsType="addOrUpdateMealsType"
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
import DEFAULT_IMG from "@/assets/images/meals-types.svg";

export default {
  name: "MealsTypeAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MealsTypeForm,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      mealsTypeData: new MealsType(),
      imageSrc: DEFAULT_IMG,
    };
  },
  methods: {
    async addOrUpdateMealsType() {
      this.isLoading = true;
      try {
        let response = await this.mealsTypeData.addOrUpdateMealsType(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.mealsTypeData.setInitialValue();
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
  async created() {},
};
</script>

<style scoped lang="scss"></style>
