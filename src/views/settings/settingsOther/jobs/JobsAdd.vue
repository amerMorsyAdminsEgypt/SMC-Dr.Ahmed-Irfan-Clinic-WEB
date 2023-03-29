<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <JobForm
      v-if="!isLoading"
      :jobData="jobData"
      :submitName="$t('add')"
      v-on:addOrUpdateJob="addJob()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import JobForm from "@/components/settings/settingsOther/jobs/JobForm.vue";

export default {
  name: "JobsAdd",
  components: {
    PreLoader,
    ExceptionWithImg,
    JobForm,
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
      jobData: {
        sectorToken: "",
        jobNameEn: "",
        jobNameAr: "",
        jobNotes: "",
      },
    };
  },
  methods: {
    async addJob() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        sectorToken: this.jobData.sectorToken,
        jobNameEn: this.jobData.jobNameEn,
        jobNameAr: this.jobData.jobNameAr,
        jobNotes: this.jobData.jobNotes,
      };

      try {
        const response = await axios.post(`/Jobs/AddJob`, data);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/jobs");
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
};
</script>

<style scoped lang="scss"></style>
