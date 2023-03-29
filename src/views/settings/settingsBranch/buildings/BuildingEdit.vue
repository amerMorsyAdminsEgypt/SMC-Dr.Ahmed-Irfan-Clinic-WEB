<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BuildingForm
      v-if="!isLoading"
      :buildingData="buildingData"
      :submitName="$t('edit')"
      v-on:addOrUpdateBuilding="updateBuilding"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import BuildingForm from "@/components/settings/settingsBranch/buildings/BuildingForm.vue";
import Building from "@/models/settings/settingsBranch/buildings/Building";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BuildingEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BuildingForm,
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
      buildingData: new Building(),
      buildingToken: this.$route.params.buildingToken,
    };
  },
  methods: {
    async getBuildingDetails() {
      this.isLoading = true;
      this.buildingData.buildingToken = this.buildingToken;
      try {
        let response = await this.buildingData.getBuildingDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.buildingData.fillData(response.data.buildingData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.buildingData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.buildingData = null;
      }
      this.isLoading = false;
    },
    async updateBuilding() {
      this.isLoading = true;
      try {
        let response = await this.buildingData.addOrUpdateBuilding(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/buildings");
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
    this.getBuildingDetails();
  },
};
</script>

<style scoped lang="scss"></style>
