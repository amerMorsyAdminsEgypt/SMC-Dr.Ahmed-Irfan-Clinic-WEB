<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ColorForm
      v-if="!isLoading"
      :colorData="colorData"
      :submitName="$t('edit')"
      v-on:addOrUpdateColor="updateColor"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ColorForm from "@/components/settings/settingsOther/colors/ColorForm.vue";
import Color from "@/models/settings/settingsOther/colors/Color";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ColorEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ColorForm,
  },
  props: ["colorToken"],
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      colorData: new Color(),
    };
  },
  methods: {
    async getColorDetails() {
      this.isLoading = true;
      this.colorData.colorToken = this.colorToken;
      try {
        let response = await this.colorData.getColorDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.colorData.fillData(response.data.colorData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.colorData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.colorData = null;
      }
      this.isLoading = false;
    },
    async updateColor() {
      this.isLoading = true;
      try {
        let response = await this.colorData.addOrUpdateColor(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push({ name: "Colors" });
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
    this.getColorDetails();
  },
};
</script>

<style scoped lang="scss"></style>
