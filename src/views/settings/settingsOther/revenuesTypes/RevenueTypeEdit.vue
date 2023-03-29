<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <RevenueTypeForm
      v-if="!isLoading"
      :revenueTypeData="revenueTypeData"
      :submitName="$t('edit')"
      v-on:addOrUpdateRevenueType="updateRevenueType"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import RevenueTypeForm from "@/components/settings/settingsOther/revenuesTypes/RevenueTypeForm.vue";
import RevenueType from "@/models/settings/settingsOther/revenuesTypes/RevenueType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "RevenueTypeEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    RevenueTypeForm,
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
      revenueTypeData: new RevenueType(),
      revenuesTypeToken: this.$route.params.revenuesTypeToken,
    };
  },
  methods: {
    async getRevenueTypeDetails() {
      this.isLoading = true;
      this.revenueTypeData.revenuesTypeToken = this.revenuesTypeToken;
      try {
        let response = await this.revenueTypeData.getRevenueTypeDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.revenueTypeData.fillData(response.data.revenuesTypeData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.revenueTypeData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.revenueTypeData = null;
      }
      this.isLoading = false;
    },
    async updateRevenueType() {
      this.isLoading = true;
      try {
        let response = await this.revenueTypeData.addOrUpdateRevenueType(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/revenues-types");
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
    this.getRevenueTypeDetails();
  },
};
</script>

<style scoped lang="scss"></style>
