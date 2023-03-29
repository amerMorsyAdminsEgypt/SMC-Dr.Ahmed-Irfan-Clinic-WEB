<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BodyAnatomyForm
      v-if="!isLoading"
      :bodyAnatomyData="bodyAnatomyData"
      :imageSrc="imageSrc"
      :submitName="$t('add')"
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
import DEFAULT_IMG from "@/assets/images/anatomy.svg";

export default {
  name: "BodyAnatomyAdd",
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
      imageSrc: DEFAULT_IMG,
    };
  },
  methods: {
    async addOrUpdateBodyAnatomy() {
      this.isLoading = true;
      try {
        let response = await this.bodyAnatomyData.addOrUpdateBodyAnatomy(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.bodyAnatomyData.setInitialValue();
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
