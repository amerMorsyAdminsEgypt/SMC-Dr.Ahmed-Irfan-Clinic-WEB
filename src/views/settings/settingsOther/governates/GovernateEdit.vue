<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <GovernateForm
      v-if="!isLoading"
      :governateData="governateData"
      :submitName="$t('edit')"
      v-on:addOrUpdateGovernate="updateGovernate"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import GovernateForm from "@/components/settings/settingsOther/governates/GovernateForm.vue";
import Governate from "@/models/settings/settingsOther/governates/Governate";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "GovernateEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    GovernateForm,
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
      governateData: new Governate(),
      governateToken: this.$route.params.governateToken,
    };
  },
  methods: {
    async getGovernateDetails() {
      this.isLoading = true;
      this.governateData.governateToken = this.governateToken;
      try {
        let response = await this.governateData.getGovernateDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.governateData.fillData(response.data.governateData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.governateData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.governateData = null;
      }
      this.isLoading = false;
    },
    async updateGovernate() {
      this.isLoading = true;
      try {
        let response = await this.governateData.addOrUpdateGovernate(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/governates");
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
    this.getGovernateDetails();
  },
};
</script>

<style scoped lang="scss"></style>
