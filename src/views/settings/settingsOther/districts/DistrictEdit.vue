<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <DistrictForm
      v-if="!isLoading"
      :districtData="districtData"
      :submitName="$t('edit')"
      v-on:addOrUpdateDistrict="updateDistrict"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import DistrictForm from "@/components/settings/settingsOther/districts/DistrictForm.vue";
import District from "@/models/settings/settingsOther/districts/District";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "DistrictEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    DistrictForm,
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
      districtData: new District(),
      districtToken: this.$route.params.districtToken,
    };
  },
  methods: {
    async getDistrictDetails() {
      this.isLoading = true;
      this.districtData.districtToken = this.districtToken;
      try {
        let response = await this.districtData.getDistrictDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.districtData.fillData(response.data.districtData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.districtData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.districtData = null;
      }
      this.isLoading = false;
    },
    async updateDistrict() {
      this.isLoading = true;
      try {
        let response = await this.districtData.addOrUpdateDistrict(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/districts");
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
    this.getDistrictDetails();
  },
};
</script>

<style scoped lang="scss"></style>
