<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <StoreForm
      v-if="!isLoading"
      :storeData="storeData"
      :imageSrc="imageSrc"
      :submitName="$t('edit')"
      v-on:addOrUpdateStore="updateStore"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import DEFAULT_IMG_STORE from "@/assets/images/stores.svg";
// import { date2slash, date2dash, timeTo12, timeTo24 } from "@/utils/functions";
import StoreForm from "@/components/stores/StoreForm.vue";
import Store from "@/models/stores/Store";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "StoreEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    StoreForm,
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
      imageSrc: DEFAULT_IMG_STORE,
      storeData: new Store(),
      storeToken: this.$route.params.storeToken,
    };
  },
  methods: {
    async getStoreDetails() {
      this.isLoading = true;
      this.storeData.storeToken = this.storeToken;
      try {
        let response = await this.storeData.getStoreDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.storeData.fillData(response.data.storeData);
          this.storeData.image = "";
          this.imageSrc = BASE_URL + this.storeData.storeImagePath;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.storeData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.storeData = null;
      }
      this.isLoading = false;
    },
    async updateStore() {
      this.isLoading = true;
      try {
        let response = await this.storeData.addOrUpdateStore(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/stores");
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
    this.getStoreDetails();
  },
};
</script>

<style scoped lang="scss"></style>
