<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ScientificDegreeForm
      v-if="!isLoading"
      :scientificDegreeData="scientificDegreeData"
      :submitName="$t('edit')"
      v-on:addOrUpdateScientificDegree="updateScientificDegree"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ScientificDegreeForm from "@/components/settings/settingsOther/scientificDegrees/ScientificDegreeForm.vue";
import ScientificDegree from "@/models/settings/settingsOther/scientificDegrees/ScientificDegree";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ScientificDegreeEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ScientificDegreeForm,
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
      scientificDegreeData: new ScientificDegree(),
      scientificDegreeToken: this.$route.params.scientificDegreeToken,
    };
  },
  methods: {
    async getScientificDegreeDetails() {
      this.isLoading = true;
      this.scientificDegreeData.scientificDegreeToken =
        this.scientificDegreeToken;
      try {
        let response =
          await this.scientificDegreeData.getScientificDegreeDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.scientificDegreeData.fillData(
            response.data.scientificDegreeData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.scientificDegreeData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.scientificDegreeData = null;
      }
      this.isLoading = false;
    },
    async updateScientificDegree() {
      this.isLoading = true;
      try {
        let response =
          await this.scientificDegreeData.addOrUpdateScientificDegree(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/scientific-degrees");
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
    this.getScientificDegreeDetails();
  },
};
</script>

<style scoped lang="scss"></style>
