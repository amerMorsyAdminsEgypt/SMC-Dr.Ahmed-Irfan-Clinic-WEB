<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <RequirementForm
      v-if="!isLoading"
      :requirementData="requirementData"
      :submitName="$t('add')"
      v-on:addOrUpdateRequirement="addOrUpdateRequirement"
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
  name: "RequirementAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    RequirementForm,
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

      requirementData: new Requirement(),
    };
  },
  methods: {
    async addOrUpdateRequirement() {
      this.isLoading = true;
      try {
        let response = await this.requirementData.addOrUpdateRequirement(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.requirementData.setInitialValue();
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
