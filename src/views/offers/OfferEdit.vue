<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <OfferForm
      v-if="!isLoading"
      :offerData="offerData"
      :medidaSrc="imageSrc"
      :submitName="$t('edit')"
      v-on:addOrUpdateOffer="addOrUpdateOffer"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import OfferForm from "@/components/offers/OfferForm.vue";
import Offer from "@/models/offers/Offer";
import createToastMixin from "@/utils/create-toast-mixin";
import DEFAULT_OFFERS_IMG from "@/assets/images/offers.svg";

export default {
  name: "OfferEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfferForm,
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
      offerData: new Offer(),
      offerToken: this.$route.params.offerToken,
    };
  },
  methods: {
    async getOfferDetails() {
      this.isLoading = true;
      this.offerData.offerToken = this.offerToken;
      try {
        let response = await this.offerData.getOfferDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.offerData.fillData(response.data.offerData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.offerData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.offerData = null;
      }
      this.isLoading = false;
    },
    async addOrUpdateOffer() {
      this.isLoading = true;
      try {
        let response = await this.offerData.addOrUpdateOffer(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/offers");
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
      if (this.offerData.offerMediaPath) {
        return BASE_URL + this.offerData.offerMediaPath;
      }
      return DEFAULT_OFFERS_IMG;
    },
  },
  async created() {
    this.getOfferDetails();
  },
};
</script>

<style scoped lang="scss"></style>
