<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <CountryForm
      v-if="!isLoading"
      :countryData="countryData"
      :submitName="$t('edit')"
      v-on:addOrUpdateCountry="updateCountry"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import CountryForm from "@/components/settings/settingsOther/countries/CountryForm.vue";
import Country from "@/models/settings/settingsOther/countries/Country";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "CountryEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CountryForm,
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
      countryData: new Country(),
      countryToken: this.$route.params.countryToken,
    };
  },
  methods: {
    async getCountryDetails() {
      this.isLoading = true;
      this.countryData.countryToken = this.countryToken;
      try {
        let response = await this.countryData.getCountryDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.countryData.fillData(response.data.countryData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.countryData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.countryData = null;
      }
      this.isLoading = false;
    },
    async updateCountry() {
      this.isLoading = true;
      try {
        let response = await this.countryData.addOrUpdateCountry(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/countries");
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
  computed: {
    ...mapGetters(["userData"]),
  },
  async created() {
    this.getCountryDetails();
  },
};
</script>

<style scoped lang="scss"></style>
