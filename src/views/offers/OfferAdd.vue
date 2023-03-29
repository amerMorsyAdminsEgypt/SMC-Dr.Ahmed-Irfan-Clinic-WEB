<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <OfferForm
      v-if="!isLoading"
      :offerData="offerData"
      :medidaSrc="medidaSrc"
      :submitName="$t('add')"
      v-on:addOrUpdateOffer="addOrUpdateOffer"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import OfferForm from "@/components/offers/OfferForm.vue";
import Offer from "@/models/offers/Offer";
import createToastMixin from "@/utils/create-toast-mixin";
import DEFAULT_OFFERS_IMG from "@/assets/images/offers.svg";

export default {
  name: "OfferAdd",
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
      medidaSrc: DEFAULT_OFFERS_IMG,
    };
  },
  methods: {
    async addOrUpdateOffer() {
      this.isLoading = true;
      try {
        let response = await this.offerData.addOrUpdateOffer(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.offerData.setInitialValue();
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
  computed: {},
  async created() {},
};
</script>

<style scoped lang="scss"></style>
