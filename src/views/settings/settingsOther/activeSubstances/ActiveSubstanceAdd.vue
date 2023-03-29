<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ActiveSubstanceForm
      v-if="!isLoading"
      :activeSubstanceData="activeSubstanceData"
      :submitName="$t('add')"
      v-on:addOrUpdateActiveSubstance="addOrUpdateActiveSubstance"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ActiveSubstanceForm from "@/components/settings/settingsOther/activeSubstances/ActiveSubstanceForm.vue";
import ActiveSubstance from "@/models/settings/settingsOther/activeSubstances/ActiveSubstance";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ActiveSubstanceAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ActiveSubstanceForm,
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

      activeSubstanceData: new ActiveSubstance(),
    };
  },
  methods: {
    async addOrUpdateActiveSubstance() {
      this.isLoading = true;
      try {
        let response =
          await this.activeSubstanceData.addOrUpdateActiveSubstance(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.activeSubstanceData.setInitialValue();
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
