<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BodyAnatomyForm
      v-if="!isLoading"
      :bodyAnatomyData="bodyAnatomyData"
      :submitName="$t('edit')"
      :imageSrc="imageSrc"
      v-on:addOrUpdateBodyAnatomy="addOrUpdateBodyAnatomy"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import BodyAnatomyForm from "@/components/settings/settingsOther/bodyAnatomies/BodyAnatomyForm.vue";
import BodyAnatomy from "@/models/settings/settingsOther/bodyAnatomies/BodyAnatomy";
import createToastMixin from "@/utils/create-toast-mixin";
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/anatomy.svg";

export default {
  name: "BodyAnatomyEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BodyAnatomyForm,
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
      bodyAnatomyData: new BodyAnatomy(),
      bodyAnatomyToken: this.$route.params.bodyAnatomyToken,
    };
  },
  methods: {
    async getBodyAnatomyDetails() {
      this.isLoading = true;
      this.bodyAnatomyData.bodyAnatomyToken = this.bodyAnatomyToken;
      try {
        let response = await this.bodyAnatomyData.getBodyAnatomyDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.bodyAnatomyData.fillData(response.data.bodyAnatomyData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.bodyAnatomyData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.bodyAnatomyData = null;
      }
      this.isLoading = false;
    },
    async addOrUpdateBodyAnatomy() {
      this.isLoading = true;
      try {
        let response = await this.bodyAnatomyData.addOrUpdateBodyAnatomy(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/body-anatomies");
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
      if (this.bodyAnatomyData.bodyAnatomyImagePath) {
        return BASE_URL + this.bodyAnatomyData.bodyAnatomyImagePath;
      }
      return DEFAULT_IMG;
    },
  },
  async created() {
    this.getBodyAnatomyDetails();
  },
};
</script>

<style scoped lang="scss"></style>
