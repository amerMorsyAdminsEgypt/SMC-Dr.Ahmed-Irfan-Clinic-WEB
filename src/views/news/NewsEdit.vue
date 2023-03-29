<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <NewsForm
      v-if="!isLoading"
      :newsData="newsData"
      :medidaSrc="imageSrc"
      :submitName="$t('edit')"
      v-on:addOrUpdateNews="addOrUpdateNews"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import NewsForm from "@/components/news/NewsForm.vue";
import News from "@/models/news/News";
import createToastMixin from "@/utils/create-toast-mixin";
import { BASE_URL } from "@/utils/constants";
import DEFAULT_NEWS_IMG from "@/assets/images/news-defult-img.svg";

export default {
  name: "NewsEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    NewsForm,
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
      newsData: new News(),
      newsToken: this.$route.params.newsToken,
    };
  },
  methods: {
    async getNewsDetails() {
      this.isLoading = true;
      this.newsData.newsToken = this.newsToken;
      try {
        let response = await this.newsData.getNewsDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.newsData.fillData(response.data.newsData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.newsData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.newsData = null;
      }
      this.isLoading = false;
    },
    async addOrUpdateNews() {
      this.isLoading = true;
      try {
        let response = await this.newsData.addOrUpdateNews(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/news");
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
      if (this.newsData.newsMediaPath) {
        return BASE_URL + this.newsData.newsMediaPath;
      }
      return DEFAULT_NEWS_IMG;
    },
  },
  async created() {
    this.getNewsDetails();
  },
};
</script>

<style scoped lang="scss"></style>
