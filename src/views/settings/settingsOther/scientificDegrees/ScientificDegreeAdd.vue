<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ScientificDegreeForm
      v-if="!isLoading"
      :scientificDegreeData="scientificDegreeData"
      :submitName="$t('add')"
      v-on:addOrUpdateScientificDegree="addOrUpdateScientificDegree"
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
  name: "ScientificDegreeAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ScientificDegreeForm,
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

      scientificDegreeData: new ScientificDegree(),
    };
  },
  methods: {
    async addOrUpdateScientificDegree() {
      this.isLoading = true;
      try {
        let response =
          await this.scientificDegreeData.addOrUpdateScientificDegree(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.scientificDegreeData.setInitialValue();
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
