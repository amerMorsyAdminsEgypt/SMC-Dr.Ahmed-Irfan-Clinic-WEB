<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ChamberForm
      v-if="!isLoading"
      :chamberData="chamberData"
      :submitName="$t('add')"
      v-on:addOrUpdateChamber="addOrUpdateChamber"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ChamberForm from "@/components/settings/settingsBranch/chambers/ChamberForm.vue";
import Chamber from "@/models/settings/settingsBranch/chambers/Chamber";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ChamberAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ChamberForm,
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

      chamberData: new Chamber(),
    };
  },
  methods: {
    async addOrUpdateChamber() {
      this.isLoading = true;
      try {
        let response = await this.chamberData.addOrUpdateChamber(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.chamberData.setInitialValue();
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
