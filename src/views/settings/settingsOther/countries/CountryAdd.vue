<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <CountryForm
      v-if="!isLoading"
      :countryData="countryData"
      :submitName="$t('add')"
      v-on:addOrUpdateCountry="addOrUpdateCountry"
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
  name: "CountryAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CountryForm,
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

      countryData: new Country(),
    };
  },
  methods: {
    async addOrUpdateCountry() {
      this.isLoading = true;
      try {
        let response = await this.countryData.addOrUpdateCountry(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.countryData.setInitialValue();
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
  async created() {},
};
</script>

<style scoped lang="scss"></style>
