<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <GeneralSpecialtyForm
      v-if="!isLoading"
      :generalSpecialtyData="generalSpecialtyData"
      :submitName="$t('edit')"
      v-on:addOrUpdateGeneralSpecialty="updateGeneralSpecialty"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import GeneralSpecialtyForm from "@/components/settings/settingsOther/generalSpecialties/GeneralSpecialtyForm.vue";
import GeneralSpecialty from "@/models/settings/settingsOther/generalSpecialties/GeneralSpecialty";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "GeneralSpecialtyEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    GeneralSpecialtyForm,
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
      generalSpecialtyData: new GeneralSpecialty(),
      generalSpecialtyToken: this.$route.params.generalSpecialtyToken,
    };
  },
  methods: {
    async getGeneralSpecialtyDetails() {
      this.isLoading = true;
      this.generalSpecialtyData.generalSpecialtyToken =
        this.generalSpecialtyToken;
      try {
        let response =
          await this.generalSpecialtyData.getGeneralSpecialtyDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.generalSpecialtyData.fillData(
            response.data.generalSpecialtyData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.generalSpecialtyData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.generalSpecialtyData = null;
      }
      this.isLoading = false;
    },
    async updateGeneralSpecialty() {
      this.isLoading = true;
      try {
        let response =
          await this.generalSpecialtyData.addOrUpdateGeneralSpecialty(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/general-specialties");
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
    this.getGeneralSpecialtyDetails();
  },
};
</script>

<style scoped lang="scss"></style>
