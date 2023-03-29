<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <CityForm
      v-if="!isLoading"
      :cityData="cityData"
      :submitName="$t('edit')"
      v-on:addOrUpdateCity="updateCity"
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
  name: "CityEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CityForm,
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
      cityData: new City(),
      cityToken: this.$route.params.cityToken,
    };
  },
  methods: {
    async getCityDetails() {
      this.isLoading = true;
      this.cityData.cityToken = this.cityToken;
      try {
        let response = await this.cityData.getCityDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.cityData.fillData(response.data.cityData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.cityData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.cityData = null;
      }
      this.isLoading = false;
    },
    async updateCity() {
      this.isLoading = true;
      try {
        let response = await this.cityData.addOrUpdateCity(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/cities");
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
    this.getCityDetails();
  },
};
</script>

<style scoped lang="scss"></style>
