<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <CityForm
      v-if="!isLoading"
      :cityData="cityData"
      :submitName="$t('add')"
      v-on:addOrUpdateCity="addOrUpdateCity"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import CityForm from "@/components/settings/settingsOther/cities/CityForm.vue";
import City from "@/models/settings/settingsOther/cities/City";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "CityAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CityForm,
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

      cityData: new City(),
    };
  },
  methods: {
    async addOrUpdateCity() {
      this.isLoading = true;
      try {
        let response = await this.cityData.addOrUpdateCity(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.cityData.setInitialValue();
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
