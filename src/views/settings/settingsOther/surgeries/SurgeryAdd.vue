<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <SurgeryForm
      v-if="!isLoading"
      :surgeryData="surgeryData"
      :submitName="$t('add')"
      v-on:addOrUpdateSurgery="addOrUpdateSurgery"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import SurgeryForm from "@/components/settings/settingsOther/surgeries/SurgeryForm.vue";
import Surgery from "@/models/settings/settingsOther/surgeries/Surgery";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "SurgeryAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    SurgeryForm,
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

      surgeryData: new Surgery(),
    };
  },
  methods: {
    async addOrUpdateSurgery() {
      this.isLoading = true;
      try {
        let response = await this.surgeryData.addOrUpdateSurgery(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.surgeryData.setInitialValue();
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
