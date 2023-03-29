<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <FloorForm
      v-if="!isLoading"
      :floorData="floorData"
      :submitName="$t('edit')"
      v-on:addOrUpdateFloor="updateFloor"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import FloorForm from "@/components/settings/settingsBranch/floors/FloorForm.vue";
import Floor from "@/models/settings/settingsBranch/floors/Floor";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "FloorEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    FloorForm,
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
      floorData: new Floor(),
      floorToken: this.$route.params.floorToken,
    };
  },
  methods: {
    async getFloorDetails() {
      this.isLoading = true;
      this.floorData.floorToken = this.floorToken;
      try {
        let response = await this.floorData.getFloorDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.floorData.fillData(response.data.floorData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.floorData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.floorData = null;
      }
      this.isLoading = false;
    },
    async updateFloor() {
      this.isLoading = true;
      try {
        let response = await this.floorData.addOrUpdateFloor(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/floors");
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
    this.getFloorDetails();
  },
};
</script>

<style scoped lang="scss"></style>
