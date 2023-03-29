<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <OfficeForm
      v-if="!isLoading"
      :officeData="officeData"
      :submitName="$t('edit')"
      v-on:addOrUpdateOffice="updateOffice"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import OfficeForm from "@/components/settings/settingsBranch/offices/OfficeForm.vue";
import Office from "@/models/settings/settingsBranch/offices/Office";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OfficeEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficeForm,
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
      officeData: new Office(),
      officeToken: this.$route.params.officeToken,
    };
  },
  methods: {
    async getOfficeDetails() {
      this.isLoading = true;
      this.officeData.officeToken = this.officeToken;
      try {
        let response = await this.officeData.getOfficeDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.officeData.fillData(response.data.officeData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.officeData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.officeData = null;
      }
      this.isLoading = false;
    },
    async updateOffice() {
      this.isLoading = true;
      try {
        let response = await this.officeData.addOrUpdateOffice(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/offices");
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
    this.getOfficeDetails();
  },
};
</script>

<style scoped lang="scss"></style>
