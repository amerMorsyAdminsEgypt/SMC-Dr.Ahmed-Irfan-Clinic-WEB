<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeesMovementMediaData">
      <MediaInfo :employeesMovementMediaData="employeesMovementMediaData" />
    </div>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import MediaInfo from "@/components/employeesMovementMedia/MediaInfo.vue";

export default {
  name: "EmployeeMovementMediaInfo",
  components: {
    PreLoader,
    ExceptionWithImg,
    MediaInfo,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      movementMediaToken: this.$route.params.movementMediaToken,
      employeesMovementMediaData: null,
    };
  },
  methods: {
    async getEmployeesMovementMediaDetails() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesMovementMedia/GetEmployeesMovementMediaDetails?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&movementMediaToken=${this.movementMediaToken}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.employeesMovementMediaData =
            response.data.employeesMovementMediaData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesMovementMediaData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesMovementMediaData = null;
          this.exceptionMsg = response.data.msg;
          // this.$store.dispatch("updateUserData", null);
          // this.$router.push("/").catch(() => {});
        } else {
          this.employeesMovementMediaData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesMovementMediaData = null;
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
    this.getEmployeesMovementMediaDetails();
  },
};
</script>

<style lang="scss"></style>
