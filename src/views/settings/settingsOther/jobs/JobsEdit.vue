<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <JobForm
      v-if="!isLoading"
      :jobData="jobData"
      :submitName="$t('edit')"
      v-on:addOrUpdateJob="updateJob()"
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
  name: "EmployeeEdit",
  components: {
    PreLoader,
    ExceptionWithImg,
    JobForm,
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
      jobToken: this.$route.params.jobToken,
      jobData: {},
    };
  },
  methods: {
    async getJobDetails() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Jobs/GetJobDetails?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&jobToken=${this.jobToken}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.jobData = response.data.jobsData;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesData = null;
      }
      this.isLoading = false;
    },
    async updateJob() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        jobToken: this.jobToken,
        sectorToken: this.jobData.sectorToken,
        jobNameEn: this.jobData.jobNameEn,
        jobNameAr: this.jobData.jobNameAr,
        jobNotes: this.jobData.jobNotes,
      };

      try {
        const response = await axios.post(`/Jobs/UpdateJob`, data);
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
  async created() {
    this.getJobDetails();
  },
};
</script>

<style scoped lang="scss"></style>
