<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BloodTypeForm
      v-if="!isLoading"
      :bloodTypeData="bloodTypeData"
      :submitName="$t('edit')"
      v-on:addOrUpdateBloodType="updateBloodType"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import BloodTypeForm from "@/components/settings/settingsOther/bloodTypes/BloodTypeForm.vue";
import BloodType from "@/models/settings/settingsOther/bloodTypes/BloodType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BloodTypeEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BloodTypeForm,
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
      bloodTypeData: new BloodType(),
      bloodTypeToken: this.$route.params.bloodTypeToken,
    };
  },
  methods: {
    async getBloodTypeDetails() {
      this.isLoading = true;
      this.bloodTypeData.bloodTypeToken = this.bloodTypeToken;
      try {
        let response = await this.bloodTypeData.getBloodTypeDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.bloodTypeData.fillData(response.data.bloodTypeData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.bloodTypeData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.bloodTypeData = null;
      }
      this.isLoading = false;
    },
    async updateBloodType() {
      this.isLoading = true;
      try {
        let response = await this.bloodTypeData.addOrUpdateBloodType(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/blood-types");
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
    this.getBloodTypeDetails();
  },
};
</script>

<style scoped lang="scss"></style>
