<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <EstablishmentYearSettingForm
      v-if="!isLoading"
      :establishmentYearSettingData="establishmentYearSettingData"
      v-on:addOrUpdateEstablishmentYearSetting="addEstablishmentYearSetting"
      :submitName="$t('add')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import EstablishmentYearSettingForm from "@/components/settings/settingsEstablishment/yearSettings/EstablishmentYearSettingForm.vue";
import EstablishmentYearSetting from "@/models/settings/settingsEstablishment/yearSettings/EstablishmentYearSetting";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EstablishmentYearSettingAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    EstablishmentYearSettingForm,
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
      establishmentYearSettingData: new EstablishmentYearSetting(),
    };
  },
  methods: {
    async addEstablishmentYearSetting() {
      this.isLoading = true;
      try {
        let response =
          await this.establishmentYearSettingData.addOrUpdateEstablishmentYearSetting(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.establishmentYearSettingData.setInitialValue();
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
