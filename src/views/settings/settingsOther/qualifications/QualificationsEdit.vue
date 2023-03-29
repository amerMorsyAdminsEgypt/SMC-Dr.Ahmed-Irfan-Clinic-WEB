<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <QualificationForm
      v-if="!isLoading"
      :qualificationData="qualificationData"
      :submitName="$t('edit')"
      v-on:addOrUpdateQualification="updateQualification()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import QualificationForm from "@/components/settings/settingsOther/qualifications/QualificationForm.vue";

export default {
  name: "QualificationsEdit",
  components: {
    PreLoader,
    ExceptionWithImg,
    QualificationForm,
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
      qualificationToken: this.$route.params.qualificationToken,
      qualificationData: {},
    };
  },
  methods: {
    async getQualificationDetails() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Qualifications/GetQualificationDetails?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&qualificationToken=${this.qualificationToken}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.qualificationData = response.data.qualificationsData;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.qualificationData = null;
      }
      this.isLoading = false;
    },
    async updateQualification() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        qualificationToken: this.qualificationToken,
        qualificationNameEn: this.qualificationData.qualificationNameEn,
        qualificationNameAr: this.qualificationData.qualificationNameAr,
        qualificationNotes: this.qualificationData.qualificationNotes,
      };

      try {
        const response = await axios.post(
          `/Qualifications/UpdateQualification`,
          data
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/qualifications");
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
    showMsg(msg = "", isSuccess = false) {
      let variant = isSuccess ? "success" : "danger";
      this.$bvToast.toast(`${msg}`, {
        title: this.$t("alert"),
        variant: variant,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 5000,
      });
    },
  },
  async created() {
    this.getQualificationDetails();
  },
};
</script>

<style scoped lang="scss"></style>
