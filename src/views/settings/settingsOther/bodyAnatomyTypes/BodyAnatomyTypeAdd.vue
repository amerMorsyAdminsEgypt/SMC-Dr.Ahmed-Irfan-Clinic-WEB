<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BodyAnatomyTypeForm
      v-if="!isLoading"
      :bodyAnatomyTypeData="bodyAnatomyTypeData"
      :imageSrc="imageSrc"
      :submitName="$t('add')"
      v-on:addOrUpdateBodyAnatomyType="addOrUpdateBodyAnatomyType"
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
import DEFAULT_IMG from "@/assets/images/anatomy-types.svg";

export default {
  name: "BodyAnatomyTypeAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BodyAnatomyTypeForm,
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
      bodyAnatomyTypeData: new BodyAnatomyType(),
      imageSrc: DEFAULT_IMG,
    };
  },
  methods: {
    async addOrUpdateBodyAnatomyType() {
      this.isLoading = true;
      try {
        let response =
          await this.bodyAnatomyTypeData.addOrUpdateBodyAnatomyType(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.bodyAnatomyTypeData.setInitialValue();
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
