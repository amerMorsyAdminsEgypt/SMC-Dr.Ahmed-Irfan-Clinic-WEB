<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MethodPaidForm
      v-if="!isLoading"
      :methodPaidData="methodPaidData"
      :submitName="$t('edit')"
      v-on:addOrUpdateMethodPaid="updateMethodPaid"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MethodPaidForm from "@/components/settings/settingsOther/methodPaids/MethodPaidForm.vue";
import MethodPaid from "@/models/settings/settingsOther/methodPaids/MethodPaid";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MethodPaidEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MethodPaidForm,
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
      methodPaidData: new MethodPaid(),
      methodPaidToken: this.$route.params.methodPaidToken,
    };
  },
  methods: {
    async getPaidDetails() {
      this.isLoading = true;
      this.methodPaidData.methodPaidToken = this.methodPaidToken;
      try {
        let response = await this.methodPaidData.getPaidDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.methodPaidData.fillData(response.data.methodPaidData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.methodPaidData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.methodPaidData = null;
      }
      this.isLoading = false;
    },
    async updateMethodPaid() {
      this.isLoading = true;
      try {
        let response = await this.methodPaidData.addOrUpdateMethodPaid(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/method-Paids");
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
    this.getPaidDetails();
  },
};
</script>

<style scoped lang="scss"></style>
