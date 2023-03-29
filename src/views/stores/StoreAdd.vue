<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <StoreForm
      v-if="!isLoading"
      :storeData="storeData"
      :imageSrc="imageSrc"
      :submitName="$t('add')"
      v-on:addOrUpdateStore="addStore"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import DEFAULT_IMG_STORE from "@/assets/images/stores.svg";
import StoreForm from "@/components/stores/StoreForm.vue";
import Store from "@/models/stores/Store";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "StoreAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    StoreForm,
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
      imageSrc: DEFAULT_IMG_STORE,
      storeData: new Store(),
    };
  },
  methods: {
    async addStore() {
      this.isLoading = true;
      try {
        let response = await this.storeData.addOrUpdateStore(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
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
