<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <SpecialSpecialtyForm
      v-if="!isLoading"
      :specialSpecialtyData="specialSpecialtyData"
      :submitName="$t('edit')"
      v-on:addOrUpdateSpecialSpecialty="updateSpecialSpecialty"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import SpecialSpecialtyForm from "@/components/settings/settingsOther/specialSpecialties/SpecialSpecialtyForm.vue";
import SpecialSpecialty from "@/models/settings/settingsOther/specialSpecialties/SpecialSpecialty";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "SpecialSpecialtyEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    SpecialSpecialtyForm,
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
      specialSpecialtyData: new SpecialSpecialty(),
      specialSpecialtyToken: this.$route.params.specialSpecialtyToken,
    };
  },
  methods: {
    async getSpecialSpecialtyDetails() {
      this.isLoading = true;
      this.specialSpecialtyData.specialSpecialtyToken =
        this.specialSpecialtyToken;
      try {
        let response =
          await this.specialSpecialtyData.getSpecialSpecialtyDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.specialSpecialtyData.fillData(
            response.data.specialSpecialtiesData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.specialSpecialtyData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.specialSpecialtyData = null;
      }
      this.isLoading = false;
    },
    async updateSpecialSpecialty() {
      this.isLoading = true;
      try {
        let response =
          await this.specialSpecialtyData.addOrUpdateSpecialSpecialty(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/special-specialties");
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
    this.getSpecialSpecialtyDetails();
  },
};
</script>

<style scoped lang="scss"></style>
