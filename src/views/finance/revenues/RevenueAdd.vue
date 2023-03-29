<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <RevenueForm
      v-if="!isLoading"
      :revenueData="revenueData"
      :imageSrc="imageSrc"
      :submitName="$t('add')"
      v-on:addRevenue="addRevenue"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import DEFAULT_IMG_REVENUE from "@/assets/images/revenues.svg";
import RevenueForm from "@/components/finance/revenues/RevenueForm.vue";
import Revenue from "@/models/finance/revenues/Revenue";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "RevenueAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    RevenueForm,
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
      imageSrc: DEFAULT_IMG_REVENUE,
      revenueData: new Revenue(),
    };
  },
  methods: {
    async addRevenue() {
      this.isLoading = true;
      try {
        let response = await this.revenueData.addRevenue(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.revenueData.setInitialValue();
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
