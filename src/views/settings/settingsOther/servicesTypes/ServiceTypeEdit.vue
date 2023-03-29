<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ServicesTypeForm
      v-if="!isLoading"
      :servicesTypeData="servicesTypeData"
      :submitName="$t('edit')"
      v-on:addOrUpdateServicesType="updateServicesType"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ServicesTypeForm from "@/components/settings/settingsOther/servicesTypes/ServicesTypeForm.vue";
import ServicesType from "@/models/settings/settingsOther/servicesTypes/ServicesType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServiceTypeEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ServicesTypeForm,
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
      servicesTypeData: new ServicesType(),
      serviceTypeToken: this.$route.params.serviceTypeToken,
    };
  },
  methods: {
    async getServicesTypeDetails() {
      this.isLoading = true;
      this.servicesTypeData.serviceTypeToken = this.serviceTypeToken;
      try {
        let response = await this.servicesTypeData.getServicesTypeDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.servicesTypeData.fillData(response.data.serviceTypeData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.servicesTypeData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.servicesTypeData = null;
      }
      this.isLoading = false;
    },
    async updateServicesType() {
      this.isLoading = true;
      try {
        let response = await this.servicesTypeData.addOrUpdateServicesType(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/services-types");
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
    this.getServicesTypeDetails();
  },
};
</script>

<style scoped lang="scss"></style>
