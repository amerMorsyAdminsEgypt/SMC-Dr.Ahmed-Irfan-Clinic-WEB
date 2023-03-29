<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BodyAnatomyTypeForm
      v-if="!isLoading"
      :bodyAnatomyTypeData="bodyAnatomyTypeData"
      :submitName="$t('edit')"
      :imageSrc="imageSrc"
      v-on:addOrUpdateBodyAnatomyType="updateBodyAnatomyType"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import BodyAnatomyTypeForm from "@/components/settings/settingsOther/bodyAnatomyTypes/BodyAnatomyTypeForm.vue";
import BodyAnatomyType from "@/models/settings/settingsOther/bodyAnatomyTypes/BodyAnatomyType";
import createToastMixin from "@/utils/create-toast-mixin";
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/anatomy-types.svg";

export default {
  name: "BodyAnatomyTypeEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BodyAnatomyTypeForm,
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
      bodyAnatomyTypeData: new BodyAnatomyType(),
      bodyAnatomyTypeToken: this.$route.params.bodyAnatomyTypeToken,
    };
  },
  methods: {
    async getBodyAnatomyTypeDetails() {
      this.isLoading = true;
      this.bodyAnatomyTypeData.bodyAnatomyTypeToken = this.bodyAnatomyTypeToken;
      try {
        let response = await this.bodyAnatomyTypeData.getBodyAnatomyTypeDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.bodyAnatomyTypeData.fillData(response.data.bodyAnatomyTypesData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.bodyAnatomyTypeData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.bodyAnatomyTypeData = null;
      }
      this.isLoading = false;
    },
    async updateBodyAnatomyType() {
      this.isLoading = true;
      try {
        let response =
          await this.bodyAnatomyTypeData.addOrUpdateBodyAnatomyType(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/body-anatomy-types");
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
      if (this.bodyAnatomyTypeData.bodyAnatomyTypeImagePath) {
        return BASE_URL + this.bodyAnatomyTypeData.bodyAnatomyTypeImagePath;
      }
      return DEFAULT_IMG;
    },
  },
  async created() {
    this.getBodyAnatomyTypeDetails();
  },
};
</script>

<style scoped lang="scss"></style>
