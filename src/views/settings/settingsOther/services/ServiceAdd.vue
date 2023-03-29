<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ServiceForm
      v-if="!isLoading"
      :serviceData="serviceData"
      :imageSrc="imageSrc"
      :submitName="$t('add')"
      v-on:addOrUpdateService="addOrUpdateService"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ServiceForm from "@/components/settings/settingsOther/services/ServiceForm.vue";
import Service from "@/models/settings/settingsOther/services/Service";
import createToastMixin from "@/utils/create-toast-mixin";
import DEFAULT_SERVICES_IMG from "@/assets/images/services.svg";

export default {
  name: "ServiceAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ServiceForm,
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
      serviceData: new Service(),
      imageSrc: DEFAULT_SERVICES_IMG,
    };
  },
  methods: {
    async addOrUpdateService() {
      this.isLoading = true;
      try {
        let response = await this.serviceData.addOrUpdateService(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.serviceData.setInitialValue();
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
