<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <NewsCategoryForm
      v-if="!isLoading"
      :newsCategoryData="newsCategoryData"
      :submitName="$t('edit')"
      v-on:addOrUpdateNewsCategory="updateNewsCategory"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import NewsCategoryForm from "@/components/settings/settingsOther/newsCategories/NewsCategoryForm.vue";
import NewsCategory from "@/models/settings/settingsOther/newsCategories/NewsCategory";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "NewsCategoryEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    NewsCategoryForm,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      newsCategoryData: new NewsCategory(),
      newsCategoryToken: this.$route.params.newsCategoryToken,
    };
  },
  methods: {
    async getNewsCategoryDetails() {
      this.isLoading = true;
      this.newsCategoryData.newsCategoryToken = this.newsCategoryToken;
      try {
        let response = await this.newsCategoryData.getNewsCategoryDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.newsCategoryData.fillData(response.data.newsCategoryData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.newsCategoryData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.newsCategoryData = null;
      }
      this.isLoading = false;
    },
    async updateNewsCategory() {
      this.isLoading = true;
      try {
        let response = await this.newsCategoryData.addOrUpdateNewsCategory(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/news-categories");
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
  async created() {
    this.getNewsCategoryDetails();
  },
};
</script>

<style scoped lang="scss"></style>
