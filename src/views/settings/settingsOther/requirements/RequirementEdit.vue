<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <RequirementForm
      v-if="!isLoading"
      :requirementData="requirementData"
      :submitName="$t('edit')"
      v-on:addOrUpdateRequirement="updateRequirement"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import RequirementForm from "@/components/settings/settingsOther/requirements/RequirementForm.vue";
import Requirement from "@/models/settings/settingsOther/requirements/Requirement";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "RequirementEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    RequirementForm,
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
      requirementData: new Requirement(),
      requirementToken: this.$route.params.requirementToken,
    };
  },
  methods: {
    async getRequirementDetails() {
      this.isLoading = true;
      this.requirementData.requirementToken = this.requirementToken;
      try {
        let response = await this.requirementData.getRequirementDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.requirementData.fillData(response.data.requirementsData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.requirementData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.requirementData = null;
      }
      this.isLoading = false;
    },
    async updateRequirement() {
      this.isLoading = true;
      try {
        let response = await this.requirementData.addOrUpdateRequirement(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/requirements");
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
    this.getRequirementDetails();
  },
};
</script>

<style scoped lang="scss"></style>
